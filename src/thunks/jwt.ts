import type { AppThunk } from '~/src/store'
import { slice } from '~/src/slices/jwt'
import { jwtApi } from '~/src/api/account/jwt'

type SignInParams = {
  email: string
  password: string
}

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN'
const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN'
const REFRESH_AT_KEY = 'REFRESH_AT'
const EXPIRED_AT_KEY = 'EXPIRED_AT'

const initial = (): AppThunk => async (dispatch): Promise<void> => {
  const accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY) || ""
  if (accessToken === "") {
    dispatch(slice.actions.initial())
    return
  }

  const refreshToken = window.localStorage.getItem(REFRESH_TOKEN_KEY) || ""
  const refreshedAt = Number(window.localStorage.getItem(REFRESH_AT_KEY) || "")
  const expiredAt = Number(window.localStorage.getItem(EXPIRED_AT_KEY) || "")

  dispatch(slice.actions.initial({
    access: accessToken,
    refresh: refreshToken,
    refreshedAt: refreshedAt,
    expiredAt: expiredAt,
  }))
}

const signIn = (params: SignInParams): AppThunk => async (dispatch): Promise<void> => {
  jwtApi.signIn(params).then(result => {
    const timestamp = new Date().getTime()
    const refreshedAt = timestamp + 860000
    const expiredAt = timestamp + 1209560000

    dispatch(slice.actions.signIn({
      access: result.data!.access_token,
      refresh: result.data!.refresh_token!,
      refreshedAt: refreshedAt,
      expiredAt: expiredAt,
    }))

    window.localStorage.setItem(ACCESS_TOKEN_KEY, result.data!.access_token)
    window.localStorage.setItem(REFRESH_TOKEN_KEY, result.data!.refresh_token!)
    window.localStorage.setItem(REFRESH_AT_KEY, refreshedAt.toString())
    window.localStorage.setItem(EXPIRED_AT_KEY, expiredAt.toString())
  }).catch(error => {
    console.log('error', error)
    throw new Error("jwt sign in error")
  })
}

const signOut = (): AppThunk => async (dispatch): Promise<void> => {
  dispatch(slice.actions.signOut())

  window.localStorage.removeItem(ACCESS_TOKEN_KEY)
  window.localStorage.removeItem(REFRESH_TOKEN_KEY)
  window.localStorage.removeItem(REFRESH_AT_KEY)
  window.localStorage.removeItem(EXPIRED_AT_KEY)
}

const refresh = (): AppThunk => async (dispatch): Promise<void> => {
  jwtApi.refresh().then(result => {
    const timestamp = new Date().getTime()
    const refreshedAt = timestamp + 860000

    dispatch(slice.actions.refresh({
      accessToken: result.data!.access_token,
      refreshedAt: refreshedAt,
    }))

    window.localStorage.setItem(ACCESS_TOKEN_KEY, result.data!.access_token)
    window.localStorage.setItem(REFRESH_AT_KEY, refreshedAt.toString())
  }).catch(() => {})
}

const thunks = {
  initial,
  signIn,
  signOut,
  refresh,
}

export default thunks
