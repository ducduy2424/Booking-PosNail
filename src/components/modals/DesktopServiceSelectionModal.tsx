import React from 'react'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from 'components/ui/dialog'
import { Search, Plus, Minus } from 'lucide-react'
import { mockServiceCategories } from 'data/mockData'
import type { Service } from 'store/slices/serviceSlice'
import { formatCurrency } from 'lib/utils'

interface DesktopServiceSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  services: Service[]
  searchTerm: string
  setSearchTerm: (value: string) => void
  selectedCategory: string
  setSelectedCategory: (value: string) => void
  selectedServices: { [key: string]: number }
  filteredServices: Service[]
  selectedCount: number
  handleServiceToggle: (serviceId: string) => void
  handleQuantityChange: (serviceId: string, change: number) => void
  handleSave: () => void
}

export const DesktopServiceSelectionModal: React.FC<DesktopServiceSelectionModalProps> = ({
  isOpen,
  onClose,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedServices,
  filteredServices,
  handleServiceToggle,
  handleQuantityChange,
  handleSave,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-4xl max-h-[90vh] sm:max-h-[80vh] mx-4 sm:mx-auto" autoFocus={false}>
        <DialogTitle className="sr-only">Select services</DialogTitle>
        <DialogDescription className="sr-only">
          Choose services for your appointment. You can search, filter by category, and select multiple services with
          quantities.
        </DialogDescription>
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 text-center sm:text-left">Select services</h2>
            <div className="relative w-full sm:w-auto sm:min-w-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <Input
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 sm:h-10 rounded-lg border-gray-300 focus:border-blue-500 w-full sm:w-64 sm:min-w-0"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col h-[60vh] sm:h-[50vh] overflow-x-auto">
          {/* Category Selection - Level 1 */}
          <div className="px-4 sm:px-6 py-4 border-b">
            <div
              className="flex gap-3 overflow-x-auto pb-2"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#d1d5db transparent',
                minHeight: '60px',
                alignItems: 'center',
                maxWidth: '100%',
              }}
            >
              {mockServiceCategories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex-shrink-0 px-4 py-3 rounded-xl transition-all ${
                    selectedCategory === category.id
                      ? 'bg-[#1B365D] text-white border-[#1B365D]'
                      : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-2 text-lg">{category.icon}</span>
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div className="flex-1 px-4 sm:px-6 overflow-y-auto pb-20 sm:pb-24">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 pb-4">
              {filteredServices
                .filter((service) => !selectedCategory || service.category === selectedCategory)
                .map((service) => {
                  const quantity = selectedServices[service.id] || 0
                  const isSelected = quantity > 0

                  return (
                    <div
                      key={service.id}
                      className={`rounded-xl border-2 p-4 transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-gray-200 bg-white hover:border-gray-300'
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
                                onClick={() => handleQuantityChange(service.id, -1)}
                                className="w-6 h-6 p-0 rounded-full bg-red-500 hover:bg-red-600 text-white"
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="mx-3 text-sm font-bold text-white min-w-[20px] text-center">
                                {quantity}
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleQuantityChange(service.id, 1)}
                                className="w-6 h-6 p-0 rounded-full bg-green-500 hover:bg-green-600 text-white"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => handleServiceToggle(service.id)}
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
          </div>

          {/* Action Buttons */}
          <div className="px-4 sm:px-6 py-4 border-t bg-white">
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full sm:w-auto px-6 sm:px-8 h-10 sm:h-10 rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Close
              </Button>
              <Button
                onClick={handleSave}
                className="w-full sm:w-auto px-6 sm:px-8 h-10 sm:h-10 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DesktopServiceSelectionModal
