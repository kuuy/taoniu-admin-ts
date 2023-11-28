import { combineReducers } from 'redux'

import {reducer as jwtReducers} from '~/src/slices/jwt'
import { reducer as calendarReducer } from '~/src/slices/calendar'
import { reducer as chatReducer } from '~/src/slices/chat'
import { reducer as kanbanReducer } from '~/src/slices/kanban'
import { reducer as mailReducer } from '~/src/slices/mail'

export default combineReducers({
  jwt: jwtReducers,
  calendar: calendarReducer,
  chat: chatReducer,
  kanban: kanbanReducer,
  mail: mailReducer,
})
