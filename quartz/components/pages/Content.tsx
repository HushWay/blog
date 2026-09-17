import { ComponentChildren } from "preact"
import { concatenateResources } from "../../util/resources"
import { htmlToJsx } from "../../util/jsx"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import WritingHeatmapConstructor from "../WritingHeatmap"
import RecentNotesConstructor from "../RecentNotes"

const WritingHeatmap = WritingHeatmapConstructor()
const RecentNotes = RecentNotesConstructor({
  title: false,
  limit: 1000,
  pageSize: 8,
  showTags: false,
  showDescription: false,
  filter: (page) => !["index", "about", "archive"].includes(page.slug ?? ""),
})
const ArchiveNotes = RecentNotesConstructor({
  title: "全部文章",
  limit: 1000,
  showTags: false,
  showDescription: false,
  filter: (page) => !["index", "about", "archive"].includes(page.slug ?? ""),
})

const Content: QuartzComponent = (props: QuartzComponentProps) => {
  const { fileData, tree } = props
  const content = htmlToJsx(fileData.filePath!, tree) as ComponentChildren
  const classes: string[] = fileData.frontmatter?.cssclasses ?? []
  const classString = ["popover-hint", ...classes].join(" ")
  return (
    <article class={classString}>
      {content}
      {fileData.slug === "index" && <RecentNotes {...props} />}
      {fileData.slug === "archive" && <ArchiveNotes {...props} />}
      {fileData.slug === "about" && <WritingHeatmap {...props} />}
    </article>
  )
}

Content.css = concatenateResources(RecentNotes.css, WritingHeatmap.css)
Content.afterDOMLoaded = RecentNotes.afterDOMLoaded

export default (() => Content) satisfies QuartzComponentConstructor
