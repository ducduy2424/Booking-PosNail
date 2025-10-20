import React from 'react'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { Card, CardContent } from 'components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'components/ui/dialog'
import { Search, Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react'
import { mockServices, mockServiceCategories } from 'data/mockData'
import type { Service } from 'store/slices/serviceSlice'
import { useTranslation } from 'react-i18next'
import { formatCurrency } from 'lib/utils'
import { useMobile } from 'hooks/useMobile'

// Mobile Service Groups Component
const MobileServiceGroups: React.FC<{
  serviceGroups: { [key: string]: Service[] }
  expandedServiceGroups: { [key: string]: boolean }
  selectedServices: { [key: string]: number }
  onToggleGroup: (groupName: string) => void
  onServiceToggle: (serviceId: string) => void
  onQuantityChange: (serviceId: string, change: number) => void
}> = ({ serviceGroups, expandedServiceGroups, selectedServices, onToggleGroup, onServiceToggle, onQuantityChange }) => {
  return (
    <div className="space-y-4 pb-4">
      {Object.entries(serviceGroups).map(([groupName, groupServices]) => (
        <div key={groupName} className="space-y-2">
          {/* Service Group Header */}
          <Button
            onClick={() => onToggleGroup(groupName)}
            className="w-full justify-between rounded-xl px-4 py-3 bg-blue-600 text-white border-blue-600"
          >
            <div className="flex items-center">
              <span className="mr-2 text-lg">
                {mockServiceCategories.find((cat) => cat.id === groupName)?.icon || '💅'}
              </span>
              {groupName}
            </div>
            {expandedServiceGroups[groupName] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>

          {/* Service Items */}
          {expandedServiceGroups[groupName] && (
            <div className="grid grid-cols-2 gap-3">
              {groupServices.map((service) => {
                const quantity = selectedServices[service.id] || 0
                const isSelected = quantity > 0

                return (
                  <div
                    key={service.id}
                    className={`rounded-lg border p-3 transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                      <div className="flex-1 min-w-0">
                        <h5 className={`text-xs font-normal truncate ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                          {service.name}
                        </h5>
                        <p className={`text-xs font-medium ${isSelected ? 'text-white' : 'text-blue-600'}`}>
                          {formatCurrency(service.price)}
                        </p>
                      </div>

                      <div className="mt-2 md:mt-0 md:ml-2 flex-shrink-0 md:self-auto self-end">
                        {isSelected ? (
                          <div className="flex items-center bg-gray-800/30 rounded-lg px-2 py-1 border border-gray-600">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => onQuantityChange(service.id, -1)}
                              className="w-5 h-5 p-0 rounded-full bg-red-500 hover:bg-red-600 text-white"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="mx-2 text-xs font-bold text-white min-w-[16px] text-center">
                              {quantity}
                            </span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => onQuantityChange(service.id, 1)}
                              className="w-5 h-5 p-0 rounded-full bg-green-500 hover:bg-green-600 text-white"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => onServiceToggle(service.id)}
                            className="w-6 h-6 p-0 rounded-full text-white"
                            style={{ backgroundColor: '#1B365D' }}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// Desktop Grid Component
const DesktopServiceGrid: React.FC<{
  services: Service[]
  selectedServices: { [key: string]: number }
  onServiceToggle: (serviceId: string) => void
  onQuantityChange: (serviceId: string, change: number) => void
}> = ({ services, selectedServices, onServiceToggle, onQuantityChange }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 pb-4">
      {services.map((service) => {
        const quantity = selectedServices[service.id] || 0
        const isSelected = quantity > 0

        return (
          <div
            key={service.id}
            className={`rounded-xl border-2 p-4 transition-all ${
              isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h4 className={`font-medium mb-1 text-sm ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                  {service.name}
                </h4>
                <p className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-blue-600'}`}>
                  {formatCurrency(service.price)}
                </p>
              </div>

              <div className="ml-3 flex-shrink-0">
                {isSelected ? (
                  <div className="flex items-center bg-gray-800/30 rounded-lg px-3 py-2 border border-gray-600">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onQuantityChange(service.id, -1)}
                      className="w-6 h-6 p-0 rounded-full bg-red-500 hover:bg-red-600 text-white"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="mx-3 text-sm font-bold text-white min-w-[20px] text-center">{quantity}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onQuantityChange(service.id, 1)}
                      className="w-6 h-6 p-0 rounded-full bg-green-500 hover:bg-green-600 text-white"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => onServiceToggle(service.id)}
                    className="w-8 h-8 p-0 rounded-full text-white"
                    style={{ backgroundColor: '#1B365D' }}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

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
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState(mockServiceCategories[0]?.id || '')
  const [selectedServices, setSelectedServices] = React.useState<{ [key: string]: number }>({})
  const [expandedServiceGroups, setExpandedServiceGroups] = React.useState<{ [key: string]: boolean }>({})
  const isMobile = useMobile()

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden" autoFocus={false}>
        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-2xl font-bold text-gray-900 text-center">Select services</h2>
        </div>

        {/* Search Bar - Separate row */}
        <div className="px-6 py-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 rounded-xl border-gray-300 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-col h-[60vh]">
          {/* List Services Header */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">List services</h3>
              <span className="text-sm text-gray-600">(Selected: {selectedCount})</span>
            </div>
          </div>

          {/* Services List */}
          <div className="flex-1 px-6 overflow-y-auto pb-20">
            {isMobile ? (
              <MobileServiceGroups
                serviceGroups={serviceGroups}
                expandedServiceGroups={expandedServiceGroups}
                selectedServices={selectedServices}
                onToggleGroup={toggleServiceGroup}
                onServiceToggle={handleServiceToggle}
                onQuantityChange={handleQuantityChange}
              />
            ) : (
              <DesktopServiceGrid
                services={filteredServices}
                selectedServices={selectedServices}
                onServiceToggle={handleServiceToggle}
                onQuantityChange={handleQuantityChange}
              />
            )}
          </div>

          {/* Action Buttons */}
          <div className="px-6 py-4 border-t bg-gray-50">
            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 h-12 rounded-xl border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Close
              </Button>
              <Button onClick={handleSave} className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white">
                Save
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ServiceSelectionModal
