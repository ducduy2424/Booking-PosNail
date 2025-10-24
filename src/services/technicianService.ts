import { apiService } from './api'
import { API_ENDPOINTS, addQueryParams } from '../config/endpoints'
import { getStoreIdFromUrl } from '../utils/helpers'
import type { ApiResponse } from '../types'

// API Response Types for Technician
export interface TechnicianApiResponse {
  id: string
  avatar: string
  name: string
  created_at: string
}

export interface TechnicianFilter {
  serviceIds?: string[]
}

export const technicianService = {
  // Get technicians/staffs with optional service filtering
  getTechnicians: async (filters?: TechnicianFilter): Promise<ApiResponse<TechnicianApiResponse>> => {
    const params: Record<string, any> = {
      store_id: getStoreIdFromUrl(),
    }

    if (filters?.serviceIds && filters.serviceIds.length > 0) {
      // Add service IDs as array parameter
      filters.serviceIds.forEach((serviceId, index) => {
        params[`valid_with_all_service_ids[${index}]`] = serviceId
      })
    }

    const url = addQueryParams(API_ENDPOINTS.WEBBOOKING.GET_STAFFS, params)
    const response = await apiService.get<ApiResponse<TechnicianApiResponse>>(url)
    return response.data
  },
}
