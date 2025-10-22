import React from 'react'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { Dialog, DialogContent } from 'components/ui/dialog'
import { Search, Check } from 'lucide-react'
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
      <DialogContent
        className="w-full max-w-4xl max-h-[90vh] sm:max-h-[80vh] overflow-hidden mx-4 sm:mx-auto"
        autoFocus={false}
      >
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 text-center sm:text-left">
              Please select technician
            </h2>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <Input
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 sm:h-10 rounded-lg border-gray-300 focus:border-blue-500 w-full sm:w-64"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col h-[60vh] sm:h-[50vh]">
          {/* Technicians Grid */}
          <div className="flex-1 px-4 sm:px-6 overflow-y-auto pb-20 sm:pb-24">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4 pb-4">
              {filteredTechnicians.map((technician) => {
                const isSelected = selectedTechnician?.id === technician.id

                return (
                  <div
                    key={technician.id}
                    className={`cursor-pointer transition-all hover:shadow-md rounded-lg p-2 sm:p-3 text-center ${
                      isSelected ? 'bg-gray-100' : ''
                    }`}
                    onClick={() => handleTechnicianSelect(technician)}
                  >
                    <div className="relative mb-1 sm:mb-2">
                      <img
                        src={technician.avatar}
                        alt={technician.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const fallback = target.nextElementSibling as HTMLElement
                          if (fallback) fallback.style.display = 'flex'
                        }}
                      />
                      <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-gradient-to-br from-pink-200 to-purple-200 rounded-full items-center justify-center hidden">
                        <span className="text-sm sm:text-lg font-semibold text-gray-700">
                          {technician.name.charAt(0)}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <h3 className="font-medium text-xs sm:text-sm text-gray-900">{technician.name}</h3>
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
