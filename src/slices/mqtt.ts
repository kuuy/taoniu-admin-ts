import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {
  MqttState,
} from '~/src/types/mqtt'

type InitialAction = PayloadAction<MqttState | null>

const initialState: MqttState = {
  isConnected: false,
  isInitialized: false,
  topics: [],
}

const reducers = {
  initial: (state: MqttState, action: InitialAction) => {
    state.isInitialized = true
  },
}

export const slice = createSlice({
  name: 'mqtt',
  initialState,
  reducers,
})

export const { reducer } = slice
