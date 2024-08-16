import * as crypto from 'crypto'
import {api, ApiResponse} from '~/src/utils/api'
import {jwe} from '~/src/utils/jwe'

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
    const payload = await jwe.encrypt(JSON.stringify({
      "email": email,
      "password": crypto.createHash('md5').update(password).digest("hex"),
    }))
    return api.post('/api/account/v1/login', null, new TextEncoder().encode(payload))
  }

  async refresh(): Promise<ApiResponse<TokenInfo>> {
    const refreshToken = window.localStorage.getItem("REFRESH_TOKEN") || ""
    const payload = await jwe.encrypt(JSON.stringify({
      "refresh_token": refreshToken,
    }))
    return api.post('/api/account/v1/token/refresh', null, new TextEncoder().encode(payload))
  }
}

export const jwtApi = new JwtApi()
