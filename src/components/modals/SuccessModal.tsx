import React from 'react'
import { Button } from 'components/ui/button'
import { Dialog, DialogContent } from 'components/ui/dialog'
import { CheckCircle, Calendar, Bell, X } from 'lucide-react'

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
          {/* Success Icon */}
          <div className="relative mx-auto w-24 h-24">
            {/* Calendar Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white rounded-lg shadow-lg flex items-center justify-center">
                <Calendar className="w-10 h-10 text-blue-500" />
              </div>
            </div>

            {/* Check Circle */}
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>

            {/* Bell Icon */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
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
