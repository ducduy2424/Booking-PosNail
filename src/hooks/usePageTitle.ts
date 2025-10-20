import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getPageTitle } from '../routes'

// Custom hook to manage page title
export const usePageTitle = (customTitle?: string) => {
  const location = useLocation()

  useEffect(() => {
    const title = customTitle || getPageTitle(location.pathname)
    document.title = title

    // Update meta description if needed
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', `${title} - Professional nail salon booking service`)
    }
  }, [location.pathname, customTitle])
}

// Helper function to update page title manually
export const updatePageTitle = (title: string) => {
  document.title = title
}

// Helper function to get current page title
export const getCurrentPageTitle = (): string => {
  return document.title
}

// Helper function to set page title with suffix
export const setPageTitle = (title: string, suffix: string = 'SENVERSE') => {
  document.title = `${title} - ${suffix}`
}
