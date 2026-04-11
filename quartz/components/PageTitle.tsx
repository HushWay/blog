import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir} class="page-title__link">{title}</a>
      <a class="page-title__rss" href={`https://hushway.github.io/blog/index.xml`} aria-label="订阅 RSS" title="订阅 RSS">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M4 11a9 9 0 0 1 9 9" />
          <path d="M4 6a14 14 0 0 1 14 14" />
          <circle cx="5" cy="19" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      </a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.page-title__link {
  color: inherit;
  text-decoration: none;
}
.page-title__rss {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--mutedForeground, #7a7a7a);
  text-decoration: none;
  width: 28px;
  height: 28px;
  border-radius: 6px;
}
.page-title__rss svg {
  display: block;
}
.page-title__rss:hover,
.page-title__rss:focus {
  color: var(--accentColor, #ff6600);
  background: rgba(255,102,0,0.08);
  outline: none;
}
.page-title__rss:focus-visible {
  box-shadow: 0 0 0 3px rgba(255,102,0,0.14);
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
