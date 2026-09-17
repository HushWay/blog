import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const ArticleTitle: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const title = fileData.frontmatter?.title
  if (title) {
    return <h1 class={classNames(displayClass, "article-title")}>{title}</h1>
  } else {
    return null
  }
}

ArticleTitle.css = `
.article-title {
  margin: 1.75rem 0 0.15rem;
  font-size: 1.45rem;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: -0.01em;
}

@media all and (max-width: 800px) {
  .article-title {
    margin-top: 1.5rem;
    font-size: 1.3rem;
  }
}
`

export default (() => ArticleTitle) satisfies QuartzComponentConstructor
