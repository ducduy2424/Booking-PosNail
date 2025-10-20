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

// Add more types as needed
