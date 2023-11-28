import type { FC, ReactNode } from 'react'
import { createContext, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'

import {useDispatch, useSelector} from '~/src/store'
import { Issuer } from '~/src/utils/auth'
import thunks from '~/src/thunks/jwt'
import {JwtState} from '~/src/types/jwt'

export interface AuthJwtState extends JwtState {
  issuer: Issuer.JWT
  refresh: () => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthJwtState>({
  isInitialized: false,
  isAuthenticated: false,
  token: null,
  issuer: Issuer.JWT,
  refresh: () => Promise.resolve(),
  signIn: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
})

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props
  const dispatch = useDispatch()
  const jwt = useSelector((state) => state.jwt)

  const initialize = useCallback(
    async (): Promise<void> => {
      dispatch(thunks.initial())
    },
    [dispatch, jwt]
  )

  useEffect(() => {
      if (!jwt.isInitialized) {
        initialize()
        if (jwt.isAuthenticated) {
          refresh()
        }
      }
      const interval = setInterval(() => {
        console.log("jwt", jwt)
        if (jwt.isAuthenticated) {
          refresh()
        }
      }, 5000)
      return () => clearInterval(interval)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [jwt],
  )

  const refresh = useCallback(
    async (): Promise<void> => {
      const timestamp = new Date().getTime()
      if (jwt.token!.refreshedAt > timestamp) {
        return
      }
      dispatch(thunks.refresh())
    },
    [dispatch, jwt]
  )

  const signIn = useCallback(
    async (email: string, password: string): Promise<void> => {
      try {
        dispatch(thunks.signIn({
          email: email,
          password: password,
        }))
      } catch (err) {
        console.error(err)
      }
    },
    [dispatch, jwt]
  )

  const signOut = useCallback(
    async (): Promise<void> => {
      dispatch(thunks.signOut())
    },
    [dispatch, jwt]
  )

  return (
      <AuthContext.Provider
          value={{
            ...jwt,
            issuer: Issuer.JWT,
            refresh,
            signIn,
            signOut
          }}
      >
        {children}
      </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export const AuthConsumer = AuthContext.Consumer
