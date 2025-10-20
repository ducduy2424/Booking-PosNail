import React from 'react'
import { Header } from 'components/layout/Header'
import { Footer } from 'components/layout/Footer'
import { BookingForm } from 'components/forms/BookingForm'
import { ServiceSelectionModal } from 'components/modals/ServiceSelectionModal'
import { TechnicianSelectionModal } from 'components/modals/TechnicianSelectionModal'
import { SuccessModal } from 'components/modals/SuccessModal'

interface BookingPageProps {
  className?: string
}

export const BookingPage: React.FC<BookingPageProps> = ({ className = '' }) => {
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
    <div className={`min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-white ${className}`}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23fbbf24;stop-opacity:1" /><stop offset="50%" style="stop-color:%23f59e0b;stop-opacity:1" /><stop offset="100%" style="stop-color:%23d97706;stop-opacity:1" /></linearGradient></defs><rect width="1200" height="800" fill="url(%23grad1)"/><circle cx="200" cy="200" r="100" fill="%23fbbf24" opacity="0.3"/><circle cx="800" cy="300" r="150" fill="%23f59e0b" opacity="0.2"/><circle cx="1000" cy="600" r="120" fill="%23d97706" opacity="0.3"/></svg>')`,
        }}
      />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="relative z-10 pt-8 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-12 px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">BOOK APPOINTMENT</h1>
          <p className="text-lg md:text-xl text-white/90 mb-2">
            Please fill in the information below to book an appointment.
          </p>
          <p className="text-sm md:text-base text-white/80">(023) 256-1548 | 08:00 AM - 10:00 PM</p>
        </div>

        {/* Booking Form */}
        <BookingForm
          onServiceSelect={handleServiceSelect}
          onTechnicianSelect={handleTechnicianSelect}
          onSubmit={handleBookingSubmit}
        />
      </div>

      {/* Footer */}
      <Footer />

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
