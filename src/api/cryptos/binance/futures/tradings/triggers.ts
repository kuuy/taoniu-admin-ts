import {TradingInfo} from '~/src/types/binance/futures/tradings/trigger'
import {api, PaginateResponse} from '~/src/utils/api'

type ListingsRequest = {
  symbol: string
  side?: number
  status?: string
  current: number
  pageSize: number
}

class TriggersApi {
  async listings(request: ListingsRequest): Promise<PaginateResponse<TradingInfo>> {
    const { symbol, side, status, current, pageSize } = request

    const params = new URLSearchParams({
      "symbol": symbol,
    })
    if (side !== undefined) {
      params.set("side", side.toString())
    }
    if (status !== undefined) {
      params.set("status", status)
    }
    params.set("current", current.toString())
    params.set("page_size", pageSize.toString())

    return api.paginate('/api/cryptos/v1/binance/futures/tradings/triggers', params)
  }
}

export const triggersApi = new TriggersApi()
