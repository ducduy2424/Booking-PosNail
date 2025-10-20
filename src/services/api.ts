// API Service Configuration
// You can use fetch or install axios: npm install axios

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001'

interface ApiResponse<T> {
  data: T
  error?: string
}

class ApiService {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`)
      const data = await response.json()
      return { data }
    } catch (error) {
      return { data: null as any, error: (error as Error).message }
    }
  }

  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      const data = await response.json()
      return { data }
    } catch (error) {
      return { data: null as any, error: (error as Error).message }
    }
  }

  async put<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      const data = await response.json()
      return { data }
    } catch (error) {
      return { data: null as any, error: (error as Error).message }
    }
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      return { data }
    } catch (error) {
      return { data: null as any, error: (error as Error).message }
    }
  }
}

export const apiService = new ApiService(API_BASE_URL)
