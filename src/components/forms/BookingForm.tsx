import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { Label } from 'components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card'
import { User, Plus, Minus } from 'lucide-react'
import { DateTimePicker } from 'components/ui/datetime-picker'
import type { Service } from 'store/slices/serviceSlice'
import type { Technician } from 'store/slices/technicianSlice'

interface AppointmentSlot {
  id: string
  selectedServices: Service[]
  selectedTechnician: Technician | null
}

interface BookingFormProps {
  onServiceSelect?: (slotId: string) => void
  onTechnicianSelect?: (slotId: string) => void
  onSubmit?: (data: any) => void
  className?: string
  appointmentSlots?: AppointmentSlot[]
  onUpdateSlot?: (slotId: string, updates: Partial<AppointmentSlot>) => void
  onAddSlot?: () => void
  onRemoveSlot?: (slotId: string) => void
  onReset?: () => void
}

export const BookingForm: React.FC<BookingFormProps> = ({
  onServiceSelect,
  onTechnicianSelect,
  onSubmit,
  className = '',
  appointmentSlots: externalAppointmentSlots,
  onUpdateSlot,
  onAddSlot,
  onRemoveSlot,
  onReset,
}) => {
  const { t } = useTranslation()
  const [formData, setFormData] = React.useState({
    fullName: '',
    lastName: '',
    phone: '',
    email: '',
  })

  const [appointmentTime, setAppointmentTime] = React.useState<Date | undefined>(undefined)

  // Use external appointment slots if provided, otherwise use internal state
  const [internalAppointmentSlots, setInternalAppointmentSlots] = React.useState<AppointmentSlot[]>([
    {
      id: '1',
      selectedServices: [],
      selectedTechnician: null,
    },
  ])

  const appointmentSlots = externalAppointmentSlots || internalAppointmentSlots

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addSlot = () => {
    console.log('test add slot')
    if (onAddSlot) {
      onAddSlot()
    } else {
      // Fallback to internal state if no callback provided
      setInternalAppointmentSlots((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          selectedServices: [],
          selectedTechnician: null,
        },
      ])
    }
  }

  const removeSlot = (slotId: string) => {
    if (appointmentSlots.length > 1) {
      if (onRemoveSlot) {
        onRemoveSlot(slotId)
      } else {
        // Fallback to internal state if no callback provided
        setInternalAppointmentSlots((prev) => prev.filter((slot) => slot.id !== slotId))
      }
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
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
                      +1
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '') // Chỉ giữ số
                        let formatted = value

                        // Format US phone number: (XXX) XXX-XXXX
                        if (value.length >= 6) {
                          formatted = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`
                        } else if (value.length >= 3) {
                          formatted = `(${value.slice(0, 3)}) ${value.slice(3)}`
                        } else if (value.length > 0) {
                          formatted = `(${value}`
                        }

                        handleInputChange('phone', formatted)
                      }}
                      className="pl-12"
                      maxLength={14}
                      required
                    />
                  </div>
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
            <div className="rounded-lg p-1">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  {t('booking.appointmentTime')} <span className="text-red-500">*</span>
                </Label>
                <DateTimePicker
                  value={appointmentTime}
                  onChange={(date: Date | undefined) => {
                    console.log('BookingForm onChange called with:', date)

                    setAppointmentTime(date)
                  }}
                  placeholder={t('booking.appointmentTime')}
                />
              </div>
            </div>

            {/* Services & Technicians Section */}
            <div className="space-y-4">
              {appointmentSlots.map((slot, index) => (
                <div key={slot.id} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        {t('booking.service')} <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          placeholder={
                            slot.selectedServices.length > 0
                              ? `${slot.selectedServices.length} service(s) selected`
                              : t('booking.selectService')
                          }
                          value={slot.selectedServices.map((s) => s.lv_2_service).join(', ')}
                          readOnly
                          onClick={() => onServiceSelect?.(slot.id)}
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
                        {slot.selectedTechnician ? (
                        // Show selected technician with avatar and name
                          <div
                            onClick={() => onTechnicianSelect?.(slot.id)}
                          className="flex items-center gap-3 p-1 border rounded-lg bg-white cursor-pointer hover:bg-gray-50"
                          >
                            <img
                              src={slot.selectedTechnician.avatar}
                              alt={slot.selectedTechnician.name}
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
                                {slot.selectedTechnician.name.charAt(0)}
                              </span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{slot.selectedTechnician.name}</p>
                            </div>
                            <User className="w-4 h-4 text-gray-400" />
                          </div>
                        ) : (
                        // Show placeholder input
                          <Input
                            placeholder={t('booking.selectTechnician')}
                            value=""
                            readOnly
                            onClick={() => onTechnicianSelect?.(slot.id)}
                          className="bg-white cursor-pointer"
                          />
                        )}
                        {!slot.selectedTechnician && <User className="absolute right-3 top-3 w-4 h-4 text-gray-400" />}
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
