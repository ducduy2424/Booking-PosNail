import React from 'react'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { Card, CardContent } from 'components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'components/ui/dialog'
import { Search, Check, Star } from 'lucide-react'
import { mockTechnicians } from 'data/mockData'
import type { Technician } from 'store/slices/technicianSlice'

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
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Please select technician</DialogTitle>
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

          {/* Technicians Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center hidden">
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

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={!selectedTechnician}
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TechnicianSelectionModal
