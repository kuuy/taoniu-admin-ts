import {Position} from '~/src/types/position'
import {api, ApiResponse} from '~/src/utils/api'

type CalcRequest = {
  symbol: string
  side: number
}

class PositionsApi {
  async gets(): Promise<ApiResponse<Position[]>> {

    const params = new URLSearchParams()

    return api.get('/api/cryptos/v1/binance/spot/positions', params)
  }

  async calc(request: CalcRequest): Promise<ApiResponse<string[]>> {
    const { symbol, side } = request

    const params = new URLSearchParams()
    params.set("symbol", symbol)
    params.set("side", side.toString())

    return api.get('/api/cryptos/v1/binance/spot/positions/calc', params)
  }
}

export const positionsApi = new PositionsApi()
