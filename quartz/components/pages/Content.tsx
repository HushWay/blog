import { ComponentChildren } from "preact"
import { concatenateResources } from "../../util/resources"
import { htmlToJsx } from "../../util/jsx"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import WritingHeatmapConstructor from "../WritingHeatmap"

const WritingHeatmap = WritingHeatmapConstructor()

const Content: QuartzComponent = (props: QuartzComponentProps) => {
  const { fileData, tree } = props
  const content = htmlToJsx(fileData.filePath!, tree) as ComponentChildren
  const classes: string[] = fileData.frontmatter?.cssclasses ?? []
  const classString = ["popover-hint", ...classes].join(" ")
  return (
    <article class={classString}>
      {content}
      {fileData.slug === "index" && <WritingHeatmap {...props} />}
    </article>
  )
}

Content.css = concatenateResources(WritingHeatmap.css)

export default (() => Content) satisfies QuartzComponentConstructor
