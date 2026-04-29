import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/writingHeatmap.scss"

type Half = "first" | "second"
type Status = "done" | "missed" | "future"

type WritingEntry = {
  title: string
  date: Date
}

type HalfMonthCell = {
  month: number
  half: Half
  start: Date
  end: Date
  entries: WritingEntry[]
  status: Status
}

type YearGroup = {
  year: number
  cells: HalfMonthCell[]
  completed: number
  elapsed: number
  current?: HalfMonthCell
}

const monthLabels = [
  "1月",
  "2月",
  "3月",
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月",
]

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function parseWritingDate(value: unknown): Date | undefined {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return startOfDay(value)
  }

  if (typeof value !== "string" && typeof value !== "number") {
    return undefined
  }

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : startOfDay(date)
}

function isDraft(value: unknown): boolean {
  return value === true || value === "true"
}

function getWritingEntries(allFiles: QuartzComponentProps["allFiles"]): WritingEntry[] {
  return allFiles
    .filter((page) => page.slug !== "index" && !isDraft(page.frontmatter?.draft))
    .map((page) => {
      const rawDate = page.frontmatter?.date ?? page.frontmatter?.published
      const date = parseWritingDate(rawDate)
      if (!date) {
        return undefined
      }

      return {
        title: page.frontmatter?.title ?? page.slug ?? "未命名",
        date,
      }
    })
    .filter((entry): entry is WritingEntry => entry !== undefined)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
}

function halfRange(year: number, month: number, half: Half): Pick<HalfMonthCell, "start" | "end"> {
  const monthIndex = month - 1
  if (half === "first") {
    return {
      start: new Date(year, monthIndex, 1),
      end: new Date(year, monthIndex, 15),
    }
  }

  return {
    start: new Date(year, monthIndex, 16),
    end: new Date(year, monthIndex + 1, 0),
  }
}

function formatRange(cell: HalfMonthCell): string {
  const start = `${String(cell.month).padStart(2, "0")}.${String(cell.start.getDate()).padStart(2, "0")}`
  const end = `${String(cell.month).padStart(2, "0")}.${String(cell.end.getDate()).padStart(2, "0")}`
  return `${start}-${end}`
}

function buildYearGroups(entries: WritingEntry[], today = startOfDay(new Date())): YearGroup[] {
  const years = new Set(entries.map((entry) => entry.date.getFullYear()))
  years.add(today.getFullYear())

  return [...years]
    .sort((a, b) => b - a)
    .map((year) => {
      const cells: HalfMonthCell[] = []

      for (let month = 1; month <= 12; month++) {
        for (const half of ["first", "second"] as const) {
          const { start, end } = halfRange(year, month, half)
          const cellEntries = entries.filter((entry) => entry.date >= start && entry.date <= end)
          const status: Status =
            start > today ? "future" : cellEntries.length > 0 ? "done" : "missed"

          cells.push({
            month,
            half,
            start,
            end,
            entries: cellEntries,
            status,
          })
        }
      }

      const elapsedCells = cells.filter((cell) => cell.start <= today)
      const current = elapsedCells.find((cell) => today >= cell.start && today <= cell.end)

      return {
        year,
        cells,
        current,
        completed: elapsedCells.filter((cell) => cell.status === "done").length,
        elapsed: elapsedCells.length,
      }
    })
}

function cellTitle(year: number, cell: HalfMonthCell): string {
  const label = cell.half === "first" ? "上半月" : "下半月"
  const titles = cell.entries.map((entry) => entry.title).join("、")
  const summary = cell.entries.length > 0 ? `文章：${titles}` : "暂无文章"
  return `${year}年${String(cell.month).padStart(2, "0")}月${label}（${formatRange(cell)}）：${cell.entries.length} 篇。${summary}`
}

function statusText(status: Status): string {
  if (status === "done") return "达标"
  if (status === "future") return "未开始"
  return "未达标"
}

function currentText(cell?: HalfMonthCell): string {
  if (!cell) return "当前半月暂无统计"

  const label = `${String(cell.month).padStart(2, "0")}月${cell.half === "first" ? "上半月" : "下半月"}`
  return `当前：${label}${statusText(cell.status)}`
}

const WritingHeatmap: QuartzComponent = ({ allFiles }: QuartzComponentProps) => {
  const entries = getWritingEntries(allFiles)
  const years = buildYearGroups(entries)

  if (entries.length === 0) {
    return null
  }

  return (
    <section class="writing-heatmap" aria-labelledby="writing-heatmap-title">
      <div class="writing-heatmap__header">
        <div>
          <h2 id="writing-heatmap-title">更新热图</h2>
          {/* <p>每半个月至少写一次，自动按文章发布日期统计。</p> */}
        </div>
        <div class="writing-heatmap__legend" aria-label="状态图例">
          <span>
            <i class="writing-heatmap__dot writing-heatmap__dot--missed" />
            未达标
          </span>
          <span>
            <i class="writing-heatmap__dot writing-heatmap__dot--done" />
            达标
          </span>
          <span>
            <i class="writing-heatmap__dot writing-heatmap__dot--future" />
            未开始
          </span>
        </div>
      </div>

      {years.map((yearGroup) => (
        <div class="writing-heatmap__year">
          <div class="writing-heatmap__summary">
            <strong>{yearGroup.year}</strong>
            <span>
              {/* 已完成 {yearGroup.completed} / {yearGroup.elapsed} 个已开始的半月目标 */}
            </span>
            <span>{currentText(yearGroup.current)}</span>
          </div>

          <div class="writing-heatmap__months" aria-label={`${yearGroup.year} 年写作达标情况`}>
            {monthLabels.map((label, index) => {
              const monthCells = yearGroup.cells.slice(index * 2, index * 2 + 2)
              return (
                <div class="writing-heatmap__month">
                  <div class="writing-heatmap__month-label">{label}</div>
                  <div class="writing-heatmap__cells">
                    {monthCells.map((cell) => (
                      <span
                        class={`writing-heatmap__cell writing-heatmap__cell--${cell.status}`}
                        title={cellTitle(yearGroup.year, cell)}
                        aria-label={cellTitle(yearGroup.year, cell)}
                      >
                        {cell.entries.length > 0 ? cell.entries.length : ""}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </section>
  )
}

WritingHeatmap.css = style

export default (() => WritingHeatmap) satisfies QuartzComponentConstructor
