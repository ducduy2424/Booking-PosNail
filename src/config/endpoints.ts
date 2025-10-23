// API Endpoints Configuration
export const API_ENDPOINTS = {
  // Booking endpoints (main functionality)
  WEBBOOKING: {
    GET_SERVICES_LV1: '/webbooking/services-lv1',
    GET_SERVICES_LV2: '/webbooking/services',
    GET_STAFFS: '/webbooking/staffs',
    CREATE_TICKET: '/webbooking/tickets',
  },
} as const

// Helper function to build endpoint URLs
export const buildEndpoint = (endpoint: string, params?: Record<string, string | number>): string => {
  let url = endpoint

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, String(value))
    })
  }

  return url
}

// Helper function to add query parameters
export const addQueryParams = (url: string, params?: Record<string, any>): string => {
  if (!params || Object.keys(params).length === 0) {
    return url
  }

  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value))
    }
  })

  const queryString = searchParams.toString()
  return queryString ? `${url}?${queryString}` : url
}
