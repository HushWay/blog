# PhotoWall

A portable mosaic photo layout module for blogs and static sites.

PhotoWall turns consecutive images into a compact, magazine-like photo wall. It works without a framework, can auto-promote plain Markdown image groups, and still lets you manually choose the hero image when the automatic layout guesses wrong.

## Features

- Auto-detect consecutive image-only blocks inside `article`
- Mosaic layout with dense CSS grid placement
- Masonry layout for uncropped image groups
- Manual tile sizing through `data-size` or Markdown alt markers such as `|2x2`
- Hover preview on mouse/trackpad devices
- Optional load-more pagination through `data-page-size`
- Portable vanilla JS and CSS output

## Quick Start

Include the built files:

```html
<link rel="stylesheet" href="photo-wall.css" />
<script src="photo-wall.js" defer></script>
```

Then write ordinary images. Two or more consecutive image-only elements inside an `article` become one photo wall:

```html
<article>
  <p><img src="photos/one.jpg" alt="Spring blossoms" /></p>
  <p><img src="photos/two.jpg" alt="Trees |2x1" /></p>
  <p><img src="photos/three.jpg" alt="Window flowers |1x2" /></p>
</article>
```

PhotoWall also accepts explicit HTML:

```html
<div class="photo-wall" data-layout="mosaic">
  <div class="photo-wall__grid">
    <a href="photos/one.jpg" data-size="2x2"><img src="photos/one.jpg" alt="Hero" /></a>
    <a href="photos/two.jpg"><img src="photos/two.jpg" alt="Detail" /></a>
  </div>
</div>
```

## Markdown Markers

When your static site generator renders Markdown image alt text into `alt`, you can mark tile size at the end of the alt text:

```md
![Hero photo |2x2](photos/hero.jpg)
![Wide photo |2x1](photos/wide.jpg)
![Tall photo |1x2](photos/tall.jpg)
```

The marker is removed from `alt` and `title` after initialization.

Supported sizes: `1x1`, `2x1`, `1x2`, `2x2`, `3x1`, `1x3`, `3x2`, `2x3`.

## Layouts

Use `data-layout="mosaic"` for the default cropped mosaic. Use `data-layout="masonry"` when the group must preserve natural image proportions.

```html
<div class="photo-wall" data-layout="masonry">
  <div class="photo-wall__grid">
    <img src="photos/sketch-1.jpg" alt="Sketch" />
    <img src="photos/sketch-2.jpg" alt="Sketch" />
  </div>
</div>
```

## Options

PhotoWall is configured with HTML attributes and CSS custom properties.

| Option                    | Where         | Default   | Meaning                           |
| ------------------------- | ------------- | --------- | --------------------------------- |
| `data-layout`             | `.photo-wall` | `mosaic`  | `mosaic` or `masonry`             |
| `data-size`               | item or child | automatic | Tile span such as `2x2`           |
| `data-page-size`          | `.photo-wall` | none      | Number of initially visible items |
| `data-more-text`          | `.photo-wall` | `更多`    | Load-more button text             |
| `--photo-wall-cols`       | `.photo-wall` | `6`       | Mosaic column count               |
| `--photo-wall-row-height` | `.photo-wall` | `150px`   | Mosaic row height                 |
| `--photo-wall-gap`        | `.photo-wall` | `3px`     | Gap between images                |
| `--photo-wall-min-col`    | `.photo-wall` | `118px`   | Masonry minimum column width      |

## JavaScript API

The script auto-initializes on page load. If your page content is injected later, call:

```js
window.PhotoWall.init(document)
```

You can pass any element as the root:

```js
window.PhotoWall.init(document.querySelector("article"))
```

## Build

From the repository root:

```bash
npm run photo-wall:build
```

This builds `packages/photo-wall/dist`, updates the portable files under `template/photo-wall`, and syncs the Quartz inline script from `packages/photo-wall/src/photo-wall.ts`.
