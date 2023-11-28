import {Trigger} from '~/src/types/dydx/trigger'
import {api, PaginateResponse} from '~/src/utils/api'

type ListingsRequest = {
  symbol: string
  side?: number
  status?: string
  current: number
  pageSize: number
}

class TriggersApi {
  async listings(request: ListingsRequest): Promise<PaginateResponse<Trigger>> {
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

    return api.paginate('/api/cryptos/v1/dydx/triggers', params)
  }
}

export const triggersApi = new TriggersApi()
