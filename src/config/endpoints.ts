// API Endpoints Configuration
export const API_ENDPOINTS = {
  // Booking endpoints (main functionality)
  BOOKING: {
    GET_ALL: '/bookings',
    CREATE: '/bookings',
    SHOW: '/bookings/:id',
    UPDATE: '/bookings/:id',
    DELETE: '/bookings/:id',
    CANCEL: '/bookings/:id/cancel',
    RESCHEDULE: '/bookings/:id/reschedule',
    CONFIRM: '/bookings/:id/confirm',
    HISTORY: '/bookings/history',
    UPCOMING: '/bookings/upcoming',
  },

  // Service endpoints
  SERVICE: {
    GET_ALL: '/services',
    CREATE: '/services',
    SHOW: '/services/:id',
    UPDATE: '/services/:id',
    DELETE: '/services/:id',
    CATEGORIES: '/services/categories',
    BY_CATEGORY: '/services/category/:categoryId',
  },

  // Technician endpoints
  TECHNICIAN: {
    GET_ALL: '/technicians',
    CREATE: '/technicians',
    SHOW: '/technicians/:id',
    UPDATE: '/technicians/:id',
    DELETE: '/technicians/:id',
    AVAILABILITY: '/technicians/:id/availability',
    SCHEDULE: '/technicians/:id/schedule',
    SERVICES: '/technicians/:id/services',
    RATINGS: '/technicians/:id/ratings',
  },

  // Appointment endpoints
  APPOINTMENT: {
    GET_ALL: '/appointments',
    CREATE: '/appointments',
    SHOW: '/appointments/:id',
    UPDATE: '/appointments/:id',
    DELETE: '/appointments/:id',
    AVAILABLE_SLOTS: '/appointments/available-slots',
    BOOK: '/appointments/book',
    CANCEL: '/appointments/:id/cancel',
    RESCHEDULE: '/appointments/:id/reschedule',
  },

  // Payment endpoints
  PAYMENT: {
    CREATE: '/payments',
    SHOW: '/payments/:id',
    METHODS: '/payments/methods',
    PROCESS: '/payments/process',
    VERIFY: '/payments/verify',
    REFUND: '/payments/:id/refund',
  },

  // Review endpoints
  REVIEW: {
    GET_ALL: '/reviews',
    CREATE: '/reviews',
    SHOW: '/reviews/:id',
    UPDATE: '/reviews/:id',
    DELETE: '/reviews/:id',
    BY_SERVICE: '/reviews/service/:serviceId',
    BY_TECHNICIAN: '/reviews/technician/:technicianId',
  },

  // Upload endpoints
  UPLOAD: {
    IMAGE: '/upload/image',
    AVATAR: '/upload/avatar',
    DOCUMENT: '/upload/document',
  },

  // Settings endpoints
  SETTINGS: {
    GET: '/settings',
    UPDATE: '/settings',
    THEME: '/settings/theme',
    LANGUAGE: '/settings/language',
    NOTIFICATIONS: '/settings/notifications',
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
