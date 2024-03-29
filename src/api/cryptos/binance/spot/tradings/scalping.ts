import {TradingInfo} from '~/src/types/binance/spot/tradings/scalping'
import {api, PaginateResponse} from '~/src/utils/api'

type ListingsRequest = {
  symbol: string
  side?: number
  status?: string
  current: number
  pageSize: number
}

class ScalpingApi {
  async listings(request: ListingsRequest): Promise<PaginateResponse<TradingInfo>> {
    const { symbol, side, status, current, pageSize } = request

    const params = new URLSearchParams()
    params.set("symbol", symbol)
    if (side !== undefined) {
      params.set("side", side.toString())
    }
    if (status !== undefined) {
      params.set("status", status)
    }
    params.set("current", current.toString())
    params.set("page_size", pageSize.toString())

    return api.paginate('/api/cryptos/v1/binance/spot/tradings/scalping', params)
  }
}

export const scalpingApi = new ScalpingApi()
