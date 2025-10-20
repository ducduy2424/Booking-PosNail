import React from 'react'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { Card, CardContent } from 'components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'components/ui/dialog'
import { Search, Check } from 'lucide-react'

interface Technician {
  id: string
  name: string
  avatar: string
  specialties?: string[]
  rating?: number
}

interface TechnicianSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (technician: Technician) => void
  technicians?: Technician[]
}

const defaultTechnicians: Technician[] = [
  { id: '1', name: 'Emma', avatar: '/api/placeholder/100/100', specialties: ['Manicure', 'Pedicure'], rating: 4.8 },
  { id: '2', name: 'Olivia', avatar: '/api/placeholder/100/100', specialties: ['Nail Art', 'Gel Polish'], rating: 4.9 },
  { id: '3', name: 'Ava', avatar: '/api/placeholder/100/100', specialties: ['French Manicure'], rating: 4.7 },
  { id: '4', name: 'Sophia', avatar: '/api/placeholder/100/100', specialties: ['Nail Extensions'], rating: 4.9 },
  { id: '5', name: 'Isabella', avatar: '/api/placeholder/100/100', specialties: ['Manicure', 'Nail Art'], rating: 4.8 },
  { id: '6', name: 'Mia', avatar: '/api/placeholder/100/100', specialties: ['Pedicure'], rating: 4.6 },
  { id: '7', name: 'Amelia', avatar: '/api/placeholder/100/100', specialties: ['Gel Polish', 'Nail Art'], rating: 4.8 },
  { id: '8', name: 'Harper', avatar: '/api/placeholder/100/100', specialties: ['Manicure'], rating: 4.7 },
  {
    id: '9',
    name: 'Evelyn',
    avatar: '/api/placeholder/100/100',
    specialties: ['Nail Extensions', 'Nail Art'],
    rating: 4.9,
  },
  {
    id: '10',
    name: 'Abigail',
    avatar: '/api/placeholder/100/100',
    specialties: ['French Manicure', 'Pedicure'],
    rating: 4.8,
  },
  { id: '11', name: 'Emily', avatar: '/api/placeholder/100/100', specialties: ['Manicure', 'Gel Polish'], rating: 4.7 },
  { id: '12', name: 'Elizabeth', avatar: '/api/placeholder/100/100', specialties: ['Nail Art'], rating: 4.8 },
  {
    id: '13',
    name: 'Grace',
    avatar: '/api/placeholder/100/100',
    specialties: ['Pedicure', 'Nail Extensions'],
    rating: 4.6,
  },
  { id: '14', name: 'Lily', avatar: '/api/placeholder/100/100', specialties: ['Manicure', 'Nail Art'], rating: 4.9 },
  { id: '15', name: 'Chloe', avatar: '/api/placeholder/100/100', specialties: ['Gel Polish'], rating: 4.8 },
  { id: '16', name: 'Camila', avatar: '/api/placeholder/100/100', specialties: ['French Manicure'], rating: 4.7 },
  { id: '17', name: 'Victoria', avatar: '/api/placeholder/100/100', specialties: ['Nail Extensions'], rating: 4.8 },
  {
    id: '18',
    name: 'Genevieve',
    avatar: '/api/placeholder/100/100',
    specialties: ['Manicure', 'Pedicure'],
    rating: 4.9,
  },
]

export const TechnicianSelectionModal: React.FC<TechnicianSelectionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  technicians = defaultTechnicians,
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
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center">
                        <span className="text-lg font-semibold text-gray-700">{technician.name.charAt(0)}</span>
                      </div>
                      {isSelected && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <h3 className="font-medium text-sm">{technician.name}</h3>
                    {technician.rating && <p className="text-xs text-gray-500">⭐ {technician.rating}</p>}
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
