'use client'

import { Provider as ReduxProvider } from 'react-redux/es/exports'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import { store } from '~/src/store'

import EmotionCacheProvider from './EmotionCache'

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <EmotionCacheProvider options={{ key: "mui" }}>
      <ReduxProvider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {children}
        </LocalizationProvider>
      </ReduxProvider>
    </EmotionCacheProvider>
  )
}
