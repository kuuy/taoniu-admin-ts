import type { AppThunk } from '~/src/store'
import { slice } from '~/src/slices/logger'

const push = (level: string, message: string, ...data: any[]): AppThunk => async (dispatch): Promise<void> => {
  dispatch(slice.actions.push({
    level: level,
    message: message,
    data: data,
  }))
}

const thunks = {
  push,
}

export default thunks
