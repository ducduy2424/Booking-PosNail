import { configureStore } from '@reduxjs/toolkit'
import exampleReducer from './slices/exampleSlice'
import bookingReducer from './slices/bookingSlice'
import serviceReducer from './slices/serviceSlice'
import technicianReducer from './slices/technicianSlice'

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    booking: bookingReducer,
    service: serviceReducer,
    technician: technicianReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
