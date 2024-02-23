import {Position} from '~/src/types/position'
import {api, ApiResponse} from '~/src/utils/api'

type GetsRequest = {
  side: number
}

type CalcRequest = {
  symbol: string
  side: number
}

class PositionsApi {
  async gets(request: GetsRequest): Promise<ApiResponse<Position[]>> {
    const { side } = request

    const params = new URLSearchParams()
    params.set("side", side.toString())

    return api.get('/api/cryptos/v1/binance/futures/positions', params)
  }

  async calc(request: CalcRequest): Promise<ApiResponse<string[]>> {
    const { symbol, side } = request

    const params = new URLSearchParams()
    params.set("symbol", symbol)
    params.set("side", side.toString())

    return api.get('/api/cryptos/v1/binance/futures/positions/calc', params)
  }
}

export const positionsApi = new PositionsApi()
