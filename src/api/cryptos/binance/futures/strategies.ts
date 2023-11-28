import {Strategy} from '~/src/types/binance/futures/strategy'
import {api, PaginateResponse} from '~/src/utils/api'

type ListingsRequest = {
  symbol: string
  signal?: number
  status?: string
  current: number
  pageSize: number
}

class StrategiesApi {
  async listings(request: ListingsRequest): Promise<PaginateResponse<Strategy>> {
    const { symbol, signal, status, current, pageSize } = request
    const accessToken = window.localStorage.getItem("ACCESS_TOKEN") || ""

    const params = new URLSearchParams()
    params.set("symbol", symbol)
    if (signal !== undefined) {
      params.set("signal", signal.toString())
    }
    if (status !== undefined) {
      params.set("status", status)
    }
    params.set("current", current.toString())
    params.set("page_size", pageSize.toString())

    return api.paginate('/api/cryptos/v1/binance/futures/strategies', params)
  }
}

export const strategiesApi = new StrategiesApi()
