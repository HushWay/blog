import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.ConditionalRender({
      component: Component.Comments({
        provider: "giscus",
        options: {
          repo: "HushWay/blog",
          repoId: "R_kgDOQ8xrjA",
          category: "Announcements",
          categoryId: "DIC_kwDOQ8xrjM4C1JYZ",
          mapping: "title",
          strict: false,
          reactionsEnabled: true,
          inputPosition: "top",
        },
      }),
      condition: (page) => !["index", "archive"].includes(page.fileData.slug ?? ""),
    }),
  ],
  footer: Component.Footer({
    links: {
      // GitHub: "https://github.com/jackyzha0/quartz",
      // "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.PageTop(),
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (page) => !["index", "about", "archive"].includes(page.fileData.slug ?? ""),
    }),
    Component.ConditionalRender({
      component: Component.ContentMeta({ showReadingTime: false }),
      condition: (page) => !["index", "about", "archive"].includes(page.fileData.slug ?? ""),
    }),
    Component.ConditionalRender({
      component: Component.TagList(),
      condition: (page) => !["index", "about", "archive"].includes(page.fileData.slug ?? ""),
    }),
    Component.TableOfContents({ layout: "legacy" }),
  ],
  left: [],
  right: [],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.PageTop(),
    Component.ArticleTitle(),
    Component.ContentMeta({ showReadingTime: false }),
  ],
  left: [],
  right: [],
}
