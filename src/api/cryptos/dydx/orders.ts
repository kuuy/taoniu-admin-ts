import {Order} from '~/src/types/dydx/order'
import {api, PaginateResponse} from '~/src/utils/api'
import {Plan} from '~/src/types/dydx/plan';

type ListingsRequest = {
  symbol: string
  positionSide: string
  status: string
  current: number
  pageSize: number
}

class OrdersApi {
  async listings(request: ListingsRequest): Promise<PaginateResponse<Order>> {
    const { symbol, positionSide, status, current, pageSize } = request

    const params = new URLSearchParams()
    params.set("symbol", symbol)
    params.set("position_side", positionSide)
    params.set("status", status)
    params.set("current", current.toString())
    params.set("page_size", pageSize.toString())

    return api.paginate('/api/cryptos/v1/dydx/orders', params)
  }
}

export const ordersApi = new OrdersApi()
