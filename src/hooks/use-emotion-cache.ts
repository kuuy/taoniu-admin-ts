import createCache from '@emotion/cache'
import { useServerInsertedHTML } from 'next/navigation'
import { createElement, useMemo } from 'react'

export function useEmotionCache() {
  const cache = createCache({ key: "mui-style"})
  cache.compat = true

  useServerInsertedHTML(() =>
    createElement("style", {
      key: cache.key,
      "data-emotion": `${cache.key} ${Object.keys(cache.inserted).join(" ")}`,
      dangerouslySetInnerHTML: {
        __html: Object.values(cache.inserted).join(" "),
      },
    }),
  )

  return cache
}
