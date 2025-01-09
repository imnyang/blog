import { spawn } from 'node:child_process'
import { dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
// Astro
import type { AstroIntegration, RehypePlugins, RemarkPlugins } from 'astro'
// Integrations
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import rehypeExternalLinks from 'rehype-external-links'

import { remarkAddZoomable } from './plugins/remark-plugins'
import { vitePluginUserConfig } from './plugins/virtual-user-config'
import { UserConfigSchema, type UserInputConfig } from './types/user-config'
import { parseWithFriendlyErrors } from './utils/error-map'

export default function AstroPureIntegration(opts: UserInputConfig): AstroIntegration {
  let integrations: AstroIntegration[] = []
  let remarkPlugins: RemarkPlugins = []
  let rehypePlugins: RehypePlugins = []
  return {
    name: 'astro-pure',
    hooks: {
      'astro:config:setup': async ({ config, updateConfig }) => {
        let userConfig = parseWithFriendlyErrors(
          UserConfigSchema,
          opts,
          'Invalid config passed to starlight integration'
        )

        // Add built-in integrations only if they are not already added by the user through the
        // config or by a plugin.
        const allIntegrations = [...config.integrations, ...integrations]
        if (!allIntegrations.find(({ name }) => name === '@astrojs/sitemap')) {
          integrations.push(sitemap())
        }
        if (!allIntegrations.find(({ name }) => name === '@astrojs/mdx')) {
          integrations.push(mdx({ optimize: true }))
        }
        if (!allIntegrations.find(({ name }) => name === '@astrojs/tailwind')) {
          integrations.push(tailwind({ applyBaseStyles: false }))
        }

        // Add supported remark plugins based on user config.
        if (userConfig.integ.mediumZoom.enable)
          remarkPlugins.push([remarkAddZoomable, userConfig.integ.mediumZoom.options])

        // Add supported rehype plugins based on user config.
        rehypePlugins.push([
          rehypeExternalLinks,
          {
            content: { type: 'text', value: userConfig.content.externalLinksContent },
            target: '_blank',
            rel: ['nofollow', 'noopener', 'noreferrer']
          }
        ])
        // Add Starlight directives restoration integration at the end of the list so that remark
        // plugins injected by Starlight plugins through Astro integrations can handle text and
        // leaf directives before they are transformed back to their original form.
        // integrations.push(starlightDirectivesRestorationIntegration())

        // Add integrations immediately after Starlight in the config array.
        // e.g. if a user has `integrations: [starlight(), tailwind()]`, then the order will be
        // `[starlight(), expressiveCode(), sitemap(), mdx(), tailwind()]`.
        // This ensures users can add integrations before/after Starlight and we respect that order.
        const selfIndex = config.integrations.findIndex((i) => i.name === 'astro-pure')
        config.integrations.splice(selfIndex + 1, 0, ...integrations)

        updateConfig({
          vite: {
            // @ts-ignore
            plugins: [vitePluginUserConfig(userConfig, config)]
          },
          markdown: {
            remarkPlugins,
            rehypePlugins
            // rehypePlugins: [rehypeRtlCodeSupport()],
            // shikiConfig:
            // Configure Shiki theme if the user is using the default github-dark theme.
            //   config.markdown.shikiConfig.theme !== 'github-dark' ? {} : { theme: 'css-variables' }
          },
          scopedStyleStrategy: 'where',
          // If not already configured, default to prefetching all links on hover.
          prefetch: config.prefetch ?? { prefetchAll: true }
        })
      },

      'astro:build:done': ({ dir }) => {
        if (!opts.integ.pagefind) return
        const targetDir = fileURLToPath(dir)
        const cwd = dirname(fileURLToPath(import.meta.url))
        const relativeDir = relative(cwd, targetDir)
        return new Promise<void>((resolve) => {
          spawn('npx', ['-y', 'pagefind', '--site', relativeDir], {
            stdio: 'inherit',
            shell: true,
            cwd
          }).on('close', () => resolve())
        })
      }
    }
  }
}
