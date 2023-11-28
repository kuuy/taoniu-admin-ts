export interface ApiResponse<T> {
  success: boolean
  error?: string
  data?: T
}

export interface PaginateResponse<T> {
  success: boolean
  error?: string
  data?: T[]
  total?: number
  current?: number
  pageSize?: number
}

const defaultOptions: RequestInit = {}

export const api = {
  async request<T>(
    method: string,
    path: string,
    params: URLSearchParams | null,
    options: RequestInit,
  ): Promise<any> {
    const accessToken = window.localStorage.getItem("ACCESS_TOKEN") || ""
    const init: RequestInit = {
      ...defaultOptions,
      ...options,
      method,
      headers: {
        "Authorization": `Taoniu ${accessToken}`,
      },
    }

    if (params !== null) {
      path = `${path}?${params.toString()}`
    }

    const response = await fetch(path, init)
    if (!response.ok) {
      throw new Error('Failed Request Api')
    }

    return response.json()
  },
  async get<T = void>(
    path: string,
    params: URLSearchParams | null,
  ): Promise<ApiResponse<T>> {
    return this.request('GET', path, params, {})
  },
  async paginate<T = void>(
    path: string,
    params: URLSearchParams | null,
  ): Promise<PaginateResponse<T>> {
    return this.request('GET', path, params, {})
  },
  async post<T = void>(
    path: string,
    params: URLSearchParams | null,
    body: FormData,
  ): Promise<ApiResponse<T>> {
    return this.request('POST', path, params, {
      body: body,
    })
  },
  async put<T = void>(
    path: string,
    params: URLSearchParams | null,
    body: FormData,
  ): Promise<ApiResponse<T>> {
    return this.request('PUT', path, params, {
      body: body,
    })
  },
  async delete<T = void>(
    path: string,
    params: URLSearchParams | null,
  ): Promise<ApiResponse<T>> {
    return this.request('DELETE', path, params, {})
  },
}
