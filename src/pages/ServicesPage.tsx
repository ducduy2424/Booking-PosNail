import React from 'react'
import { useTranslation } from 'react-i18next'
import { usePageTitle } from 'hooks/usePageTitle'
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card'
import { Button } from 'components/ui/button'
import { Link } from 'react-router-dom'
import { Calendar, Users, Star, Phone } from 'lucide-react'

const ServicesPage: React.FC = () => {
  const { t } = useTranslation()
  usePageTitle()

  const services = [
    { name: 'Basic Manicure', price: 20, duration: '30 min' },
    { name: 'French Manicure', price: 25, duration: '45 min' },
    { name: 'Gel Manicure', price: 30, duration: '60 min' },
    { name: 'Nail Art', price: 35, duration: '90 min' },
    { name: 'Nail Extension', price: 50, duration: '120 min' },
    { name: 'Nail Repair', price: 15, duration: '20 min' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('services.title')}</h1>
          <p className="text-lg text-gray-600">{t('services.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{service.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-blue-600">${service.price}</p>
                  <p className="text-gray-600">{service.duration}</p>
                  <Button asChild className="w-full">
                    <Link to="/booking">{t('services.bookNow')}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServicesPage
