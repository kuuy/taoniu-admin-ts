import {RankingItem, RankingLog, RankingStatus} from '~/src/types/indicator-ranking'

export interface Ranking {
  symbol: string
  price: number
  open: number
  high: number
  low: number
  volume: number
  quota: number
  change: number
}
