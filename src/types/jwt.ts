
export interface JwtState {
  isInitialized: boolean
  isAuthenticated: boolean
  token: JwtToken | null
}

export type JwtToken = {
  access: string
  refresh: string
  refreshedAt: number
  expiredAt: number
}
