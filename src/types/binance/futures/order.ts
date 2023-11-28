export interface Order {
  id: string
  symbol: number
  order_id: number
  type: string
  position_side: number
  side: number
  price: number
  quantity: number
  open_time: number
  update_time: number
  reduce_only: boolean
  status: number
}
