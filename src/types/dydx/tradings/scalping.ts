export interface TradingInfo {
  id: string
  symbol: string
  scalping_id: string
  plan_id: string
  buy_price: number
  sell_price: number
  buy_quantity: number
  sell_quantity: number
  buy_order_id: string
  sell_order_id: string
  status: number
  created_at: number
  updated_at: number
}
