import { copyFileSync, mkdirSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { build } from "esbuild"

const packageDir = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const rootDir = resolve(packageDir, "..", "..")

const srcScript = resolve(packageDir, "src", "photo-wall.ts")
const srcStyle = resolve(packageDir, "src", "photo-wall.css")
const distDir = resolve(packageDir, "dist")
const distScript = resolve(distDir, "photo-wall.js")
const distStyle = resolve(distDir, "photo-wall.css")
const templateDir = resolve(rootDir, "template", "photo-wall")

mkdirSync(distDir, { recursive: true })
mkdirSync(templateDir, { recursive: true })

await build({
  entryPoints: [srcScript],
  outfile: distScript,
  bundle: true,
  format: "iife",
  target: "es2019",
})

copyFileSync(srcStyle, distStyle)
copyFileSync(distScript, resolve(templateDir, "photo-wall.js"))
copyFileSync(distStyle, resolve(templateDir, "photo-wall.css"))
copyFileSync(srcScript, resolve(rootDir, "quartz", "components", "scripts", "photoWall.inline.ts"))
