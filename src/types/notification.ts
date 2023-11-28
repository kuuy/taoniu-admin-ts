export type NotificationState = {
  initialized: boolean
  notifications: Notification[]
}

export type NotificationStatus =
  | 'pending'
  | 'confirmed'
  | 'rejected'

export interface Notification {
  timestamp: number
  title?: string
  hash: string
  status: NotificationStatus
}

export interface NotificationStateProps extends Partial<NotificationState> {}

export interface NotificationAddProps {
  notification: Notification,
}

export interface NotificationRemoveProps {
  hash: string,
}

export interface NotificationUpdateProps extends Partial<Notification> {
  hash: string
}
