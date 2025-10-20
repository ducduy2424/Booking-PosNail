import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { Label } from 'components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card'
import { Calendar, Clock, User, Plus, Minus } from 'lucide-react'
import { DatePicker } from 'components/ui/date-picker'

interface AppointmentSlot {
  id: string
  time: Date | undefined
  service: string
  technician: string
}

interface BookingFormProps {
  onServiceSelect?: () => void
  onTechnicianSelect?: () => void
  onSubmit?: (data: any) => void
  className?: string
}

export const BookingForm: React.FC<BookingFormProps> = ({
  onServiceSelect,
  onTechnicianSelect,
  onSubmit,
  className = '',
}) => {
  const { t } = useTranslation()
  const [formData, setFormData] = React.useState({
    fullName: '',
    phone: '',
    email: '',
  })

  const [appointmentSlots, setAppointmentSlots] = React.useState<AppointmentSlot[]>([
    {
      id: '1',
      time: undefined,
      service: '',
      technician: '',
    },
  ])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSlotChange = (slotId: string, field: string, value: string) => {
    setAppointmentSlots((prev) => prev.map((slot) => (slot.id === slotId ? { ...slot, [field]: value } : slot)))
  }

  const addSlot = () => {
    const newSlot: AppointmentSlot = {
      id: Date.now().toString(),
      time: undefined,
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

            {/* Appointment Slots */}
            <div className="space-y-4">
              {appointmentSlots.map((slot, index) => (
                <div key={slot.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        {t('booking.appointmentTime')} <span className="text-red-500">*</span>
                      </Label>
                      <DatePicker
                        value={slot.time}
                        onChange={(date) => handleSlotChange(slot.id, 'time', date as any)}
                        placeholder={t('booking.appointmentTime')}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        {t('booking.service')} <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          placeholder={t('booking.selectService')}
                          value={slot.service}
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
                        <Input
                          placeholder={t('booking.selectTechnician')}
                          value={slot.technician}
                          readOnly
                          onClick={onTechnicianSelect}
                          className="bg-white cursor-pointer"
                        />
                        <User className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-end justify-center gap-2.5 p-2.5 sm:justify-end sm:gap-2 sm:p-0">
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
