import { useState, useEffect } from 'react'

/**
 * Custom hook to detect mobile screen size
 * @param breakpoint - Breakpoint in pixels (default: 768px for md breakpoint)
 * @returns boolean indicating if screen is mobile size
 */
export const useMobile = (breakpoint: number = 768): boolean => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // Check initial screen size
    checkScreenSize()

    // Add event listener for resize events
    window.addEventListener('resize', checkScreenSize)

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [breakpoint])

  return isMobile
}

export default useMobile
