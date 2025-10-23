import React from 'react'
import { useMobile } from 'hooks/useMobile'
import MobileServiceSelectionModal from './MobileServiceSelectionModal'
import DesktopServiceSelectionModal from './DesktopServiceSelectionModal'
import type { Service } from 'store/slices/serviceSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  selectServiceCategories,
  selectServices,
  selectCategoriesLoading,
  selectServicesLoading,
  selectServiceError,
  fetchServiceCategories,
  fetchServicesByCategory,
} from 'store/slices/serviceSlice'

interface ServiceSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (selectedServices: Service[]) => void
}

export const ServiceSelectionModal: React.FC<ServiceSelectionModalProps> = ({ isOpen, onClose, onSave }) => {
  const dispatch = useAppDispatch()
  const isMobile = useMobile()

  // Redux state
  const categories = useAppSelector(selectServiceCategories)
  const services = useAppSelector(selectServices)
  const categoriesLoading = useAppSelector(selectCategoriesLoading)
  const servicesLoading = useAppSelector(selectServicesLoading)
  const error = useAppSelector(selectServiceError)

  // Shared state - preserved when switching between mobile/desktop
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState('')
  const [selectedServices, setSelectedServices] = React.useState<{ [key: string]: number }>({})
  const [expandedServiceGroups, setExpandedServiceGroups] = React.useState<{ [key: string]: boolean }>({})
  const [allServicesByCategory, setAllServicesByCategory] = React.useState<{ [key: string]: Service[] }>({})
  const [categoryLoadingStates, setCategoryLoadingStates] = React.useState<{ [key: string]: boolean }>({})

  // Fetch categories on mount
  React.useEffect(() => {
    if (isOpen && categories.length === 0) {
      dispatch(fetchServiceCategories())
    }
  }, [isOpen, categories.length, dispatch])

  // Set first category as selected when categories are loaded
  React.useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].id)
    }
  }, [categories, selectedCategory])

  // Fetch services when category is selected
  React.useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchServicesByCategory({ lv1ServiceId: selectedCategory, search: searchTerm }))
    }
  }, [selectedCategory, searchTerm, dispatch])

  // Store services in local state when fetched
  React.useEffect(() => {
    if (services.length > 0 && selectedCategory) {
      setAllServicesByCategory((prev) => ({
        ...prev,
        [selectedCategory]: services,
      }))
    }
  }, [services, selectedCategory])

  // Update services with category information
  const servicesWithCategory = React.useMemo(() => {
    if (isMobile) {
      // For mobile: combine all services from all categories
      const allServices = Object.values(allServicesByCategory).flat()
      return allServices.map((service) => ({
        ...service,
        category: Object.keys(allServicesByCategory).find(categoryId => 
          allServicesByCategory[categoryId].some(s => s.id === service.id)
        ) || 'Other',
      }))
    } else {
      // For desktop: use services from Redux
      return services.map((service) => ({
        ...service,
        category: selectedCategory,
      }))
    }
  }, [services, selectedCategory, isMobile, allServicesByCategory])

  const filteredServices = servicesWithCategory.filter((service) => {
    const matchesSearch = service.lv_2_service.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  // Group services by category
  const serviceGroups = React.useMemo(() => {
    if (isMobile) {
      // For mobile: show ALL categories, not just ones with loaded services
      const groups: { [key: string]: Service[] } = {}
      categories.forEach((category) => {
        const categoryServices = allServicesByCategory[category.id] || []
        const filteredCategoryServices = categoryServices.filter((service) => {
          const matchesSearch = service.lv_2_service.toLowerCase().includes(searchTerm.toLowerCase())
          return matchesSearch
        })
        groups[category.id] = filteredCategoryServices
      })
      return groups
    } else {
      // For desktop: use existing logic
      return filteredServices.reduce(
        (groups, service) => {
          const category = service.category || 'Other'
          if (!groups[category]) {
            groups[category] = []
          }
          groups[category].push(service)
          return groups
        },
        {} as { [key: string]: typeof servicesWithCategory }
      )
    }
  }, [isMobile, categories, allServicesByCategory, filteredServices, searchTerm])

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) => ({
      ...prev,
      [serviceId]: prev[serviceId] ? 0 : 1,
    }))
  }

  const handleQuantityChange = (serviceId: string, change: number) => {
    setSelectedServices((prev) => ({
      ...prev,
      [serviceId]: Math.max(0, (prev[serviceId] || 0) + change),
    }))
  }

  const toggleServiceGroup = (groupName: string) => {
    setExpandedServiceGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }))
    
    // For mobile: fetch services when expanding if not already loaded
    if (isMobile && !expandedServiceGroups[groupName] && !allServicesByCategory[groupName]) {
      fetchServicesForCategory(groupName)
    }
  }

  const fetchServicesForCategory = async (categoryId: string) => {
    try {
      setCategoryLoadingStates((prev) => ({ ...prev, [categoryId]: true }))
      const response = await dispatch(fetchServicesByCategory({ lv1ServiceId: categoryId, search: searchTerm }))
      if (response.payload) {
        setAllServicesByCategory((prev) => ({
          ...prev,
          [categoryId]: response.payload as Service[],
        }))
      }
    } catch (error) {
      console.error('Failed to fetch services for category:', categoryId, error)
    } finally {
      setCategoryLoadingStates((prev) => ({ ...prev, [categoryId]: false }))
    }
  }

  const handleSave = () => {
    const servicesToSave = Object.entries(selectedServices)
      .filter(([_, quantity]) => quantity > 0)
      .map(([serviceId, quantity]) => {
        const service = servicesWithCategory.find((s) => s.id === serviceId)
        return service ? { ...service, quantity } : null
      })
      .filter(Boolean) as Service[]

    onSave(servicesToSave)
    onClose()
  }

  const selectedCount = Object.values(selectedServices).reduce((sum, qty) => sum + qty, 0)

  // Show loading state
  if (categoriesLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading categories...</p>
          </div>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md mx-4">
          <div className="text-center">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Services</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Common props for both mobile and desktop
  const commonProps = {
    isOpen,
    onClose,
    services: servicesWithCategory,
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedServices,
    expandedServiceGroups,
    filteredServices,
    serviceGroups,
    selectedCount,
    servicesLoading,
    categoryLoadingStates,
    handleServiceToggle,
    handleQuantityChange,
    toggleServiceGroup,
    handleSave,
  }

  if (isMobile) {
    return <MobileServiceSelectionModal {...commonProps} />
  }

  return <DesktopServiceSelectionModal {...commonProps} />
}

export default ServiceSelectionModal
