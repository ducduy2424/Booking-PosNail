import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { Label } from 'components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card'
import { Calendar, Clock, User, Plus, Minus } from 'lucide-react'
import { DateTimePicker } from 'components/ui/datetime-picker'
import type { Service } from 'store/slices/serviceSlice'
import type { Technician } from 'store/slices/technicianSlice'

interface AppointmentSlot {
  id: string
  service: string
  technician: string
}

interface BookingFormProps {
  onServiceSelect?: () => void
  onTechnicianSelect?: () => void
  onSubmit?: (data: any) => void
  className?: string
  selectedServices?: Service[]
  hasServicesSelected?: boolean
  selectedTechnician?: Technician | null
}

export const BookingForm: React.FC<BookingFormProps> = ({
  onServiceSelect,
  onTechnicianSelect,
  onSubmit,
  className = '',
  selectedServices = [],
  hasServicesSelected = false,
  selectedTechnician = null,
}) => {
  const { t } = useTranslation()
  const [formData, setFormData] = React.useState({
    fullName: '',
    lastName: '',
    phone: '',
    email: '',
  })

  const [appointmentTime, setAppointmentTime] = React.useState<Date | undefined>(undefined)

  const [appointmentSlots, setAppointmentSlots] = React.useState<AppointmentSlot[]>([
    {
      id: '1',
      service: '',
      technician: '',
    },
  ])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSlotChange = (slotId: string, field: string, value: string | Date) => {
    setAppointmentSlots((prev) => prev.map((slot) => (slot.id === slotId ? { ...slot, [field]: value } : slot)))
  }

  const addSlot = () => {
    const newSlot: AppointmentSlot = {
      id: Date.now().toString(),
      service: '',
      technician: '',
    }
    setAppointmentSlots((prev) => [...prev, newSlot])
  }

  const removeSlot = (slotId: string) => {
    if (appointmentSlots.length > 1) {
      setAppointmentSlots((prev) => prev.filter((slot) => slot.id !== slotId))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.({
      ...formData,
      appointmentTime,
      appointmentSlots,
    })
  }

  return (
    <div className={`w-full max-w-4xl mx-auto px-6 ${className}`}>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">{t('booking.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium">
                    {t('booking.firstName')} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder={t('booking.firstName')}
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    {t('booking.lastName')} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder={t('booking.lastName')}
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    {t('booking.phone_field')} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={t('booking.phone_field')}
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    {t('booking.email')}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('booking.email')}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Appointment Time Section */}
            <div className="rounded-lg p-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  {t('booking.appointmentTime')} <span className="text-red-500">*</span>
                </Label>
                <DateTimePicker
                  value={appointmentTime}
                  onChange={(date: Date | undefined) => setAppointmentTime(date)}
                  placeholder={t('booking.appointmentTime')}
                />
              </div>
            </div>

            {/* Services & Technicians Section */}
            <div className="space-y-4">
              {appointmentSlots.map((slot, index) => (
                <div
                  key={slot.id}
                  className="border rounded-lg py-4 px-0 bg-gray-50 flex justify-center "
                  style={{ width: '96%' }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        {t('booking.service')} <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          placeholder={
                            selectedServices.length > 0
                              ? `${selectedServices.length} service(s) selected`
                              : t('booking.selectService')
                          }
                          value={selectedServices.map((s) => s.name).join(', ')}
                          readOnly
                          onClick={onServiceSelect}
                          className="bg-white cursor-pointer"
                        />
                        <svg
                          className="absolute right-3 top-3 w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        {t('booking.selectTechnician')} <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        {selectedTechnician ? (
                          // Show selected technician with avatar and name
                          <div
                            onClick={hasServicesSelected ? onTechnicianSelect : undefined}
                            className={`flex items-center gap-3 p-3 border rounded-lg bg-white ${
                              hasServicesSelected ? 'cursor-pointer hover:bg-gray-50' : 'cursor-not-allowed opacity-50'
                            }`}
                          >
                            <img
                              src={selectedTechnician.avatar}
                              alt={selectedTechnician.name}
                              className="w-8 h-8 rounded-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.style.display = 'none'
                                const fallback = target.nextElementSibling as HTMLElement
                                if (fallback) fallback.style.display = 'flex'
                              }}
                            />
                            <div className="w-8 h-8 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full items-center justify-center hidden">
                              <span className="text-sm font-semibold text-gray-700">
                                {selectedTechnician.name.charAt(0)}
                              </span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{selectedTechnician.name}</p>
                              <p className="text-xs text-gray-500">Selected technician</p>
                            </div>
                            <User className="w-4 h-4 text-gray-400" />
                          </div>
                        ) : (
                          // Show placeholder input
                          <Input
                            placeholder={
                              hasServicesSelected ? t('booking.selectTechnician') : 'Please select services first'
                            }
                            value=""
                            readOnly
                            onClick={hasServicesSelected ? onTechnicianSelect : undefined}
                            className={`bg-white ${hasServicesSelected ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                            disabled={!hasServicesSelected}
                          />
                        )}
                        {!selectedTechnician && (
                          <User
                            className={`absolute right-3 top-3 w-4 h-4 ${hasServicesSelected ? 'text-gray-400' : 'text-gray-300'}`}
                          />
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-end gap-2.5 p-2.5 sm:justify-end sm:gap-2 sm:p-0 justify-center">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeSlot(slot.id)}
                        className={`w-8 h-8 p-0 rounded-full ${
                          index === 0
                            ? 'bg-gray-200 hover:bg-gray-200 cursor-not-allowed'
                            : 'bg-gray-200 hover:bg-red-500 hover:text-white'
                        }`}
                        disabled={index === 0}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addSlot}
                        className="w-8 h-8 p-0 rounded-full bg-green-500 hover:bg-green-600 text-white"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg">
              Book now
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default BookingForm
