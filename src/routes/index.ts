import React from 'react'

// Route definitions and helpers
export interface RouteConfig {
  path: string
  title: string
  component: React.LazyExoticComponent<React.ComponentType<any>>
  exact?: boolean
  protected?: boolean
}

// Route paths
export const ROUTES = {
  HOME: '/',
  BOOKING: '/booking',
  ABOUT: '/about',
  CONTACT: '/contact',
} as const

// Page titles - These will be dynamically updated based on language
export const PAGE_TITLES = {
  [ROUTES.HOME]: 'SENVERSE - Book Appointment',
  [ROUTES.BOOKING]: 'SENVERSE - Book Appointment',
  [ROUTES.ABOUT]: 'SENVERSE - About Us',
  [ROUTES.CONTACT]: 'SENVERSE - Contact',
} as const

// Route configuration
export const routeConfig: RouteConfig[] = [
  {
    path: ROUTES.HOME,
    title: PAGE_TITLES[ROUTES.HOME],
    component: React.lazy(() => import('pages/BookingPage')),
    exact: true,
  },
  {
    path: ROUTES.ABOUT,
    title: PAGE_TITLES[ROUTES.ABOUT],
    component: React.lazy(() => import('pages/AboutPage')),
  },
  {
    path: ROUTES.CONTACT,
    title: PAGE_TITLES[ROUTES.CONTACT],
    component: React.lazy(() => import('pages/ContactPage')),
  },
]

// Helper functions
export const getPageTitle = (path: string): string => {
  return PAGE_TITLES[path as keyof typeof PAGE_TITLES] || 'SENVERSE'
}

export const getRouteByPath = (path: string): RouteConfig | undefined => {
  return routeConfig.find((route) => route.path === path)
}

export const isProtectedRoute = (path: string): boolean => {
  const route = getRouteByPath(path)
  return route?.protected || false
}

export const getRouteConfig = (): RouteConfig[] => {
  return routeConfig
}
