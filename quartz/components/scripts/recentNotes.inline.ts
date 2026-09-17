const setupRecentNotesPagination = () => {
  document.querySelectorAll<HTMLElement>(".recent-notes[data-page-size]").forEach((notes) => {
    const pageSize = Number(notes.dataset.pageSize)
    const items = Array.from(notes.querySelectorAll<HTMLElement>(".recent-li"))
    const buttons = Array.from(notes.querySelectorAll<HTMLButtonElement>(".recent-page"))
    const pageCount = Math.ceil(items.length / pageSize)
    if (!Number.isFinite(pageSize) || pageSize <= 0 || pageCount <= 1) return

    const requestedPage = Number(new URL(window.location.href).searchParams.get("page"))
    const initialPage = Number.isInteger(requestedPage)
      ? Math.min(Math.max(requestedPage, 1), pageCount)
      : 1

    const showPage = (page: number, updateUrl: boolean) => {
      items.forEach((item, index) => {
        item.hidden = Math.floor(index / pageSize) + 1 !== page
      })
      buttons.forEach((button) => {
        const active = Number(button.dataset.page) === page
        button.setAttribute("aria-current", active ? "page" : "false")
      })

      if (updateUrl) {
        const url = new URL(window.location.href)
        if (page === 1) url.searchParams.delete("page")
        else url.searchParams.set("page", String(page))
        window.history.replaceState({}, "", url)
        notes.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }

    buttons.forEach((button) => {
      const onClick = () => showPage(Number(button.dataset.page), true)
      button.addEventListener("click", onClick)
      window.addCleanup(() => button.removeEventListener("click", onClick))
    })

    showPage(initialPage, false)
  })
}

document.addEventListener("nav", setupRecentNotesPagination)
