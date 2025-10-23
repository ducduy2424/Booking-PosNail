// Global type definitions

export interface User {
  id: string
  name: string
  email: string
}

export interface Booking {
  id: string
  userId: string
  date: string
  status: 'pending' | 'confirmed' | 'cancelled'
}

// API Response Types
export interface ApiResponse<T> {
  message: string
  data: T[]
}

// Service Level 1 (Categories) API Types
export interface ServiceLv1ApiResponse {
  id: string
  lv_1_service: string
  created_at: string
}

// Service Level 2 (Services) API Types
export interface ServiceLv2ApiResponse {
  id: string
  lv_2_service: string
  amount: number
  created_at: string
}
