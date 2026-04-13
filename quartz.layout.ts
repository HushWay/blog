import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { FileTrieNode } from "./quartz/util/fileTrie"

const sortByPublishedDateAsc = (a: FileTrieNode, b: FileTrieNode) => {
  if (a.isFolder !== b.isFolder) {
    return a.isFolder ? -1 : 1
  }

  if (a.isFolder && b.isFolder) {
    return a.displayName.localeCompare(b.displayName, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  }

  // 文件按发表时间正序
  const aTime = a.data?.date ? new Date(a.data.date).getTime() : Number.NEGATIVE_INFINITY
  const bTime = b.data?.date ? new Date(b.data.date).getTime() : Number.NEGATIVE_INFINITY
  const timeDiff = aTime - bTime
  if (timeDiff !== 0) {
    return timeDiff
  }

  // 时间相同或缺失时，按名称稳定排序
  return a.displayName.localeCompare(b.displayName, undefined, {
    numeric: true,
    sensitivity: "base",
  })
}

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.Comments({
      provider: 'giscus',
      options: {
        repo: 'HushWay/blog',
        repoId: 'R_kgDOQ8xrjA',
        category: 'Announcements',
        categoryId: 'DIC_kwDOQ8xrjM4C1JYZ',
        mapping: 'title',
        strict: false,
        reactionsEnabled: true,
        inputPosition: 'top',
      }
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
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta({ showReadingTime: false }),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        // { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      title: "博客",
      folderDefaultState: "open",
      folderClickBehavior: "link",
      useSavedState: false,
      sortFn: sortByPublishedDateAsc,
    }),
  ],
  right: [
    Component.TableOfContents()
    // Component.Graph(),
    // Component.DesktopOnly(Component.TableOfContents()),
    // Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta({ showReadingTime: false })],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      sortFn: sortByPublishedDateAsc,
    }),
  ],
  right: [],
}
