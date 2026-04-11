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
      <span class="page-title__actions">
      <a class="page-title__rss" href={`https://hushway.github.io/blog/index.xml`} aria-label="订阅 RSS" title="订阅 RSS">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M4 11a9 9 0 0 1 9 9" />
          <path d="M4 6a14 14 0 0 1 14 14" />
          <circle cx="5" cy="19" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      </a>
      <a class="page-title__github" href="https://github.com/HushWay/blog" target="_blank" rel="noopener noreferrer" aria-label="GitHub 仓库" title="GitHub 仓库">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
          <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.11-.75.4-1.26.72-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.96.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.6.23 2.78.11 3.07.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.27 5.67.41.36.77 1.07.77 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56C20.71 21.38 24 17.08 24 12 24 5.73 18.27.5 12 .5z" />
        </svg>
      </a>
      </span>
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

.page-title__github {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--mutedForeground, #7a7a7a);
  text-decoration: none;
  width: 32px;
  height: 32px;
  border-radius: 6px;
}
.page-title__github svg {
  display: block;
}
.page-title__github:hover,
.page-title__github:focus {
  color: var(--accentColor, #0366d6);
  background: rgba(3,102,214,0.06);
  outline: none;
}
.page-title__github:focus-visible {
  box-shadow: 0 0 0 3px rgba(3,102,214,0.12);
}
.page-title__actions {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
