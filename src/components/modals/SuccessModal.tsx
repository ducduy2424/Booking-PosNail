import React, { useEffect, useState } from 'react'
import { Button } from 'components/ui/button'
import { Dialog, DialogContent } from 'components/ui/dialog'
import { X } from 'lucide-react'
import bookingSuccessImage from 'assets/images/components/booking_success.png'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  bookingDetails?: {
    appointmentTime?: string
    service?: string
    technician?: string
  }
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, bookingDetails }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      // Reset image loaded state when modal opens
      setImageLoaded(false)
    } else {
      setIsVisible(false)
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <div
          className={`text-center space-y-6 py-6 transition-all duration-500 ${isVisible ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95'}`}
        >
          {/* Success Image with bounce animation */}
          <div className="flex justify-center">
            <img
              src={bookingSuccessImage}
              alt="Booking Successful"
              className={`w-32 h-32 object-contain transition-all duration-700 delay-200 ${
                imageLoaded ? 'animate-bounce' : 'opacity-0 scale-50'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>

          {/* Success Message with slide up animation */}
          <div
            className={`space-y-2 transition-all duration-500 delay-300 ${
              isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}
          >
            <h2 className="text-2xl font-bold text-gray-900 animate-pulse">BOOKING SUCCESSFUL</h2>
            {bookingDetails && (
              <div className="text-sm text-gray-600 space-y-1">
                {bookingDetails.appointmentTime && (
                  <p className="animate-fade-in delay-500">📅 {bookingDetails.appointmentTime}</p>
                )}
                {bookingDetails.service && <p className="animate-fade-in delay-700">💅 {bookingDetails.service}</p>}
                {bookingDetails.technician && (
                  <p className="animate-fade-in delay-900">👩‍💼 {bookingDetails.technician}</p>
                )}
              </div>
            )}
          </div>

          {/* Close Button with scale animation */}
          <Button
            onClick={onClose}
            className={`w-12 h-12 rounded-full bg-white border-2 border-gray-200 hover:bg-gray-50 p-0 transition-all duration-300 delay-1000 ${
              isVisible ? 'opacity-100 transform scale-100 hover:scale-110' : 'opacity-0 transform scale-75'
            }`}
          >
            <X className="w-6 h-6 text-gray-600" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SuccessModal
