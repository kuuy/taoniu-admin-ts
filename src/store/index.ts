import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux'
import type { ThunkAction } from 'redux-thunk'
import { ThunkDispatch } from 'redux-thunk'

import type { AnyAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'

import rootReducer from '~/src/store/root-reducer'

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
  ],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
export const useDispatch = () => useReduxDispatch<ThunkDispatch<RootState, void, AnyAction>>()
