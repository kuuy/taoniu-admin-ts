export interface NotificationsState {
  isInitialized: boolean
  messages: Record<Message['id'], Message>
}

export interface Message {
  id: string,
  message: string,
}
