import React from 'react'
import { useMobile } from 'hooks/useMobile'
import MobileServiceSelectionModal from './MobileServiceSelectionModal'
import DesktopServiceSelectionModal from './DesktopServiceSelectionModal'
import type { Service } from 'store/slices/serviceSlice'
import { mockServices, mockServiceCategories } from 'data/mockData'

interface ServiceSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (selectedServices: Service[]) => void
  services?: Service[]
}

export const ServiceSelectionModal: React.FC<ServiceSelectionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  services = mockServices,
}) => {
  const isMobile = useMobile()

  // Shared state - preserved when switching between mobile/desktop
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState(mockServiceCategories[0]?.id || '')
  const [selectedServices, setSelectedServices] = React.useState<{ [key: string]: number }>({})
  const [expandedServiceGroups, setExpandedServiceGroups] = React.useState<{ [key: string]: boolean }>({})

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  // Group services by category
  const serviceGroups = filteredServices.reduce(
    (groups, service) => {
      const category = service.category || 'Other'
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(service)
      return groups
    },
    {} as { [key: string]: typeof services }
  )

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
  }

  const handleSave = () => {
    const servicesToSave = Object.entries(selectedServices)
      .filter(([_, quantity]) => quantity > 0)
      .map(([serviceId, quantity]) => {
        const service = services.find((s) => s.id === serviceId)
        return service ? { ...service, quantity } : null
      })
      .filter(Boolean) as Service[]

    onSave(servicesToSave)
    onClose()
  }

  const selectedCount = Object.values(selectedServices).reduce((sum, qty) => sum + qty, 0)

  // Common props for both mobile and desktop
  const commonProps = {
    isOpen,
    onClose,
    services,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedServices,
    expandedServiceGroups,
    filteredServices,
    serviceGroups,
    selectedCount,
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
