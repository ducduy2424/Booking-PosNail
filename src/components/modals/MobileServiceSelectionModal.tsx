import React from 'react'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from 'components/ui/dialog'
import { Search, Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react'
import type { Service, ServiceCategory } from 'store/slices/serviceSlice'
import { formatCurrency } from 'lib/utils'
import { useTranslation } from 'react-i18next'

interface MobileServiceSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  services: Service[]
  categories: ServiceCategory[]
  searchTerm: string
  setSearchTerm: (value: string) => void
  selectedServices: { [key: string]: number }
  expandedServiceGroups: { [key: string]: boolean }
  serviceGroups: { [key: string]: Service[] }
  selectedCount: number
  servicesLoading: boolean
  categoryLoadingStates: { [key: string]: boolean }
  handleServiceToggle: (serviceId: string) => void
  handleQuantityChange: (serviceId: string, change: number) => void
  toggleServiceGroup: (groupName: string) => void
  handleSave: () => void
}

export const MobileServiceSelectionModal: React.FC<MobileServiceSelectionModalProps> = ({
  isOpen,
  onClose,
  categories,
  searchTerm,
  setSearchTerm,
  selectedServices,
  expandedServiceGroups,
  serviceGroups,
  servicesLoading,
  categoryLoadingStates,
  handleServiceToggle,
  handleQuantityChange,
  toggleServiceGroup,
  handleSave,
}) => {
  const { t } = useTranslation()
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden" autoFocus={false}>
        <DialogTitle className="sr-only">{t('services.selectServices')}</DialogTitle>
        <DialogDescription className="sr-only">{t('services.description')}</DialogDescription>
        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-2xl font-bold text-gray-900 text-center">{t('services.selectServices')}</h2>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder={t('placeholder.search')}
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
              <h3 className="text-lg font-semibold text-gray-900">{t('services.selectServices')}</h3>
              <span className="text-sm text-gray-600">
                (Selected: {Object.values(selectedServices).reduce((sum, qty) => sum + qty, 0)})
              </span>
            </div>
          </div>

          {/* Services List */}
          <div className="flex-1 px-6 overflow-y-auto pb-20">
            {servicesLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">{t('services.loadingServices')}</span>
              </div>
            ) : Object.keys(serviceGroups).length > 0 ? (
              <div className="space-y-4 pb-4">
                {Object.entries(serviceGroups).map(([groupName, groupServices]) => (
                  <div key={groupName} className="space-y-2">
                    {/* Service Group Header */}
                    <Button
                      onClick={() => toggleServiceGroup(groupName)}
                      className="w-full justify-between rounded-xl px-4 py-3 bg-blue-600 text-white border-blue-600"
                    >
                      <div className="flex items-center">
                        {categories.find((cat) => cat.id === groupName)?.lv_1_service || groupName}
                      </div>
                      {expandedServiceGroups[groupName] ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </Button>

                    {/* Service Items */}
                    {expandedServiceGroups[groupName] && (
                      <div className="grid grid-cols-2 gap-3">
                        {categoryLoadingStates[groupName] ? (
                          <div className="col-span-2 flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                            <span className="ml-3 text-sm text-gray-600">{t('services.loadingServices')}</span>
                          </div>
                        ) : groupServices.length > 0 ? (
                          groupServices.map((service) => {
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
                                    <h5
                                      className={`text-xs font-normal truncate ${isSelected ? 'text-white' : 'text-gray-900'}`}
                                    >
                                      {service.lv_2_service}
                                    </h5>
                                    <p className={`text-xs font-medium ${isSelected ? 'text-white' : 'text-blue-600'}`}>
                                      {formatCurrency(service.amount)}
                                    </p>
                                  </div>

                                  <div className="mt-2 md:mt-0 md:ml-2 flex-shrink-0 md:self-auto self-end">
                                    {isSelected ? (
                                      <div className="flex items-center bg-gray-800/30 rounded-lg px-2 py-1 border border-gray-600">
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          onClick={() => handleQuantityChange(service.id, -1)}
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
                                          onClick={() => handleQuantityChange(service.id, 1)}
                                          className="w-5 h-5 p-0 rounded-full bg-green-500 hover:bg-green-600 text-white"
                                        >
                                          <Plus className="w-3 h-3" />
                                        </Button>
                                      </div>
                                    ) : (
                                      <Button
                                        size="sm"
                                        onClick={() => handleServiceToggle(service.id)}
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
                          })
                        ) : (
                          <div className="col-span-2 flex items-center justify-center py-8">
                            <span className="text-sm text-gray-500">{t('services.noServicesFound')}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t('services.noServicesFound')}</h3>
                <p className="text-sm text-gray-500 max-w-md">{t('services.noServicesDescription')}</p>
              </div>
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
                {t('common.close')}
              </Button>
              <Button onClick={handleSave} className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white">
                {t('common.save')}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MobileServiceSelectionModal
