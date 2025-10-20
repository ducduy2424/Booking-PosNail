import { apiService } from './api'
import { API_ENDPOINTS } from '../config/endpoints'

export const serviceService = {
  getAll: async (params?: any) => {
    const response = await apiService.get(API_ENDPOINTS.SERVICE.GET_ALL, { params })
    return response.data
  },

  show: async (id: string) => {
    const response = await apiService.get(API_ENDPOINTS.SERVICE.SHOW.replace(':id', id))
    return response.data
  },

  create: async (data: any) => {
    const response = await apiService.post(API_ENDPOINTS.SERVICE.CREATE, data)
    return response.data
  },

  update: async (id: string, data: any) => {
    const response = await apiService.put(API_ENDPOINTS.SERVICE.UPDATE.replace(':id', id), data)
    return response.data
  },

  delete: async (id: string) => {
    const response = await apiService.delete(API_ENDPOINTS.SERVICE.DELETE.replace(':id', id))
    return response.data
  },

  getCategories: async () => {
    const response = await apiService.get(API_ENDPOINTS.SERVICE.CATEGORIES)
    return response.data
  },

  getByCategory: async (categoryId: string, params?: any) => {
    const response = await apiService.get(API_ENDPOINTS.SERVICE.BY_CATEGORY.replace(':categoryId', categoryId), {
      params,
    })
    return response.data
  },
}
