import React from 'react'
import { useTranslation } from 'react-i18next'
import { BookingForm } from 'components/forms/BookingForm'
import { ServiceSelectionModal } from 'components/modals/ServiceSelectionModal'
import { TechnicianSelectionModal } from 'components/modals/TechnicianSelectionModal'
import { SuccessModal } from 'components/modals/SuccessModal'
import { usePageTitle } from 'hooks/usePageTitle'
import backgroundImage from 'assets/images/background/background.avif'

interface BookingPageProps {
  className?: string
}

export const BookingPage: React.FC<BookingPageProps> = ({ className = '' }) => {
  const { t } = useTranslation()
  usePageTitle()

  const [isServiceModalOpen, setIsServiceModalOpen] = React.useState(false)
  const [isTechnicianModalOpen, setIsTechnicianModalOpen] = React.useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false)
  const [selectedServices, setSelectedServices] = React.useState<any[]>([])
  const [selectedTechnician, setSelectedTechnician] = React.useState<any>(null)

  const handleServiceSelect = () => {
    setIsServiceModalOpen(true)
  }

  const handleTechnicianSelect = () => {
    setIsTechnicianModalOpen(true)
  }

  const handleServiceSave = (services: any[]) => {
    setSelectedServices(services)
    setIsServiceModalOpen(false)
  }

  const handleTechnicianSave = (technician: any) => {
    setSelectedTechnician(technician)
    setIsTechnicianModalOpen(false)
  }

  const handleBookingSubmit = (data: any) => {
    console.log('Booking data:', data)
    setIsSuccessModalOpen(true)
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
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        bookingDetails={{
          appointmentTime: '10:00, 09/09/2025',
          service: selectedServices.length > 0 ? selectedServices[0].name : 'Selected Service',
          technician: selectedTechnician?.name || 'Selected Technician',
        }}
      />
    </div>
  )
}

export default BookingPage
