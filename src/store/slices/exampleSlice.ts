import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ExampleState {
  count: number
  message: string
}

const initialState: ExampleState = {
  count: 0,
  message: 'Hello from Redux!',
}

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1
    },
    decrement: (state) => {
      state.count -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.count += action.payload
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload
    },
    reset: (state) => {
      state.count = 0
      state.message = 'Hello from Redux!'
    },
  },
})

export const { increment, decrement, incrementByAmount, setMessage, reset } = exampleSlice.actions
export default exampleSlice.reducer
