import { useState, useEffect } from "react"

export function useMediaQuery(query) {
  const [value, setValue] = useState(false)

  useEffect(() => {
    const handler = (e) => setValue(e.matches)
    const mediaQuery = window.matchMedia(query)
    setValue(mediaQuery.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [query])

  return value
}
