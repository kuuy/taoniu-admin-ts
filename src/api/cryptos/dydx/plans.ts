import {Plan} from '~/src/types/dydx/plan'
import {api, PaginateResponse} from '~/src/utils/api'
import {Scalping} from '~/src/types/dydx/scalping';

type ListingsRequest = {
  symbol: string
  side?: number
  status?: string
  current: number
  pageSize: number
}

class PlansApi {
  async listings(request: ListingsRequest): Promise<PaginateResponse<Plan>> {
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

    return api.paginate('/api/cryptos/v1/dydx/plans', params)
  }
}

export const plansApi = new PlansApi()
