import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {
  LoggerState,
} from '~/src/types/logger'

type PushAction = PayloadAction<LoggerState>

const initialState: LoggerState = {
  lever: "",
  message: "",
  data: [],
}

const reducers = {
  push: (state: LoggerState, action: PushAction) => {
    const { level, message, data } = action.payload;
    state.lever = level
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
