import {Scalping} from '~/src/types/binance/spot/analysis/tradings/scalping'
import {api, PaginateResponse} from '~/src/utils/api'

type ListingsRequest = {
  current: number
  pageSize: number
}

class ScalpingApi {
  async listings(request: ListingsRequest): Promise<PaginateResponse<Scalping>> {
    const { current, pageSize } = request

    const params = new URLSearchParams()
    params.set("current", current.toString())
    params.set("page_size", pageSize.toString())

    return api.paginate('/api/cryptos/v1/binance/spot/analysis/tradings/scalping', params)
  }
}

export const scalpingApi = new ScalpingApi()
