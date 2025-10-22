// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL,
  STORE_ID: process.env.REACT_APP_STORE_ID || '1',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const

// Environment Configuration
export const ENV_CONFIG = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
} as const

// App Configuration
export const APP_CONFIG = {
  NAME: 'SENVERSE',
  VERSION: '1.0.0',
  DESCRIPTION: 'Professional nail salon booking service',
} as const
