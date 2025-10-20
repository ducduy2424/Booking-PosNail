import React from 'react'
import { useTranslation } from 'react-i18next'
import { usePageTitle } from 'hooks/usePageTitle'
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card'
import { Button } from 'components/ui/button'
import { Link } from 'react-router-dom'
import { Calendar, Clock, User } from 'lucide-react'

const ProfilePage: React.FC = () => {
  const { t } = useTranslation()
  usePageTitle()

  // Mock data for demonstration - in real app, this would come from API
  const mockBookings = [
    { id: '1', date: '2025-01-15', time: '2:00 PM', service: 'Gel Manicure', technician: 'Emma', status: 'confirmed' },
    { id: '2', date: '2025-01-22', time: '10:00 AM', service: 'Nail Art', technician: 'Olivia', status: 'pending' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('profile.title')}</h1>
          <p className="text-lg text-gray-600">{t('profile.subtitle')}</p>
        </div>

        <div className="space-y-6">
          {/* Booking History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{t('profile.yourBookings')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockBookings.map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">
                        {booking.date} at {booking.time}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {t('profile.service')}: {booking.service}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t('profile.technician')}: {booking.technician}
                    </p>
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm" variant="outline">
                        {t('profile.reschedule')}
                      </Button>
                      <Button size="sm" variant="destructive">
                        {t('profile.cancel')}
                      </Button>
                    </div>
                  </div>
                ))}

                {mockBookings.length === 0 && (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">{t('profile.noBookings')}</p>
                    <Button asChild>
                      <Link to="/booking">{t('profile.bookFirst')}</Link>
                    </Button>
                  </div>
                )}

                <Button asChild className="w-full">
                  <Link to="/booking">{t('profile.bookNew')}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
