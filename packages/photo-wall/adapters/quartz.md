# Quartz Adapter

This repository already wires PhotoWall into Quartz through:

- `quartz/components/scripts/photoWall.inline.ts`
- `quartz/styles/custom.scss`
- `quartz/plugins/emitters/componentResources.ts`

The canonical product source lives in `packages/photo-wall/src`. After changing `packages/photo-wall/src/photo-wall.ts`, run:

```bash
npm run photo-wall:build
```

The build script syncs the Quartz inline script and updates the portable files in `template/photo-wall`.

## Markdown Usage

Quartz posts can use plain Markdown image groups:

```md
![Hero |2x2](assets/hero.jpg)

![Wide detail |2x1](assets/wide.jpg)

![Tall detail |1x2](assets/tall.jpg)
```

Two or more consecutive image-only paragraphs become a photo wall globally.
