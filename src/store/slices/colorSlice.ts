import { createSlice } from '@reduxjs/toolkit'

export interface ColorState {
  value:string
}
const initialState:ColorState = {
  value: ''
}

export const colorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    randomColor(state) {
      // 不同返回全新的state 可以直接改 因为tookit内部已经处理了
      state.value = `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(Math.random() * 255)}, ${Math.ceil(Math.random() * 255)})`
    }
  }
})

export const { randomColor } = colorSlice.actions

// 处理异步
/**
 * 这个action返回一个函数
 * 这个函数返回一个promise
 */
export const changeColor = () => (dispatch) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      dispatch(randomColor())
      resolve(0)
    }, 1000)
  })
}

export default colorSlice.reducer
