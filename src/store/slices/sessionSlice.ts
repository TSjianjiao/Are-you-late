import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export interface SessionState {
  session: string
}
const initialState: SessionState = {
  session: ''
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    saveSession: (state, action:PayloadAction<string>) => {
      state.session = action.payload
    }
  }
})

export const { saveSession } = sessionSlice.actions
export default sessionSlice.reducer
