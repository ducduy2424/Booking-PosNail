import { apiService } from './api'
import { API_ENDPOINTS } from '../config/endpoints'

export const technicianService = {
  getAll: async (params?: any) => {
    const response = await apiService.get(API_ENDPOINTS.TECHNICIAN.GET_ALL, { params })
    return response.data
  },

  show: async (id: string) => {
    const response = await apiService.get(API_ENDPOINTS.TECHNICIAN.SHOW.replace(':id', id))
    return response.data
  },

  create: async (data: any) => {
    const response = await apiService.post(API_ENDPOINTS.TECHNICIAN.CREATE, data)
    return response.data
  },

  update: async (id: string, data: any) => {
    const response = await apiService.put(API_ENDPOINTS.TECHNICIAN.UPDATE.replace(':id', id), data)
    return response.data
  },

  delete: async (id: string) => {
    const response = await apiService.delete(API_ENDPOINTS.TECHNICIAN.DELETE.replace(':id', id))
    return response.data
  },

  getAvailability: async (id: string, params?: any) => {
    const response = await apiService.get(API_ENDPOINTS.TECHNICIAN.AVAILABILITY.replace(':id', id), { params })
    return response.data
  },

  getSchedule: async (id: string, params?: any) => {
    const response = await apiService.get(API_ENDPOINTS.TECHNICIAN.SCHEDULE.replace(':id', id), { params })
    return response.data
  },

  getServices: async (id: string) => {
    const response = await apiService.get(API_ENDPOINTS.TECHNICIAN.SERVICES.replace(':id', id))
    return response.data
  },

  getRatings: async (id: string, params?: any) => {
    const response = await apiService.get(API_ENDPOINTS.TECHNICIAN.RATINGS.replace(':id', id), { params })
    return response.data
  },
}
