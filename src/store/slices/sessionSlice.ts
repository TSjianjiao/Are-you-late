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

// // 处理异步
// /**
//  * 这个action返回一个函数
//  * 这个函数返回一个promise
//  */
//  export const changeColor = () => (dispatch) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       dispatch(randomColor())
//       resolve(0)
//     }, 1000)
//   })
// }

export const { saveSession } = sessionSlice.actions
export default sessionSlice.reducer
