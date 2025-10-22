import { apiService } from './api'
import { API_ENDPOINTS, addQueryParams } from '../config/endpoints'
import { API_CONFIG } from '../config/api'
import type { ApiResponse, ServiceLv1ApiResponse, ServiceLv2ApiResponse } from '../types'

export const serviceService = {
  // Get service categories (Level 1)
  getServicesLv1: async (): Promise<ApiResponse<ServiceLv1ApiResponse>> => {
    const url = addQueryParams(API_ENDPOINTS.WEBBOOKING.GET_SERVICES_LV1, {
      store_id: API_CONFIG.STORE_ID,
    })
    const response = await apiService.get<ApiResponse<ServiceLv1ApiResponse>>(url)
    return response.data
  },

  // Get services by category (Level 2)
  getServicesLv2: async (lv1ServiceId: string, search?: string): Promise<ApiResponse<ServiceLv2ApiResponse>> => {
    const params: Record<string, any> = {
      store_id: API_CONFIG.STORE_ID,
      lv1_service_id: lv1ServiceId,
    }

    if (search) {
      params.search = search
    }

    const url = addQueryParams(API_ENDPOINTS.WEBBOOKING.GET_SERVICES_LV2, params)
    const response = await apiService.get<ApiResponse<ServiceLv2ApiResponse>>(url)
    return response.data
  },
}
