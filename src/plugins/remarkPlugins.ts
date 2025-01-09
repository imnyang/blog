import type {
  Blockquote,
  FootnoteDefinition,
  Html,
  Link,
  ListItem,
  Node,
  Paragraph,
  Root
} from 'mdast'
import getReadingTime from 'reading-time'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

import toString from './mdastUtilToString'

export const remarkReadingTime: Plugin<[], Root> = function () {
  return function (tree, { data }) {
    const textOnPage = toString(tree)
    const readingTime = getReadingTime(textOnPage)
    // readingTime.text will give us minutes read as a friendly string,
    // i.e. "3 min read"
    const astroData = data as { astro: { frontmatter: { minutesRead: string } } }
    astroData.astro.frontmatter.minutesRead = readingTime.text
  }
}

export const remarkAddZoomable: Plugin<[{ className?: string }], Root> = function ({
  className = 'zoomable'
}) {
  return function (tree) {
    visit(tree, 'image', (node: Node) => {
      node.data = { hProperties: { class: className } }
    })
  }
}

interface ArxivArticleInfo {
  title: string
  authors: string
  id: string
  url: string
}

export async function fetchArxivApi(id: string): Promise<ArxivArticleInfo> {
  const response = await fetch(`https://export.arxiv.org/api/query?id_list=${id}`)
  if (!response.ok) {
    throw new Error(
      `Arxiv API request failed: ${response.statusText}, https://export.arxiv.org/api/query?id_list=${id}`
    )
  }
  const text = await response.text()
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(text, 'application/xml')

  const entry = xmlDoc.getElementsByTagName('entry')[0]
  const title = entry.getElementsByTagName('title')[0].textContent || ''
  const authors = Array.from(entry.getElementsByTagName('author'))
    .map((author: Element) => author.getElementsByTagName('name')[0].textContent || '')
    .join(', ')

  return {
    title,
    authors,
    id,
    url: `https://arxiv.org/abs/${id}`
  }
}
const initArxivCard = async (
  node: Paragraph,
  index?: number,
  parent?: Root | Blockquote | FootnoteDefinition | ListItem
) => {
  if (
    node.type === 'paragraph' &&
    node.children.length === 1 &&
    node.children[0].type === 'link' &&
    index &&
    parent &&
    parent.type === 'root'
  ) {
    const link = node.children[0] as Link
    const match = link.url.match(/https:\/\/arxiv\.org\/(abs|pdf)\/(\d{4}\.\d+(?:v\d+)?)/)

    if (match) {
      const [, , id] = match
      try {
        const data = await fetchArxivApi(id)

        const newNode: Html = {
          type: 'html',
          value: `
  <a href="${data.url}" target="_blank" class="not-prose block my-4">
            <div
    class="arxiv-card bg-gray-100 dark:bg-gray-900 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-center items-center [&_*]:!no-underline"
  >
    <div class="flex-grow">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h3
          class="text-gray-900 dark:text-white font-bold text-center sm:text-left mt-0 mb-1 text-lg"
        >
          ${data.title}
        </h3>
        <div class="flex items-center mt-2 sm:mt-0 mx-auto sm:mx-0">
          <span class="text-yellow-500 flex items-center">
            <svg class="w-4 h-4 mr-1">
              <use href="/icons/ui.svg#mingcute-paper-line"></use>
            </svg>
            ${data.id}
          </span>
        </div>
      </div>
      <p class="text-gray-700 dark:text-gray-400 text-sm mt-2">
         ${data.authors}
      </p>
    </div>
</div>
  </a>
          `
        }
        parent.children[index] = newNode
      } catch (err) {
        console.error('Error fetching Arxiv data:', err)
      }
    }
  }
}
export function remarkArxivCards() {
  return async function transformer(tree: Root) {
    const promises: Promise<void>[] = []
    visit(tree, 'paragraph', (node, index, parent) => {
      promises.push(initArxivCard(node, index, parent))
    })
    await Promise.all(promises)
    return tree
  }
}
