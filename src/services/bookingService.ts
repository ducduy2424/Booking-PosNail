import { apiService } from './api'
import { API_ENDPOINTS } from '../config/endpoints'

// API Request Types for Booking Ticket
export interface ServiceBooking {
  service_id: string
  quantity: number
}

export interface StaffService {
  staff_id: string
  services: ServiceBooking[]
}

export interface CreateTicketRequest {
  store_id: number
  first_name: string
  last_name: string
  area_code_phone: string
  phone_number: string
  email?: string
  appointment_at: string
  staff_services: StaffService[]
}

export interface CreateTicketResponse {
  message: string
}

export const bookingService = {
  // Create booking ticket
  createTicket: async (ticketData: CreateTicketRequest): Promise<CreateTicketResponse> => {
    // debug
    console.log('createTicket request:', ticketData)
    const response = await apiService.post<CreateTicketResponse>(API_ENDPOINTS.WEBBOOKING.CREATE_TICKET, ticketData)
    // debug
    console.log('createTicket response:', response.data)
    return response.data
  },
}
