import {api, ApiResponse, PaginateResponse} from '~/src/utils/api'

type GetsRequest = {
  symbols: string
  interval: string
  fields: string
}

type RankingRequest = {
  symbols: string
  interval: string
  fields: string
  sort: string
  current: number
  pageSize: number
}

class IndicatorsApi {
  async gets(request: GetsRequest): Promise<ApiResponse<string[]>> {
    const { symbols, interval, fields } = request

    const params = new URLSearchParams()
    params.set("symbols", symbols)
    params.set("interval", interval)
    params.set("fields", fields)

    return api.get('/api/cryptos/v1/dydx/indicators', params)
  }

  async ranking(request: RankingRequest): Promise<PaginateResponse<string>> {
    const { symbols, interval, fields, sort, current, pageSize } = request

    const params = new URLSearchParams()
    params.set("symbols", symbols)
    params.set("interval", interval)
    params.set("fields", fields)
    params.set("sort", sort)
    params.set("current", current.toString())
    params.set("page_size", pageSize.toString())

    return api.paginate('/api/cryptos/v1/dydx/indicators/ranking', params)
  }
}

export const indicatorsApi = new IndicatorsApi()
