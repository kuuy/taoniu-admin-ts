interface IndicatorCustomer {
  address1?: string
  address2?: string
  avatar?: string
  city?: string
  country?: string
  email: string
  name: string
}

export interface IndicatorItem {
  id: string
  billingCycle: 'daily' | 'weekly' | 'monthly' | 'yearly'
  currency: string
  name: string
  quantity: number
  unitAmount: number
}

export interface IndicatorLog {
  id: string
  createdAt: number
  message: string
}

export type IndicatorStatus =
  | 'canceled'
  | 'complete'
  | 'pending'
  | 'rejected'

export type IndicatorsResult = Promise<Record<string, number>>

export interface Indicator {
  id: string
  coupon?: string | null
  createdAt: number
  currency?: string
  customer: IndicatorCustomer
  items?: IndicatorItem[]
  logs?: IndicatorLog[]
  number?: string
  paymentMethod: string
  promotionCode?: string
  status: IndicatorStatus
  totalAmount?: number
}
