import {api, ApiResponse, PaginateResponse} from '~/src/utils/api'

type GetsRequest = {
  symbols: string
  interval: string
  fields: string
}

type RankingRequest = {
  symbols: string | undefined
  fields: string
  sort: string
  current: number
  pageSize: number
}

class TickersApi {
  async gets(request: GetsRequest): Promise<ApiResponse<string[]>> {
    const { symbols, interval, fields } = request

    const params = new URLSearchParams()
    params.set("symbols", symbols)
    params.set("interval", interval)
    params.set("fields", fields)

    const accessToken = window.localStorage.getItem("ACCESS_TOKEN") || ""

    return api.get('/api/cryptos/v1/dydx/tickers', params)
  }

  async ranking(request: RankingRequest): Promise<PaginateResponse<string>> {
    const { symbols, fields, sort, current, pageSize } = request

    const params = new URLSearchParams()
    if (symbols !== undefined) {
      params.set("symbols", symbols)
    }
    params.set("fields", fields)
    params.set("sort", sort)
    params.set("current", current.toString())
    params.set("page_size", pageSize.toString())

    return api.paginate('/api/cryptos/v1/dydx/tickers/ranking', params)
  }
}

export const tickersApi = new TickersApi()
