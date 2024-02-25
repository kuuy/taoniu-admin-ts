import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {
  LoggerState,
} from '~/src/types/logger'

type PushAction = PayloadAction<LoggerState>

const initialState: LoggerState = {
  level: "",
  message: "",
  data: [],
}

const reducers = {
  push: (state: LoggerState, action: PushAction) => {
    const { level, message, data } = action.payload;
    state.level = level
    state.message = message
    state.data = data
  },
}

export const slice = createSlice({
  name: 'logger',
  initialState,
  reducers,
})

export const { reducer } = slice
