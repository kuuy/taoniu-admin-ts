import {createSlice, PayloadAction} from '@reduxjs/toolkit'

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
  initial: (state: JwtState, { payload } : InitialAction) => {
    const token = payload
    state.isInitialized = true
    if (token != null) {
      state.isAuthenticated = true
      state.token = token
    }
  },
  signIn(state: JwtState, { payload }: SignInAction): void {
    const token = payload
    state.isAuthenticated = true
    state.token = token
  },
  signOut(state: JwtState): void {
    state.isAuthenticated = false
    state.token = null
  },
  refresh(state: JwtState, { payload }: RefreshAction): void {
    const { accessToken, refreshedAt } = payload
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
