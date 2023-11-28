interface RankingCustomer {
  address1?: string
  address2?: string
  avatar?: string
  city?: string
  country?: string
  email: string
  name: string
}

export interface RankingItem {
  id: string
  billingCycle: 'daily' | 'weekly' | 'monthly' | 'yearly'
  currency: string
  name: string
  quantity: number
  unitAmount: number
}

export interface RankingLog {
  id: string
  createdAt: number
  message: string
}

export type RankingStatus =
  | 'canceled'
  | 'complete'
  | 'pending'
  | 'rejected'

export interface Ranking {
  id: string
  coupon?: string | null
  createdAt: number
  currency?: string
  customer: RankingCustomer
  items?: RankingItem[]
  logs?: RankingLog[]
  number?: string
  paymentMethod: string
  promotionCode?: string
  status: RankingStatus
  totalAmount?: number
}
