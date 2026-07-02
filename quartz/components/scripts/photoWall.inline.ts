type PhotoWallLayout = "masonry" | "mosaic"

const photoWallSizeClassPrefix = "photo-wall__size-"
const photoWallSizeNames = new Set(["1x1", "2x1", "1x2", "2x2", "3x1", "1x3", "3x2", "2x3"])
const photoWallCleanup = new WeakMap<HTMLElement, Array<() => void>>()

function onPhotoWallCleanup(fn: () => void) {
  if (typeof window.addCleanup === "function") window.addCleanup(fn)
}

function photoWallElementChildren(element: Element): Element[] {
  return Array.from(element.children).filter((child) => child.tagName !== "BR")
}

function photoWallImageFromItem(element: Element): HTMLImageElement | null {
  if (element instanceof HTMLImageElement) return element

  const children = photoWallElementChildren(element)
  if (children.length === 1 && children[0] instanceof HTMLImageElement) return children[0]

  if (children.length === 1 && children[0] instanceof HTMLAnchorElement) {
    const anchorChildren = photoWallElementChildren(children[0])
    if (anchorChildren.length === 1 && anchorChildren[0] instanceof HTMLImageElement) {
      return anchorChildren[0]
    }
  }

  return null
}

function isPhotoWallCandidate(element: Element): element is HTMLElement {
  if (!(element instanceof HTMLElement)) return false
  if (element.closest(".photo-wall")) return false
  if (!["P", "FIGURE", "A", "IMG"].includes(element.tagName)) return false
  return photoWallImageFromItem(element) !== null && element.textContent?.trim() === ""
}

function normalizeLegacyImageGrid(element: Element) {
  if (!(element instanceof HTMLElement) || element.classList.contains("photo-wall")) return
  if (element.tagName !== "DIV") return

  const children = Array.from(element.children)
  if (children.length < 2) return
  if (!children.every((child) => photoWallImageFromItem(child) !== null)) return

  element.classList.add("photo-wall")
  element.dataset.layout ||= "mosaic"
  element.removeAttribute("style")

  const grid = document.createElement("div")
  grid.className = "photo-wall__grid"
  children.forEach((child) => grid.appendChild(child))
  element.appendChild(grid)
}

function promotePhotoGroups(root: Element) {
  Array.from(root.children).forEach(normalizeLegacyImageGrid)

  let run: HTMLElement[] = []
  const flush = () => {
    if (run.length < 2) {
      run = []
      return
    }

    const wall = document.createElement("div")
    wall.className = "photo-wall"
    wall.dataset.layout = "mosaic"

    const grid = document.createElement("div")
    grid.className = "photo-wall__grid"
    wall.appendChild(grid)

    run[0].before(wall)
    run.forEach((item) => grid.appendChild(item))
    run = []
  }

  Array.from(root.children).forEach((child) => {
    if (child instanceof HTMLElement && child.classList.contains("photo-wall")) {
      flush()
      return
    }

    if (isPhotoWallCandidate(child)) {
      run.push(child)
    } else {
      flush()
    }
  })

  flush()
}

function clearPhotoWallSize(item: HTMLElement) {
  Array.from(item.classList).forEach((className) => {
    if (className.startsWith(photoWallSizeClassPrefix)) item.classList.remove(className)
  })
}

function setPhotoWallSize(item: HTMLElement, size: string) {
  clearPhotoWallSize(item)
  item.classList.add(`${photoWallSizeClassPrefix}${size}`)
}

function explicitPhotoWallSize(item: HTMLElement): string | undefined {
  const value = item.dataset.size || item.querySelector<HTMLElement>("[data-size]")?.dataset.size
  return value && photoWallSizeNames.has(value) ? value : undefined
}

const photoWallMosaicPatterns: Record<number, string[]> = {
  2: ["3x2", "3x2"],
  3: ["2x2", "2x1", "2x1"],
  4: ["2x2", "1x2", "2x1", "1x1"],
  5: ["2x2", "2x1", "1x2", "1x1", "2x1"],
  6: ["2x2", "1x2", "2x1", "1x1", "1x2", "2x1"],
  7: ["2x2", "1x2", "1x1", "2x1", "1x1", "1x1", "1x1"],
  8: ["2x2", "1x1", "1x1", "2x1", "1x1", "1x1", "1x1", "1x1"],
}

const photoWallMosaicCycle = ["2x2", "1x2", "2x1", "1x1", "1x1", "2x1", "1x2", "1x1"]

function inferredMosaicSize(index: number, count: number): string {
  const pattern = photoWallMosaicPatterns[Math.min(count, 8)] ?? photoWallMosaicCycle
  return pattern[index % pattern.length]
}

