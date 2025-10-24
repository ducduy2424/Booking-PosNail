// Helper functions

export const formatDate = (date: Date | string): string => {
  const d = new Date(date)
  return d.toLocaleDateString('vi-VN')
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// URL parameter helpers
export const getStoreIdFromUrl = (): string => {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('store_id') || '1' // Default to '1' if not found
}

// Add more helper functions as needed
