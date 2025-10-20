import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'

// Define types for booking
export interface Booking {
  id: string
  name: string
  phone: string
  email?: string
  service: string
  technician: string
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface BookingFilter {
  search?: string
  status?: string
  technician?: string
  service?: string
  dateFrom?: string
  dateTo?: string
  limit?: number
  page?: number
}

// Define the slice state
interface BookingState {
  bookings: Booking[]
  currentBooking: Booking | null
  loading: boolean
  error: string | null
  filters: BookingFilter
  totalCount: number
}

// Define the initial state
const initialState: BookingState = {
  bookings: [],
  currentBooking: null,
  loading: false,
  error: null,
  filters: {},
  totalCount: 0,
}

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },

    // Set error state
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },

    // Set bookings
    setBookings: (state, action: PayloadAction<Booking[]>) => {
      state.bookings = action.payload
    },

    // Add booking
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.unshift(action.payload)
      state.totalCount += 1
    },

    // Update booking
    updateBooking: (state, action: PayloadAction<Booking>) => {
      const index = state.bookings.findIndex((booking) => booking.id === action.payload.id)
      if (index !== -1) {
        state.bookings[index] = action.payload
      }
    },

    // Remove booking
    removeBooking: (state, action: PayloadAction<string>) => {
      state.bookings = state.bookings.filter((booking) => booking.id !== action.payload)
      state.totalCount -= 1
    },

    // Set current booking
    setCurrentBooking: (state, action: PayloadAction<Booking | null>) => {
      state.currentBooking = action.payload
    },

    // Set filters
    setFilters: (state, action: PayloadAction<BookingFilter>) => {
      state.filters = { ...state.filters, ...action.payload }
    },

    // Clear filters
    clearFilters: (state) => {
      state.filters = {}
    },

    // Set total count
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload
    },

    // Reset state
    resetBookingState: (state) => {
      state.bookings = []
      state.currentBooking = null
      state.loading = false
      state.error = null
      state.filters = {}
      state.totalCount = 0
    },
  },
})

export const {
  setLoading,
  setError,
  setBookings,
  addBooking,
  updateBooking,
  removeBooking,
  setCurrentBooking,
  setFilters,
  clearFilters,
  setTotalCount,
  resetBookingState,
} = bookingSlice.actions

// Selectors
export const selectBookings = (state: RootState) => state.booking?.bookings || []
export const selectCurrentBooking = (state: RootState) => state.booking?.currentBooking
export const selectBookingLoading = (state: RootState) => state.booking?.loading || false
export const selectBookingError = (state: RootState) => state.booking?.error
export const selectBookingFilters = (state: RootState) => state.booking?.filters || {}
export const selectBookingTotalCount = (state: RootState) => state.booking?.totalCount || 0

export default bookingSlice.reducer
