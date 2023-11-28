import {Scalping} from '~/src/types/dydx/scalping'
import {api, PaginateResponse} from '~/src/utils/api'
import {Strategy} from '~/src/types/dydx/strategy';

type ListingsRequest = {
  symbol: string
  side?: number
  status?: string
  current: number
  pageSize: number
}

class ScalpingApi {
  async listings(request: ListingsRequest): Promise<PaginateResponse<Scalping>> {
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

    return api.paginate('/api/cryptos/v1/dydx/scalping', params)
  }
}

export const scalpingApi = new ScalpingApi()
