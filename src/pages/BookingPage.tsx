import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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

  // Extract service IDs for technician filtering from current slot - memoized for performance
  const currentSlot = useMemo(
    () => appointmentSlots.find((slot) => slot.id === currentSlotId),
    [appointmentSlots, currentSlotId]
  )

  const serviceIds = useMemo(
    () => currentSlot?.selectedServices.map((service) => service.id) || [],
    [currentSlot?.selectedServices]
  )

  const hasServicesSelected = useMemo(
    () => (currentSlot?.selectedServices.length || 0) > 0,
    [currentSlot?.selectedServices.length]
  )

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

  const handleServiceSelect = useCallback((slotId: string) => {
    setCurrentSlotId(slotId)
    setIsServiceModalOpen(true)
  }, [])

  const handleTechnicianSelect = useCallback(
    (slotId: string) => {
      setCurrentSlotId(slotId)
      if (hasServicesSelected) {
        setIsTechnicianModalOpen(true)
      }
    },
    [hasServicesSelected]
  )

  const handleServiceSave = useCallback(
    (services: Service[]) => {
      if (currentSlotId) {
        setAppointmentSlots((prev) =>
          prev.map((slot) => (slot.id === currentSlotId ? { ...slot, selectedServices: services } : slot))
        )
      }
      setIsServiceModalOpen(false)
      setCurrentSlotId(null)
    },
    [currentSlotId]
  )

  const handleTechnicianSave = useCallback(
    (technician: Technician) => {
      if (currentSlotId) {
        setAppointmentSlots((prev) =>
          prev.map((slot) => (slot.id === currentSlotId ? { ...slot, selectedTechnician: technician } : slot))
        )
      }
      setIsTechnicianModalOpen(false)
      setCurrentSlotId(null)
    },
    [currentSlotId]
  )

  const handleAddSlot = useCallback(() => {
    const newSlot: AppointmentSlot = {
      id: Date.now().toString(),
      selectedServices: [],
      selectedTechnician: null,
    }
    setAppointmentSlots((prev) => [...prev, newSlot])
  }, [])

  const handleRemoveSlot = useCallback((slotId: string) => {
    setAppointmentSlots((prev) => prev.filter((slot) => slot.id !== slotId))
  }, [])

  // Helper function to format date to local string without timezone conversion
  const formatLocalDateTime = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  // Chuẩn hóa dữ liệu
  const [formKey, setFormKey] = useState(0)

  // Function to reset form data
  const resetFormData = useCallback(() => {
    setAppointmentTime(null)
    setAppointmentSlots([
      {
        id: '1',
        selectedServices: [],
        selectedTechnician: null,
      },
    ])
    // Force re-render of BookingForm by changing key
    setFormKey((prev: number) => prev + 1)
  }, [])

  const handleBookingSubmit = async (data: any) => {
    try {
      // Validation: Check if appointment time is selected
      if (!data.appointmentTime) {
        toast.error(t('validation.selectAppointmentTime'))
        return
      }

      // Validation: Check required personal information fields
      if (!data.fullName || !data.lastName || !data.phone) {
        toast.error(t('validation.fillPersonalInformation'))
        return
      }

      // Validation: Check phone number format (10 digits only)
      const cleanPhone = data.phone.replace(/[\s\-()]/g, '') // Remove spaces, dashes, parentheses
      const phoneRegex = /^\d{10}$/ // Only 10 digits

      if (!phoneRegex.test(cleanPhone)) {
        toast.error(t('validation.phone'))
        return
      }

      // Validation: Check email format if provided
      if (data.email && data.email.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(data.email)) {
          toast.error(t('validation.email'))
          return
        }
      }

      // Validation: Check if at least one slot has services and technician
      const validSlots = appointmentSlots.filter((slot) => slot.selectedTechnician && slot.selectedServices.length > 0)

      if (validSlots.length === 0) {
        toast.error(t('validation.selectServiceAndTechnician'))
        return
      }

      // Helper function to parse US phone number
      const parsePhoneNumber = (phone: string) => {
        // Remove all non-digit characters
        const digits = phone.replace(/\D/g, '')

        // US phone number patterns
        if (digits.startsWith('1') && digits.length === 11) {
          // US phone number: +1 format
          const withoutCountryCode = digits.substring(1)
          return {
            area_code: withoutCountryCode.substring(0, 3),
            phone_number: withoutCountryCode.substring(3),
          }
        } else {
          // Assume first 3 digits are area code
          return {
            area_code: digits.substring(0, 3),
            phone_number: digits.substring(3),
          }
        }
      }

      const { area_code, phone_number } = parsePhoneNumber(cleanPhone)

      // Group slots by technician
      const staffServicesMap = new Map<string, ServiceBooking[]>()

      validSlots.forEach((slot) => {
        const staffId = slot.selectedTechnician!.id

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
      })

      // Convert to API format
      const staff_services: StaffService[] = Array.from(staffServicesMap.entries()).map(([staff_id, services]) => ({
        staff_id,
        services,
      }))

      // Final validation: Ensure we have at least one staff service
      if (staff_services.length === 0) {
        toast.error(t('validation.staffServicesError'))
        return
      }

      // Transform form data to API format
      const ticketData: CreateTicketRequest = {
        store_id: parseInt(API_CONFIG.STORE_ID),
        first_name: data.fullName,
        last_name: data.lastName,
        area_code_phone: area_code,
        phone_number: phone_number,
        email: data.email || '',
        appointment_at: data.appointmentTime ? formatLocalDateTime(data.appointmentTime) : '',
        staff_services,
      }

      // Call API to create ticket with proper error handling
      const response = await bookingService.createTicket(ticketData)

      console.log('Booking created successfully:', response)

      // Store appointment time for success modal
      setAppointmentTime(data.appointmentTime)
      setIsSuccessModalOpen(true)
    } catch (error: any) {
      console.error('Error creating booking:', error)

      // Enhanced error handling with specific error messages
      let errorMessage = t('validation.bookingError')

      if (error.response) {
        // Server responded with error status
        const status = error.response.status
        const serverMessage = error.response.data?.message || error.response.data?.error

        switch (status) {
          case 400:
            errorMessage = serverMessage || t('validation.invalidData')
            break
          case 401:
            errorMessage = t('validation.unauthorized')
            break
          case 403:
            errorMessage = t('validation.forbidden')
            break
          case 404:
            errorMessage = t('validation.notFound')
            break
          case 409:
            errorMessage = serverMessage || t('validation.conflict')
            break
          case 422:
            errorMessage = serverMessage || t('validation.validationError')
            break
          case 500:
            errorMessage = t('validation.serverError')
            break
          default:
            errorMessage = serverMessage || t('validation.bookingError')
        }
      } else if (error.request) {
        // Network error
        errorMessage = t('validation.networkError')
      } else {
        // Other error
        errorMessage = error.message || t('validation.bookingError')
      }

      toast.error(errorMessage)
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
          key={formKey}
          onServiceSelect={handleServiceSelect}
          onTechnicianSelect={handleTechnicianSelect}
          onSubmit={handleBookingSubmit}
          appointmentSlots={appointmentSlots}
          onUpdateSlot={(slotId, updates) => {
            setAppointmentSlots((prev) => prev.map((slot) => (slot.id === slotId ? { ...slot, ...updates } : slot)))
          }}
          onAddSlot={handleAddSlot}
          onRemoveSlot={handleRemoveSlot}
          onReset={resetFormData}
        />
      </div>

      {/* Modals */}
      <ServiceSelectionModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        onSave={handleServiceSave}
        slotId={currentSlotId || undefined}
      />

      <TechnicianSelectionModal
        isOpen={isTechnicianModalOpen}
        onClose={() => setIsTechnicianModalOpen(false)}
        onSave={handleTechnicianSave}
        serviceIds={serviceIds}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false)
          // Reset form data when modal is closed
          resetFormData()
        }}
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

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default BookingPage
