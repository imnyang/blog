import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  TITLE: "imnyang's Blog",
  DESCRIPTION: "Astro Micro is an accessible and lightweight blog.",
  EMAIL: "me@imnyang.xyz",
  NUM_POSTS_ON_HOMEPAGE: 10,
  NUM_PROJECTS_ON_HOMEPAGE: 0,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Astro Micro is an accessible theme for Astro.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "A collection of my projects with links to repositories and live demos.",
};

export const SOCIALS: Socials = [
  {
    NAME: "X",
    HREF: "https://x.com/fur_imnyang",
  },
  {
    NAME: "GitHub",
    HREF: "https://github.com/imnyang",
  }
]
