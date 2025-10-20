import React from 'react'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { Card, CardContent } from 'components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'components/ui/dialog'
import { Search, Check, Star } from 'lucide-react'
import { mockTechnicians } from 'data/mockData'
import type { Technician } from 'store/slices/technicianSlice'
import { useMobile } from 'hooks/useMobile'

interface TechnicianSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (technician: Technician) => void
  technicians?: Technician[]
}

export const TechnicianSelectionModal: React.FC<TechnicianSelectionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  technicians = mockTechnicians,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedTechnician, setSelectedTechnician] = React.useState<Technician | null>(null)
  const isMobile = useMobile()

  const filteredTechnicians = technicians.filter((technician) =>
    technician.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleTechnicianSelect = (technician: Technician) => {
    setSelectedTechnician(technician)
  }

  const handleSave = () => {
    if (selectedTechnician) {
      onSave(selectedTechnician)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden" autoFocus={false}>
        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-2xl font-bold text-gray-900 text-center">Please select technician</h2>
        </div>

        {/* Search Bar - Separate row on mobile, same row on desktop */}
        {isMobile ? (
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
        ) : (
          <div className="px-6 py-4 border-b">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-gray-900">Please select technician</h3>
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 rounded-xl border-gray-300 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col h-[50vh]">
          {/* Technicians Grid */}
          <div className="flex-1 px-6 overflow-y-auto pb-24">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pb-4">
              {filteredTechnicians.map((technician) => {
                const isSelected = selectedTechnician?.id === technician.id

                return (
                  <Card
                    key={technician.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => handleTechnicianSelect(technician)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="relative mb-3">
                        <img
                          src={technician.avatar}
                          alt={technician.name}
                          className="w-16 h-16 mx-auto rounded-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                            const fallback = target.nextElementSibling as HTMLElement
                            if (fallback) fallback.style.display = 'flex'
                          }}
                        />
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-pink-200 to-purple-200 rounded-full items-center justify-center hidden">
                          <span className="text-lg font-semibold text-gray-700">{technician.name.charAt(0)}</span>
                        </div>
                        {isSelected && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <h3 className="font-medium text-sm">{technician.name}</h3>
                      <div className="flex items-center justify-center space-x-1 mt-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600">{technician.rating}</span>
                        <span className="text-xs text-gray-400">({technician.totalReviews})</span>
                      </div>
                      <div className="mt-2">
                        <div className="text-xs text-gray-500">
                          {technician.specialties.slice(0, 2).join(', ')}
                          {technician.specialties.length > 2 && '...'}
                        </div>
                        <div className="text-xs text-blue-600 mt-1">{technician.experience} năm kinh nghiệm</div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
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
              <Button
                onClick={handleSave}
                className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
                disabled={!selectedTechnician}
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

export default TechnicianSelectionModal
