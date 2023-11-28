import * as crypto from 'crypto'
import {api, ApiResponse} from '~/src/utils/api'

type TokenInfo = {
  access_token: string
  refresh_token: string | null
}

type SignInParams = {
  email: string
  password: string
}

class JwtApi {
  async signIn(params: SignInParams): Promise<ApiResponse<TokenInfo>> {
    const { email, password } = params
    const formData = new FormData()
    formData.set("email", email)
    formData.set("password", crypto.createHash('md5').update(password).digest("hex"))
    return api.post('/api/account/v1/login', null, formData)
  }

  async refresh(): Promise<ApiResponse<TokenInfo>> {
    const refreshToken = window.localStorage.getItem("REFRESH_TOKEN") || ""
    const formData = new FormData()
    formData.set("refresh_token", refreshToken)
    return api.post('/api/account/v1/token/refresh', null, formData)
  }
}

export const jwtApi = new JwtApi()
