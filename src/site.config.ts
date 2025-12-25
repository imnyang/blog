import type { CardListData, Config, IntegrationUserConfig, ThemeUserConfig } from 'astro-pure/types'

export const theme: ThemeUserConfig = {
  /** Title for your website. Will be used in metadata and as browser tab title. */
  title: '암냥의 작업실',

  /** Will be used in index page & copyright declaration */
  author: '암냥',

  /** Description metadata for your website. Can be used in page metadata. */
  description: 'Made with :two_hearts:',

  /** The default favicon for your site which should be a path to an image in the `public/` directory. */
  favicon: '/favicon/favicon.ico',

  locale: {
    lang: 'ko-KR', // 한국어 언어 설정
    attrs: 'ko_KR', // 한국 로케일 설정
    dateLocale: 'ko-KR', // 한국 날짜 로케일 설정
    dateOptions: {
      day: 'numeric', // 날짜: 숫자 형식
      month: 'long', // 월: 긴 형식 (예: 1월, 2월 등)
      year: 'numeric' // 연도: 숫자 형식
    }
  },

  /** Set a logo image to show in the homepage. */
  logo: {
    src: '',
    alt: ''
  },

  // in test
  head: [
    /* Telegram channel */
    {
      tag: 'meta',
      attrs: { name: 'discord:username', content: '@imnya.ng' },
      content: ''
    }
  ],
  customCss: [],
  titleDelimiter: '•',

  prerender: true,
  npmCDN: 'https://cdn.jsdelivr.net/npm',

  header: {
    menu: [
      { title: "Archives", link: '/archives' }
      //{ title: 'Blog', link: '/' },
      //{ title: 'About', link: '/about' }
    ]
  },

  footer: {
    // Registration information for ICP (optional)
    registration: {},
    /** Enable displaying a “Astro & Pure theme powered” link in your site’s footer. */
    credits: false,
    social: { github: 'https://astro.build/chat' }
  },

  content: {
    externalLinksContent: ' ↗',
    /** Blog page size for pagination (optional) */
    blogPageSize: 7,
    externalLinkArrow: true, // show external link arrow
    // Currently support weibo, x, bluesky
    share: ['x', 'bluesky']
  }
}

export const integ: IntegrationUserConfig = {
  links: {
    logbook: [
      /*{ date: '2024-07-01', content: 'Lorem ipsum dolor sit amet.' },
      { date: '2024-07-01', content: 'vidit suscipit at mei.' },
      { date: '2024-07-01', content: 'Quem denique mea id.' }*/
    ],
    // Yourself link info
    applyTip: {
      name: theme.title,
      desc: theme.description || 'Null',
      url: 'https://blog.imnya.ng',
      avatar: 'https://astro-pure.js.org/favicon/favicon.ico'
    }
  },
  pagefind: true,
  // Add a random quote to the footer (default on homepage footer)
  quote: {
    // https://developer.hitokoto.cn/sentence/#%E8%AF%B7%E6%B1%82%E5%9C%B0%E5%9D%80
    // server: 'https://v1.hitokoto.cn/?c=i',
    // target: (data) => (data as { hitokoto: string }).hitokoto || 'Error'
    // https://github.com/lukePeavey/quotable
    server: 'https://api.quotable.io/quotes/random?maxLength=60',
    target: `(data) => data[0].content || 'Error'`
  },
  // Tailwindcss typography
  typography: {
    // https://github.com/tailwindlabs/tailwindcss-typography
    class:
      'break-words prose prose-pure dark:prose-invert dark:prose-pure prose-headings:font-medium'
  },
  // A lightbox library that can add zoom effect
  mediumZoom: {
    enable: true, // disable it will not load the whole library
    selector: '.prose .zoomable',
    options: {
      className: 'zoomable'
    }
  },
  // Comment system
  waline: {
    enable: true,
    // Server service link
    server: 'https://astro-theme-pure-waline.arthals.ink/',
    // Refer https://waline.js.org/en/guide/features/emoji.html
    emoji: ['bmoji', 'weibo'],
    // Refer https://waline.js.org/en/reference/client/props.html
    additionalConfigs: {
      // search: false,
      pageview: true,
      comment: true,
      locale: {
        reaction0: 'Like',
        placeholder: 'Welcome to comment. (Email to receive replies. Login is unnecessary)'
      },
      imageUploader: false
    }
  }
}

export const terms: CardListData = {
  title: 'Terms content',
  list: [
    {
      title: 'Privacy Policy',
      link: '/terms/privacy-policy'
    },
    {
      title: 'Terms and Conditions',
      link: '/terms/terms-and-conditions'
    },
    {
      title: 'Copyright',
      link: '/terms/copyright'
    },
    {
      title: 'Disclaimer',
      link: '/terms/disclaimer'
    }
  ]
}

const config = { ...theme, integ } as Config
export default config
