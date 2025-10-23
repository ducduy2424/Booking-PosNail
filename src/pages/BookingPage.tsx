import React from 'react'
import { useTranslation } from 'react-i18next'
import { BookingForm } from 'components/forms/BookingForm'
import { ServiceSelectionModal } from 'components/modals/ServiceSelectionModal'
import { TechnicianSelectionModal } from 'components/modals/TechnicianSelectionModal'
import { SuccessModal } from 'components/modals/SuccessModal'
import { usePageTitle } from 'hooks/usePageTitle'
import backgroundImage from 'assets/images/background/background.avif'
import type { Service } from 'store/slices/serviceSlice'
import type { Technician } from 'store/slices/technicianSlice'
import { bookingService } from 'services/bookingService'
import type { CreateTicketRequest, ServiceBooking, StaffService } from 'services/bookingService'
import { API_CONFIG } from 'config/api'

interface AppointmentSlot {
  id: string
  selectedServices: Service[]
  selectedTechnician: Technician | null
}

interface BookingPageProps {
  className?: string
}

export const BookingPage: React.FC<BookingPageProps> = ({ className = '' }) => {
  const { t } = useTranslation()
  usePageTitle()

  const [isServiceModalOpen, setIsServiceModalOpen] = React.useState(false)
  const [isTechnicianModalOpen, setIsTechnicianModalOpen] = React.useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false)
  const [currentSlotId, setCurrentSlotId] = React.useState<string | null>(null)
  const [appointmentTime, setAppointmentTime] = React.useState<Date | null>(null)

  // State for appointment slots
  const [appointmentSlots, setAppointmentSlots] = React.useState<AppointmentSlot[]>([
    {
      id: '1',
      selectedServices: [],
      selectedTechnician: null,
    },
  ])

  // Extract service IDs for technician filtering from current slot
  const currentSlot = appointmentSlots.find((slot) => slot.id === currentSlotId)
  const serviceIds = currentSlot?.selectedServices.map((service) => service.id) || []
  const hasServicesSelected = (currentSlot?.selectedServices.length || 0) > 0

  // Helper function to format appointment time
  const formatAppointmentTime = (date: Date | null): string => {
    if (!date) return ''

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }

    const dateOptions: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }

    const time = date.toLocaleTimeString('vi-VN', timeOptions)
    const dateStr = date.toLocaleDateString('vi-VN', dateOptions)

    return `${time}, ${dateStr}`
  }

  const handleServiceSelect = (slotId: string) => {
    setCurrentSlotId(slotId)
    setIsServiceModalOpen(true)
  }

  const handleTechnicianSelect = (slotId: string) => {
    setCurrentSlotId(slotId)
    if (hasServicesSelected) {
      setIsTechnicianModalOpen(true)
    }
  }

  const handleServiceSave = (services: Service[]) => {
    if (currentSlotId) {
      setAppointmentSlots((prev) =>
        prev.map((slot) => (slot.id === currentSlotId ? { ...slot, selectedServices: services } : slot))
      )
    }
    setIsServiceModalOpen(false)
    setCurrentSlotId(null)
  }

  const handleTechnicianSave = (technician: Technician) => {
    if (currentSlotId) {
      setAppointmentSlots((prev) =>
        prev.map((slot) => (slot.id === currentSlotId ? { ...slot, selectedTechnician: technician } : slot))
      )
    }
    setIsTechnicianModalOpen(false)
    setCurrentSlotId(null)
  }

  const handleAddSlot = () => {
    const newSlot: AppointmentSlot = {
      id: Date.now().toString(),
      selectedServices: [],
      selectedTechnician: null,
    }
    setAppointmentSlots((prev) => [...prev, newSlot])
  }

  const handleRemoveSlot = (slotId: string) => {
    setAppointmentSlots((prev) => prev.filter((slot) => slot.id !== slotId))
  }

  // Chuẩn hóa dữ liệu
  const handleBookingSubmit = async (data: any) => {
    try {
      // Helper function to parse phone number
      const parsePhoneNumber = (phone: string) => {
        // Remove all non-digit characters
        const digits = phone.replace(/\D/g, '')

        // Vietnamese phone number patterns
        if (digits.startsWith('84')) {
          // +84 format: remove country code
          const withoutCountryCode = digits.substring(2)
          return {
            area_code: withoutCountryCode.substring(0, 3),
            phone_number: withoutCountryCode.substring(3),
          }
        } else if (digits.startsWith('0')) {
          // 0xx format: remove leading 0
          const withoutLeadingZero = digits.substring(1)
          return {
            area_code: withoutLeadingZero.substring(0, 3),
            phone_number: withoutLeadingZero.substring(3),
          }
        } else {
          // Assume first 3 digits are area code
          return {
            area_code: digits.substring(0, 3),
            phone_number: digits.substring(3),
          }
        }
      }

      const { area_code, phone_number } = parsePhoneNumber(data.phone)

      // Group slots by technician
      const staffServicesMap = new Map<string, ServiceBooking[]>()

      appointmentSlots.forEach((slot) => {
        if (slot.selectedTechnician && slot.selectedServices.length > 0) {
          const staffId = slot.selectedTechnician.id

          if (!staffServicesMap.has(staffId)) {
            staffServicesMap.set(staffId, [])
          }

          // Add services for this technician
          slot.selectedServices.forEach((service) => {
            const existingService = staffServicesMap.get(staffId)!.find((s) => s.service_id === service.id)
            if (existingService) {
              existingService.quantity += 1 // Default quantity, can be enhanced later
            } else {
              staffServicesMap.get(staffId)!.push({
                service_id: service.id,
                quantity: 1, // Default quantity, can be enhanced later
              })
            }
          })
        }
      })

      // Convert to API format
      const staff_services: StaffService[] = Array.from(staffServicesMap.entries()).map(([staff_id, services]) => ({
        staff_id,
        services,
      }))

      // Transform form data to API format
      const ticketData: CreateTicketRequest = {
        store_id: parseInt(API_CONFIG.STORE_ID),
        first_name: data.fullName,
        last_name: data.lastName,
        area_code_phone: area_code,
        phone_number: phone_number,
        email: data.email || '',
        appointment_at: data.appointmentTime ? data.appointmentTime.toISOString().slice(0, 19).replace('T', ' ') : '',
        staff_services,
      }

      // Call API to create ticket
      const response = await bookingService.createTicket(ticketData)

      console.log('Booking created successfully:', response)

      // Store appointment time for success modal
      setAppointmentTime(data.appointmentTime)
      setIsSuccessModalOpen(true)
    } catch (error) {
      console.error('Error creating booking:', error)
      // Handle error - could show error modal or toast
      alert('Failed to create booking. Please try again.')
    }
  }

  return (
    <div className={`min-h-screen relative ${className}`}>
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />

      {/* Overlay for better text readability */}
      <div className="fixed inset-0 bg-black/40 -z-10"></div>

      {/* Main Content */}
      <div className="relative z-10 pt-8 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-12 px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{t('booking.title')}</h1>
          <p className="text-lg md:text-xl text-white/90 mb-2">{t('booking.subtitle')}</p>
          <p className="text-sm md:text-base text-white/80">{t('booking.phone')}</p>
        </div>

        {/* Booking Form */}
        <BookingForm
          onServiceSelect={handleServiceSelect}
          onTechnicianSelect={handleTechnicianSelect}
          onSubmit={handleBookingSubmit}
          appointmentSlots={appointmentSlots}
          onUpdateSlot={(slotId, updates) => {
            setAppointmentSlots((prev) => prev.map((slot) => (slot.id === slotId ? { ...slot, ...updates } : slot)))
          }}
          onAddSlot={handleAddSlot}
          onRemoveSlot={handleRemoveSlot}
        />
      </div>

      {/* Modals */}
      <ServiceSelectionModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        onSave={handleServiceSave}
      />

      <TechnicianSelectionModal
        isOpen={isTechnicianModalOpen}
        onClose={() => setIsTechnicianModalOpen(false)}
        onSave={handleTechnicianSave}
        serviceIds={serviceIds}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        bookingDetails={{
          appointmentTime: formatAppointmentTime(appointmentTime),
          service: appointmentSlots
            .filter((slot) => slot.selectedServices.length > 0)
            .map((slot) => slot.selectedServices.map((s) => s.lv_2_service).join(', '))
            .join(' | '),
          technician: appointmentSlots
            .filter((slot) => slot.selectedTechnician)
            .map((slot) => slot.selectedTechnician!.name)
            .join(', '),
        }}
      />
    </div>
  )
}

export default BookingPage
