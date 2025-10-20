import React from 'react'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { Card, CardContent } from 'components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'components/ui/dialog'
import { Search, Plus, Minus } from 'lucide-react'
import { mockServices, mockServiceCategories, formatPrice } from 'data/mockData'
import type { Service } from 'store/slices/serviceSlice'

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
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState(mockServiceCategories[0]?.id || '')
  const [selectedServices, setSelectedServices] = React.useState<{ [key: string]: number }>({})

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Select services</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Selection */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {mockServiceCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className="whitespace-nowrap"
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>

          {/* Services List */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">List services</h3>
              <span className="text-sm text-gray-600">Selected: {selectedCount}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredServices.map((service) => {
                const quantity = selectedServices[service.id] || 0
                const isSelected = quantity > 0

                return (
                  <Card
                    key={service.id}
                    className={`transition-colors ${isSelected ? 'bg-blue-50 border-blue-200' : ''}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{service.name}</h4>
                          <p className="text-xs text-gray-500 mb-1">{service.description}</p>
                          <p className="text-lg font-bold text-blue-600">{formatPrice(service.price)}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                          {isSelected ? (
                            <div className="flex items-center space-x-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleQuantityChange(service.id, -1)}
                                className="w-6 h-6 p-0"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-6 text-center text-sm">{quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleQuantityChange(service.id, 1)}
                                className="w-6 h-6 p-0"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => handleServiceToggle(service.id)}
                              className="w-6 h-6 p-0 bg-green-500 hover:bg-green-600"
                            >
                              <Plus className="w-3 h-3 text-white" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700">
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ServiceSelectionModal
