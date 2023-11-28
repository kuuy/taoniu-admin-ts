import {NextPage} from 'next'
import {ReactElement, ReactNode} from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider as ReduxProvider } from 'react-redux'

import {CacheProvider} from '@emotion/react'
import {LocalizationProvider} from '@mui/x-date-pickers'
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import {ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import {store} from '~/src/store'
import {createTheme} from '~/src/theme'
import createEmotionCache from '~/src/utils/create-emotion-cache'
import {AuthProvider, AuthConsumer} from '~/src/contexts/auth/jwt-context'
import {SettingsProvider, SettingsConsumer} from '~/src/contexts/settings-context'
import {SplashScreen} from '~/src/components/splash-screen'

import 'react-quill/dist/quill.snow.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import '~/src/styles/globals.css'
import '~/src/locales/i18n'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const emotionCache = createEmotionCache()
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <CacheProvider value={emotionCache}>
      <ReduxProvider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AuthProvider>
            <AuthConsumer>
              {(auth) => (
                <SettingsProvider>
                  <SettingsConsumer>
                    {(settings) => {
                      const theme = createTheme({
                        colorPreset: settings.colorPreset,
                        contrast: settings.contrast,
                        direction: settings.direction,
                        paletteMode: settings.paletteMode,
                        responsiveFontSizes: settings.responsiveFontSizes,
                      })
                      const {palette} = theme

                      return (
                        <ThemeProvider theme={theme}>
                          <Head>
                            <meta
                              name="color-scheme"
                              content={settings.paletteMode!}
                            />
                            <meta
                              name="theme-color"
                              content={palette.neutral[900]}
                            />
                          </Head>
                          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                          <CssBaseline/>
                          {auth.isInitialized ? getLayout(<Component {...pageProps} />) : <SplashScreen/>}
                        </ThemeProvider>
                      )
                    }}
                  </SettingsConsumer>
                </SettingsProvider>
              )}
            </AuthConsumer>
          </AuthProvider>
        </LocalizationProvider>
      </ReduxProvider>
    </CacheProvider>
  )
}
