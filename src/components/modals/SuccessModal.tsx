import React from 'react'
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
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <div className="text-center space-y-6 py-6">
          {/* Success Image */}
          <div className="flex justify-center">
            <img src={bookingSuccessImage} alt="Booking Successful" className="w-32 h-32 object-contain" />
          </div>

          {/* Success Message */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">BOOKING SUCCESSFUL</h2>
            {bookingDetails && (
              <div className="text-sm text-gray-600 space-y-1">
                {bookingDetails.appointmentTime && <p>📅 {bookingDetails.appointmentTime}</p>}
                {bookingDetails.service && <p>💅 {bookingDetails.service}</p>}
                {bookingDetails.technician && <p>👩‍💼 {bookingDetails.technician}</p>}
              </div>
            )}
          </div>

          {/* Close Button */}
          <Button
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 hover:bg-gray-50 p-0"
          >
            <X className="w-6 h-6 text-gray-600" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SuccessModal
