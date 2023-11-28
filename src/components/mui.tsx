import { Provider as ReduxProvider } from 'react-redux/es/exports'

import { CacheProvider } from '@emotion/react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { store } from '~/src/store'
import { useEmotionCache } from '~/src/hooks/use-emotion-cache'
import { createOptions as createDarkOptions } from '~/src/theme/dark/create-options'
import { createOptions as createBaseOptions } from '~/src/theme/base/create-options'

export default function Mui({ children }: { children: React.ReactNode }) {
  const cache = useEmotionCache()
  const theme = createTheme(
    createBaseOptions({
      direction: "ltr",
    }),
    createDarkOptions({
      colorPreset: "blue",
      contrast: "high",
    })
  )

  return (
    <CacheProvider value={cache}>
      <ReduxProvider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </LocalizationProvider>
      </ReduxProvider>
    </CacheProvider>
  )
}
