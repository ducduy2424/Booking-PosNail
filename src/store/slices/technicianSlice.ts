import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../index'
import { technicianService } from '../../services/technicianService'
import type {
  TechnicianApiResponse,
  TechnicianFilter as ServiceTechnicianFilter,
} from '../../services/technicianService'

// Define types for technician
export interface Technician {
  id: string
  avatar: string
  name: string
  createdAt: string
}

export interface TechnicianAvailability {
  id: string
  technicianId: string
  date: string
  startTime: string
  endTime: string
  isAvailable: boolean
}

export interface TechnicianFilter {
  search?: string
  specialty?: string
  minRating?: number
  isActive?: boolean
  limit?: number
  page?: number
}

// Define the slice state
interface TechnicianState {
  technicians: Technician[]
  currentTechnician: Technician | null
  availability: TechnicianAvailability[]
  loading: boolean
  error: string | null
  filters: TechnicianFilter
  totalCount: number
}

// Define the initial state
const initialState: TechnicianState = {
  technicians: [],
  currentTechnician: null,
  availability: [],
  loading: false,
  error: null,
  filters: {},
  totalCount: 0,
}

// Helper function to transform API response to UI format
const transformTechnicianFromApi = (apiTechnician: TechnicianApiResponse): Technician => ({
  id: apiTechnician.id,
  avatar: apiTechnician.avatar,
  name: apiTechnician.name,
  createdAt: apiTechnician.created_at,
})

// Async thunk for fetching technicians
export const fetchTechnicians = createAsyncThunk(
  'technician/fetchTechnicians',
  async (filters: ServiceTechnicianFilter, { rejectWithValue }) => {
    try {
      const response = await technicianService.getTechnicians(filters)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch technicians')
    }
  }
)

export const technicianSlice = createSlice({
  name: 'technician',
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

    // Set technicians
    setTechnicians: (state, action: PayloadAction<Technician[]>) => {
      state.technicians = action.payload
    },

    // Set availability
    setAvailability: (state, action: PayloadAction<TechnicianAvailability[]>) => {
      state.availability = action.payload
    },

    // Add technician
    addTechnician: (state, action: PayloadAction<Technician>) => {
      state.technicians.unshift(action.payload)
      state.totalCount += 1
    },

    // Update technician
    updateTechnician: (state, action: PayloadAction<Technician>) => {
      const index = state.technicians.findIndex((technician) => technician.id === action.payload.id)
      if (index !== -1) {
        state.technicians[index] = action.payload
      }
    },

    // Remove technician
    removeTechnician: (state, action: PayloadAction<string>) => {
      state.technicians = state.technicians.filter((technician) => technician.id !== action.payload)
      state.totalCount -= 1
    },

    // Set current technician
    setCurrentTechnician: (state, action: PayloadAction<Technician | null>) => {
      state.currentTechnician = action.payload
    },

    // Set filters
    setFilters: (state, action: PayloadAction<TechnicianFilter>) => {
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
    resetTechnicianState: (state) => {
      state.technicians = []
      state.currentTechnician = null
      state.availability = []
      state.loading = false
      state.error = null
      state.filters = {}
      state.totalCount = 0
    },
  },
  extraReducers: (builder) => {
    // Handle fetchTechnicians
    builder
      .addCase(fetchTechnicians.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTechnicians.fulfilled, (state, action) => {
        state.loading = false
        state.technicians = action.payload.map(transformTechnicianFromApi)
        state.totalCount = action.payload.length
      })
      .addCase(fetchTechnicians.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const {
  setLoading,
  setError,
  setTechnicians,
  setAvailability,
  addTechnician,
  updateTechnician,
  removeTechnician,
  setCurrentTechnician,
  setFilters,
  clearFilters,
  setTotalCount,
  resetTechnicianState,
} = technicianSlice.actions

// Selectors
export const selectTechnicians = (state: RootState) => state.technician?.technicians || []
export const selectCurrentTechnician = (state: RootState) => state.technician?.currentTechnician
export const selectTechnicianAvailability = (state: RootState) => state.technician?.availability || []
export const selectTechnicianLoading = (state: RootState) => state.technician?.loading || false
export const selectTechnicianError = (state: RootState) => state.technician?.error
export const selectTechnicianFilters = (state: RootState) => state.technician?.filters || {}
export const selectTechnicianTotalCount = (state: RootState) => state.technician?.totalCount || 0

export default technicianSlice.reducer
