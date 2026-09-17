import { concatenateResources } from "../util/resources"
import { resolveRelative, SimpleSlug } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import SearchConstructor from "./Search"
import DarkmodeConstructor from "./Darkmode"
import PageTitleConstructor from "./PageTitle"

const Search = SearchConstructor()
const Darkmode = DarkmodeConstructor()
const PageTitle = PageTitleConstructor()

const PageTop: QuartzComponent = (props: QuartzComponentProps) => {
  const { fileData } = props
  return (
    <nav class="page-top" aria-label="页面导航">
      <div class="page-top__main">
        <PageTitle {...props} />
        <div class="page-top__links">
          <a
            href={resolveRelative(fileData.slug!, "about" as SimpleSlug)}
            aria-current={fileData.slug === "about" ? "page" : undefined}
          >
            关于
          </a>
          <a
            href={resolveRelative(fileData.slug!, "archive" as SimpleSlug)}
            aria-current={fileData.slug === "archive" ? "page" : undefined}
          >
            归档
          </a>
        </div>
      </div>
      <div class="page-top__tools">
        <Search {...props} />
        <Darkmode {...props} />
      </div>
    </nav>
  )
}

PageTop.afterDOMLoaded = concatenateResources(Search.afterDOMLoaded, Darkmode.afterDOMLoaded)
PageTop.beforeDOMLoaded = concatenateResources(Search.beforeDOMLoaded, Darkmode.beforeDOMLoaded)
PageTop.css = concatenateResources(
  Search.css,
  Darkmode.css,
  PageTitle.css,
  `
.page-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: 0 0 0.45rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid var(--lightgray);
}
.page-top__main,
.page-top__links,
.page-top__tools {
  display: flex;
  align-items: center;
}
.page-top__main {
  gap: 2rem;
}
.page-top .page-title {
  flex: none;
  font-size: 1.55rem;
}
.page-top__links {
  gap: 1.35rem;
}
.page-top__links > a {
  position: relative;
  color: var(--darkgray);
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  opacity: 0.78;
}
.page-top__links > a:hover,
.page-top__links > a[aria-current="page"] {
  color: var(--dark);
  opacity: 1;
}
.page-top__links > a[aria-current="page"]::after {
  position: absolute;
  right: 0;
  bottom: -0.88rem;
  left: 0;
  height: 2px;
  border-radius: 999px;
  background: var(--secondary);
  content: "";
}
.page-top__tools {
  gap: 0.8rem;
}
.page-top__tools .search {
  width: 11rem;
}
.page-top__tools .darkmode {
  margin: 0;
}
.page-top__tools .search-button > p {
  color: color-mix(in srgb, var(--darkgray) 82%, var(--light));
}
@media all and (max-width: 800px) {
  .page-top {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0.4rem 1rem;
    margin-bottom: 0.45rem;
  }
  .page-top__main {
    display: contents;
  }
  .page-top .page-title {
    grid-column: 1 / -1;
    font-size: 1.3rem;
  }
  .page-top__links {
    gap: 1rem;
  }
  .page-top__links > a {
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
  }
  .page-top__links > a[aria-current="page"]::after {
    bottom: -0.8rem;
  }
  .page-top__tools {
    gap: 0.5rem;
  }
  .page-top__tools .search {
    width: auto;
  }
  .page-top__tools .search-button > p {
    display: none;
  }
  .page-top__tools .search-button {
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    padding: 0;
  }
  .page-top__tools .darkmode {
    width: 2.75rem;
    height: 2.75rem;
  }
  .page-top__tools .darkmode svg {
    left: calc(50% - 10px);
  }
}
`,
)

export default (() => PageTop) satisfies QuartzComponentConstructor
