import type { AppThunk } from '~/src/store'
import { slice } from '~/src/slices/mqtt'

const initial = (): AppThunk => async (dispatch): Promise<void> => {
  dispatch(slice.actions.initial())
}

const thunks = {
  initial,
}

export default thunks
