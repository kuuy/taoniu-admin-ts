import type { PayloadAction } from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'

import {
  JwtToken,
  JwtState,
} from '~/src/types/jwt'

interface RefreshResult {
  accessToken: string,
  refreshedAt: number,
}

type InitialAction = PayloadAction<JwtToken | null>
type SignInAction = PayloadAction<JwtToken>
type SignOutAction = PayloadAction<undefined>
type RefreshAction = PayloadAction<RefreshResult>

const initialState: JwtState = {
  isAuthenticated: false,
  isInitialized: false,
  token: null,
}

const reducers = {
  initial(state: JwtState, action: InitialAction): void {
    const token = action.payload
    state.isInitialized = true
    if (token != null) {
      state.isAuthenticated = true
      state.token = token
    }
  },
  signIn(state: JwtState, action: SignInAction): void {
    const token = action.payload
    state.isAuthenticated = true
    state.token = token
  },
  signOut(state: JwtState, action: SignOutAction): void {
    state.isAuthenticated = false
    state.token = null
  },
  refresh(state: JwtState, action: RefreshAction): void {
    const { accessToken, refreshedAt } = action.payload
    state.token!.access = accessToken
    state.token!.refreshedAt = refreshedAt
  }
}

export const slice = createSlice({
  name: 'jwt',
  initialState,
  reducers,
})

export const { reducer } = slice
