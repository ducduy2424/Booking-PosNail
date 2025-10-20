import type { BookingFilter } from 'store/slices/bookingSlice'
import { apiService } from './api'
import { API_ENDPOINTS } from '../config/endpoints'

export const bookingService = {
  getAll: async (params?: BookingFilter) => {
    const response = await apiService.get(API_ENDPOINTS.BOOKING.GET_ALL, { params })
    return response.data
  },

  getBookings: async (params?: { search?: string; limit?: number; page?: number }) => {
    const response = await apiService.get(API_ENDPOINTS.BOOKING.GET_ALL, { params })
    return response.data
  },

  show: async (id: string) => {
    const response = await apiService.get(API_ENDPOINTS.BOOKING.SHOW.replace(':id', id))
    return response.data
  },

  create: async (data: any) => {
    const response = await apiService.post(API_ENDPOINTS.BOOKING.CREATE, data)
    return response.data
  },

  update: async (id: string, data: any) => {
    const response = await apiService.put(API_ENDPOINTS.BOOKING.UPDATE.replace(':id', id), data)
    return response.data
  },

  delete: async (id: string) => {
    const response = await apiService.delete(API_ENDPOINTS.BOOKING.DELETE.replace(':id', id))
    return response.data
  },

  cancel: async (id: string) => {
    const response = await apiService.post(API_ENDPOINTS.BOOKING.CANCEL.replace(':id', id))
    return response.data
  },

  reschedule: async (id: string, data: any) => {
    const response = await apiService.post(API_ENDPOINTS.BOOKING.RESCHEDULE.replace(':id', id), data)
    return response.data
  },

  confirm: async (id: string) => {
    const response = await apiService.post(API_ENDPOINTS.BOOKING.CONFIRM.replace(':id', id))
    return response.data
  },

  getHistory: async (params?: any) => {
    const response = await apiService.get(API_ENDPOINTS.BOOKING.HISTORY, { params })
    return response.data
  },

  getUpcoming: async (params?: any) => {
    const response = await apiService.get(API_ENDPOINTS.BOOKING.UPCOMING, { params })
    return response.data
  },
}
