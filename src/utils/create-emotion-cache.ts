import createCache from '@emotion/cache'
import type { EmotionCache,Options } from '@emotion/cache'

// On the client side, Create a meta tag at the top of the <head> and set it as insertionPoint.
// This assures that MUI styles are loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
const getInsertionPoint = (): HTMLMetaElement | null => {
  if (typeof document !== "undefined") {
    return document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]'
    )
  }
  return null
}

export default function createEmotionCache(): EmotionCache {
  const insertionPoint = getInsertionPoint()
  const options: Options = {
    key: 'mui',
  }
  if (insertionPoint !== null) {
    options.insertionPoint = insertionPoint
  }
  return createCache(options)
}
