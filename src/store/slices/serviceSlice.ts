import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'

// Define types for service
export interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: number // in minutes
  category: string
  image?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface ServiceCategory {
  id: string
  name: string
  description: string
  icon?: string
  isActive: boolean
}

export interface ServiceFilter {
  search?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  isActive?: boolean
  limit?: number
  page?: number
}

// Define the slice state
interface ServiceState {
  services: Service[]
  categories: ServiceCategory[]
  currentService: Service | null
  loading: boolean
  error: string | null
  filters: ServiceFilter
  totalCount: number
}

// Define the initial state
const initialState: ServiceState = {
  services: [],
  categories: [],
  currentService: null,
  loading: false,
  error: null,
  filters: {},
  totalCount: 0,
}

export const serviceSlice = createSlice({
  name: 'service',
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

    // Set services
    setServices: (state, action: PayloadAction<Service[]>) => {
      state.services = action.payload
    },

    // Set categories
    setCategories: (state, action: PayloadAction<ServiceCategory[]>) => {
      state.categories = action.payload
    },

    // Add service
    addService: (state, action: PayloadAction<Service>) => {
      state.services.unshift(action.payload)
      state.totalCount += 1
    },

    // Update service
    updateService: (state, action: PayloadAction<Service>) => {
      const index = state.services.findIndex((service) => service.id === action.payload.id)
      if (index !== -1) {
        state.services[index] = action.payload
      }
    },

    // Remove service
    removeService: (state, action: PayloadAction<string>) => {
      state.services = state.services.filter((service) => service.id !== action.payload)
      state.totalCount -= 1
    },

    // Set current service
    setCurrentService: (state, action: PayloadAction<Service | null>) => {
      state.currentService = action.payload
    },

    // Set filters
    setFilters: (state, action: PayloadAction<ServiceFilter>) => {
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
    resetServiceState: (state) => {
      state.services = []
      state.categories = []
      state.currentService = null
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
  setServices,
  setCategories,
  addService,
  updateService,
  removeService,
  setCurrentService,
  setFilters,
  clearFilters,
  setTotalCount,
  resetServiceState,
} = serviceSlice.actions

// Selectors
export const selectServices = (state: RootState) => state.service?.services || []
export const selectServiceCategories = (state: RootState) => state.service?.categories || []
export const selectCurrentService = (state: RootState) => state.service?.currentService
export const selectServiceLoading = (state: RootState) => state.service?.loading || false
export const selectServiceError = (state: RootState) => state.service?.error
export const selectServiceFilters = (state: RootState) => state.service?.filters || {}
export const selectServiceTotalCount = (state: RootState) => state.service?.totalCount || 0

export default serviceSlice.reducer
