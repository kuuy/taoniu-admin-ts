import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {
  Message,
  NotificationsState,
} from '~/src/types/notifications'

type CreateAction = PayloadAction<Message>
type DeleteAction = PayloadAction<string>

const initialState: NotificationsState = {
  isInitialized: false,
  messages: {},
}

const reducers = {
  create(state: NotificationsState, { payload }: CreateAction): void {
    const message = payload
    state.messages[message.id] = message
  },
  delete(state: NotificationsState, { payload }: DeleteAction): void {
    const id = payload
    delete state.messages[id]
  },
}

export const slice = createSlice({
  name: 'notifications',
  initialState,
  reducers,
})

export const { reducer } = slice