function resizeMasonryItem(grid: HTMLElement, item: HTMLElement) {
  const img = photoWallImageFromItem(item)
  if (!img) return

  const rowHeight = Number.parseFloat(getComputedStyle(grid).gridAutoRows) || 8
  const rowGap = Number.parseFloat(getComputedStyle(grid).rowGap) || 0
  const itemHeight = img.getBoundingClientRect().height
  if (!itemHeight) return

  const span = Math.ceil((itemHeight + rowGap) / (rowHeight + rowGap))
  item.style.gridRowEnd = `span ${span}`
}

function sizePhotoWallItem(
  grid: HTMLElement,
  item: HTMLElement,
  layout: PhotoWallLayout,
  index: number,
  count: number,
) {
  item.classList.add("photo-wall__item")

  const img = photoWallImageFromItem(item)
  if (!img) return

  const cleanupFns: Array<() => void> = photoWallCleanup.get(item) ?? []
  cleanupFns.forEach((cleanup) => cleanup())
  photoWallCleanup.set(item, [])

  if (layout === "mosaic") {
    const manualSize = explicitPhotoWallSize(item)
    const applyMosaicSize = () =>
      setPhotoWallSize(item, manualSize || inferredMosaicSize(index, count))
    if (img.complete) applyMosaicSize()
    else img.addEventListener("load", applyMosaicSize, { once: true })
    return
  }

  clearPhotoWallSize(item)
  item.style.gridRowEnd = ""

  const applyMasonrySize = () => resizeMasonryItem(grid, item)
  const resizeObserver = new ResizeObserver(applyMasonrySize)
  resizeObserver.observe(item)
  resizeObserver.observe(img)

  if (img.complete) applyMasonrySize()
  else img.addEventListener("load", applyMasonrySize, { once: true })

  const cleanup = () => {
    resizeObserver.disconnect()
    img.removeEventListener("load", applyMasonrySize)
  }

  photoWallCleanup.set(item, [cleanup])
  onPhotoWallCleanup(cleanup)
}

function ensurePhotoWallGrid(wall: HTMLElement): HTMLElement | null {
  const existingGrid = wall.querySelector<HTMLElement>(":scope > .photo-wall__grid")
  if (existingGrid) return existingGrid

  const children = Array.from(wall.children)
  if (children.length === 0) return null

  const grid = document.createElement("div")
  grid.className = "photo-wall__grid"
  children.forEach((child) => grid.appendChild(child))
  wall.appendChild(grid)
  return grid
}

function initPhotoWall(wall: HTMLElement) {
  const grid = ensurePhotoWallGrid(wall)
  if (!grid) return

  const layout = (wall.dataset.layout === "masonry" ? "masonry" : "mosaic") as PhotoWallLayout
  wall.dataset.layout = layout

  const items = Array.from(grid.children).filter((child): child is HTMLElement => {
    return child instanceof HTMLElement && photoWallImageFromItem(child) !== null
  })

  items.forEach((item, index) => sizePhotoWallItem(grid, item, layout, index, items.length))

  const pageSize = Number(wall.dataset.pageSize)
  if (!Number.isFinite(pageSize) || pageSize <= 0 || items.length <= pageSize) return

  let visibleCount = Number(wall.dataset.visibleCount)
  if (!Number.isFinite(visibleCount) || visibleCount < pageSize) visibleCount = pageSize

  wall.querySelector(".photo-wall__load-more")?.remove()

  const loadMore = document.createElement("div")
  loadMore.className = "photo-wall__load-more"

  const button = document.createElement("button")
  button.type = "button"
  button.textContent = wall.dataset.moreText || "更多"

  const renderVisibleItems = () => {
    items.forEach((item, index) => {
      item.hidden = index >= visibleCount
    })
    loadMore.hidden = visibleCount >= items.length
  }

  const onClick = () => {
    visibleCount += pageSize
    wall.dataset.visibleCount = String(visibleCount)
    renderVisibleItems()
  }

  button.addEventListener("click", onClick)
  onPhotoWallCleanup(() => button.removeEventListener("click", onClick))

  loadMore.appendChild(button)
  wall.appendChild(loadMore)
  renderVisibleItems()
}

function initAllPhotoWalls(root: Document | Element = document) {
  root.querySelectorAll("article").forEach(promotePhotoGroups)
  root.querySelectorAll<HTMLElement>(".photo-wall").forEach(initPhotoWall)
}

document.addEventListener("nav", () => initAllPhotoWalls())
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => initAllPhotoWalls(), { once: true })
} else {
  initAllPhotoWalls()
}

;(window as any).PhotoWall = { init: initAllPhotoWalls }
