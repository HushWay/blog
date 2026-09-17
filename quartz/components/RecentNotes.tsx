import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, SimpleSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { byDateAndAlphabetical } from "./PageList"
import style from "./styles/recentNotes.scss"
import { Date, getDate } from "./Date"
import { GlobalConfiguration } from "../cfg"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"
// @ts-ignore
import paginationScript from "./scripts/recentNotes.inline"

interface Options {
  title?: string | false
  limit: number
  linkToMore: SimpleSlug | false
  showTags: boolean
  showDescription: boolean
  pageSize?: number
  filter: (f: QuartzPluginData) => boolean
  sort: (f1: QuartzPluginData, f2: QuartzPluginData) => number
}

const defaultOptions = (cfg: GlobalConfiguration): Options => ({
  limit: 3,
  linkToMore: false,
  showTags: true,
  showDescription: true,
  filter: () => true,
  sort: byDateAndAlphabetical(cfg),
})

export default ((userOpts?: Partial<Options>) => {
  const RecentNotes: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const opts = { ...defaultOptions(cfg), ...userOpts }
    const pages = allFiles.filter(opts.filter).sort(opts.sort)
    const remaining = Math.max(0, pages.length - opts.limit)
    return (
      <div
        class={classNames(displayClass, "recent-notes")}
        data-page-size={opts.pageSize || undefined}
      >
        {opts.title !== false && (
          <h3>{opts.title ?? i18n(cfg.locale).components.recentNotes.title}</h3>
        )}
        <ul class="recent-ul">
          {pages.slice(0, opts.limit).map((page, index) => {
            const title = page.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title
            const tags = page.frontmatter?.tags ?? []
            const description = page.description?.replace(/\s+/g, " ").trim()
            const href = resolveRelative(fileData.slug!, page.slug!)

            const cardContent = (
              <>
                <div class="desc">
                  <h3>{opts.showTags ? <a href={href}>{title}</a> : title}</h3>
                  {opts.showDescription && description && <p class="summary">{description}</p>}
                </div>
                <p class="meta">
                  {page.dates && <Date date={getDate(cfg, page)!} locale={cfg.locale} />}
                </p>
                <span class="recent-arrow" aria-hidden="true">
                  →
                </span>
              </>
            )

            return (
              <li class="recent-li" hidden={opts.pageSize ? index >= opts.pageSize : false}>
                {opts.showTags ? (
                  <div class="section">
                    {cardContent}
                    <ul class="tags">
                      {tags.map((tag) => (
                        <li>
                          <a
                            class="internal tag-link"
                            href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}
                          >
                            {tag}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <a class="section recent-card" href={href} aria-label={title}>
                    {cardContent}
                  </a>
                )}
              </li>
            )
          })}
        </ul>
        {opts.pageSize && pages.length > opts.pageSize && (
          <nav class="recent-pagination" aria-label="文章分页">
            {Array.from(
              { length: Math.ceil(Math.min(pages.length, opts.limit) / opts.pageSize) },
              (_, index) => (
                <button
                  type="button"
                  class="recent-page"
                  data-page={index + 1}
                  aria-current={index === 0 ? "page" : "false"}
                  aria-label={`第 ${index + 1} 页`}
                >
                  {index + 1}
                </button>
              ),
            )}
          </nav>
        )}
        {opts.linkToMore && remaining > 0 && (
          <p>
            <a href={resolveRelative(fileData.slug!, opts.linkToMore)}>
              {i18n(cfg.locale).components.recentNotes.seeRemainingMore({ remaining })}
            </a>
          </p>
        )}
      </div>
    )
  }

  RecentNotes.css = style
  RecentNotes.afterDOMLoaded = paginationScript
  return RecentNotes
}) satisfies QuartzComponentConstructor
