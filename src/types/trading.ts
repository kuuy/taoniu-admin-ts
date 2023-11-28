interface TradingCustomer {
  address1?: string
  address2?: string
  avatar?: string
  city?: string
  country?: string
  email: string
  name: string
}

export interface TradingItem {
  id: string
  billingCycle: 'daily' | 'weekly' | 'monthly' | 'yearly'
  currency: string
  name: string
  quantity: number
  unitAmount: number
}

export interface TradingLog {
  id: string
  createdAt: number
  message: string
}

export type TradingStatus =
  | 'canceled'
  | 'complete'
  | 'pending'
  | 'rejected'

export interface Trading {
  id: string
  coupon?: string | null
  createdAt: number
  currency?: string
  customer: TradingCustomer
  items?: TradingItem[]
  logs?: TradingLog[]
  number?: string
  paymentMethod: string
  promotionCode?: string
  status: TradingStatus
  totalAmount?: number
}
