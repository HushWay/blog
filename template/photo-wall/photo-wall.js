"use strict";
(() => {
  const photoWallSizeClassPrefix = "photo-wall__size-";
  const photoWallSizeNames = /* @__PURE__ */ new Set(["1x1", "2x1", "1x2", "2x2", "3x1", "1x3", "3x2", "2x3"]);
  const photoWallCleanup = /* @__PURE__ */ new WeakMap();
  function onPhotoWallCleanup(fn) {
    if (typeof window.addCleanup === "function") window.addCleanup(fn);
  }
  function photoWallElementChildren(element) {
    return Array.from(element.children).filter((child) => child.tagName !== "BR");
  }
  function photoWallImageFromItem(element) {
    if (element instanceof HTMLImageElement) return element;
    const children = photoWallElementChildren(element);
    if (children.length === 1 && children[0] instanceof HTMLImageElement) return children[0];
    if (children.length === 1 && children[0] instanceof HTMLAnchorElement) {
      const anchorChildren = photoWallElementChildren(children[0]);
      if (anchorChildren.length === 1 && anchorChildren[0] instanceof HTMLImageElement) {
        return anchorChildren[0];
      }
    }
    return null;
  }
  function isPhotoWallCandidate(element) {
    var _a;
    if (!(element instanceof HTMLElement)) return false;
    if (element.closest(".photo-wall")) return false;
    if (!["P", "FIGURE", "A", "IMG"].includes(element.tagName)) return false;
    return photoWallImageFromItem(element) !== null && ((_a = element.textContent) == null ? void 0 : _a.trim()) === "";
  }
  function normalizeLegacyImageGrid(element) {
    var _a;
    if (!(element instanceof HTMLElement) || element.classList.contains("photo-wall")) return;
    if (element.tagName !== "DIV") return;
    const children = Array.from(element.children);
    if (children.length < 2) return;
    if (!children.every((child) => photoWallImageFromItem(child) !== null)) return;
    element.classList.add("photo-wall");
    (_a = element.dataset).layout || (_a.layout = "mosaic");
    element.removeAttribute("style");
    const grid = document.createElement("div");
    grid.className = "photo-wall__grid";
    children.forEach((child) => grid.appendChild(child));
    element.appendChild(grid);
  }
  function promotePhotoGroups(root) {
    Array.from(root.children).forEach(normalizeLegacyImageGrid);
    let run = [];
    const flush = () => {
      if (run.length < 2) {
        run = [];
        return;
      }
      const wall = document.createElement("div");
      wall.className = "photo-wall";
      wall.dataset.layout = "mosaic";
      const grid = document.createElement("div");
      grid.className = "photo-wall__grid";
      wall.appendChild(grid);
      run[0].before(wall);
      run.forEach((item) => grid.appendChild(item));
      run = [];
    };
    Array.from(root.children).forEach((child) => {
      if (child instanceof HTMLElement && child.classList.contains("photo-wall")) {
        flush();
        return;
      }
      if (isPhotoWallCandidate(child)) {
        run.push(child);
      } else {
        flush();
      }
    });
    flush();
  }
  function clearPhotoWallSize(item) {
    Array.from(item.classList).forEach((className) => {
      if (className.startsWith(photoWallSizeClassPrefix)) item.classList.remove(className);
    });
  }
  function setPhotoWallSize(item, size) {
    clearPhotoWallSize(item);
    item.classList.add(`${photoWallSizeClassPrefix}${size}`);
  }
  function normalizePhotoWallSize(value) {
    return value && photoWallSizeNames.has(value) ? value : void 0;
  }
  function photoWallSizeFromText(value) {
    const match = value == null ? void 0 : value.match(/(?:^|\s)\|?([123]x[123])\s*$/);
    return normalizePhotoWallSize(match == null ? void 0 : match[1]);
  }
  function stripPhotoWallSizeFromImage(img) {
    const size = photoWallSizeFromText(img.alt) || photoWallSizeFromText(img.title);
    if (!size) return void 0;
    const markerPattern = /\s*\|?[123]x[123]\s*$/;
    img.alt = img.alt.replace(markerPattern, "").trim();
    img.title = img.title.replace(markerPattern, "").trim();
    return size;
  }
  function explicitPhotoWallSize(item) {
    var _a;
    const manualSize = normalizePhotoWallSize(item.dataset.size) || normalizePhotoWallSize((_a = item.querySelector("[data-size]")) == null ? void 0 : _a.dataset.size);
    if (manualSize) return manualSize;
    const img = photoWallImageFromItem(item);
    return img ? stripPhotoWallSizeFromImage(img) : void 0;
  }
  const photoWallMosaicPatterns = {
    2: ["3x2", "3x2"],
    3: ["2x2", "2x1", "2x1"],
    4: ["2x2", "1x2", "2x1", "1x1"],
    5: ["2x2", "2x1", "1x2", "1x1", "2x1"],
    6: ["2x2", "1x2", "2x1", "1x1", "1x1", "2x1"],
    7: ["2x2", "1x2", "1x1", "2x1", "1x1", "1x1", "1x1"],
    8: ["2x2", "1x1", "1x1", "2x1", "1x1", "1x1", "1x1", "1x1"]
  };
  const photoWallMosaicCycle = ["2x2", "1x2", "2x1", "1x1", "1x1", "2x1", "1x2", "1x1"];
  const photoWallMosaicFillCycle = ["1x2", "2x1", "1x1", "1x1", "2x1", "1x1", "1x1", "1x2"];
  function inferredMosaicSize(index, count, avoidHero = false) {
    var _a;
    const pattern = avoidHero ? photoWallMosaicFillCycle : (_a = photoWallMosaicPatterns[Math.min(count, 8)]) != null ? _a : photoWallMosaicCycle;
    return pattern[index % pattern.length];
  }
  function resizeMasonryItem(grid, item) {
    const img = photoWallImageFromItem(item);
    if (!img) return;
    const rowHeight = Number.parseFloat(getComputedStyle(grid).gridAutoRows) || 8;
    const rowGap = Number.parseFloat(getComputedStyle(grid).rowGap) || 0;
    const itemHeight = img.getBoundingClientRect().height;
    if (!itemHeight) return;
    const span = Math.ceil((itemHeight + rowGap) / (rowHeight + rowGap));
    item.style.gridRowEnd = `span ${span}`;
  }
  function sizePhotoWallItem(grid, item, layout, index, count, manualSize, hasManualSizes) {
    var _a;
    item.classList.add("photo-wall__item");
    const img = photoWallImageFromItem(item);
    if (!img) return;
    const cleanupFns = (_a = photoWallCleanup.get(item)) != null ? _a : [];
    cleanupFns.forEach((cleanup2) => cleanup2());
    photoWallCleanup.set(item, []);
    if (layout === "mosaic") {
      const applyMosaicSize = () => setPhotoWallSize(item, manualSize || inferredMosaicSize(index, count, hasManualSizes));
      if (img.complete) applyMosaicSize();
      else img.addEventListener("load", applyMosaicSize, { once: true });
      return;
    }
    clearPhotoWallSize(item);
    item.style.gridRowEnd = "";
    const applyMasonrySize = () => resizeMasonryItem(grid, item);
    const resizeObserver = new ResizeObserver(applyMasonrySize);
    resizeObserver.observe(item);
    resizeObserver.observe(img);
    if (img.complete) applyMasonrySize();
    else img.addEventListener("load", applyMasonrySize, { once: true });
    const cleanup = () => {
      resizeObserver.disconnect();
      img.removeEventListener("load", applyMasonrySize);
    };
    photoWallCleanup.set(item, [cleanup]);
    onPhotoWallCleanup(cleanup);
  }
  function ensurePhotoWallGrid(wall) {
    const existingGrid = wall.querySelector(":scope > .photo-wall__grid");
    if (existingGrid) return existingGrid;
    const children = Array.from(wall.children);
    if (children.length === 0) return null;
    const grid = document.createElement("div");
    grid.className = "photo-wall__grid";
    children.forEach((child) => grid.appendChild(child));
    wall.appendChild(grid);
    return grid;
  }
  function initPhotoWall(wall) {
    var _a;
    const grid = ensurePhotoWallGrid(wall);
    if (!grid) return;
    const layout = wall.dataset.layout === "masonry" ? "masonry" : "mosaic";
    wall.dataset.layout = layout;
    const items = Array.from(grid.children).filter((child) => {
      return child instanceof HTMLElement && photoWallImageFromItem(child) !== null;
    });
    const manualSizes = items.map(explicitPhotoWallSize);
    const hasManualSizes = manualSizes.some(Boolean);
    items.forEach(
      (item, index) => sizePhotoWallItem(grid, item, layout, index, items.length, manualSizes[index], hasManualSizes)
    );
    const pageSize = Number(wall.dataset.pageSize);
    if (!Number.isFinite(pageSize) || pageSize <= 0 || items.length <= pageSize) return;
    let visibleCount = Number(wall.dataset.visibleCount);
    if (!Number.isFinite(visibleCount) || visibleCount < pageSize) visibleCount = pageSize;
    (_a = wall.querySelector(".photo-wall__load-more")) == null ? void 0 : _a.remove();
    const loadMore = document.createElement("div");
    loadMore.className = "photo-wall__load-more";
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = wall.dataset.moreText || "\u66F4\u591A";
    const renderVisibleItems = () => {
      items.forEach((item, index) => {
        item.hidden = index >= visibleCount;
      });
      loadMore.hidden = visibleCount >= items.length;
    };
    const onClick = () => {
      visibleCount += pageSize;
      wall.dataset.visibleCount = String(visibleCount);
      renderVisibleItems();
    };
    button.addEventListener("click", onClick);
    onPhotoWallCleanup(() => button.removeEventListener("click", onClick));
    loadMore.appendChild(button);
    wall.appendChild(loadMore);
    renderVisibleItems();
  }
  function initAllPhotoWalls(root = document) {
    root.querySelectorAll("article").forEach(promotePhotoGroups);
    root.querySelectorAll(".photo-wall").forEach(initPhotoWall);
  }
  document.addEventListener("nav", () => initAllPhotoWalls());
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initAllPhotoWalls(), { once: true });
  } else {
    initAllPhotoWalls();
  }
  window.PhotoWall = { init: initAllPhotoWalls };
})();
