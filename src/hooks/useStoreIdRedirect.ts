import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useStoreIdRedirect = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const storeId = urlParams.get('store_id')

    // If no store_id parameter, redirect to add store_id=1
    if (!storeId) {
      const currentPath = window.location.pathname
      const newUrl = `${currentPath}?store_id=1`
      navigate(newUrl, { replace: true })
    }
  }, [navigate])
}
