import React from 'react'
import { useTranslation } from 'react-i18next'
import { usePageTitle } from 'hooks/usePageTitle'
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card'
import { Button } from 'components/ui/button'
import { Link } from 'react-router-dom'
import { Star, Calendar } from 'lucide-react'

const TechniciansPage: React.FC = () => {
  const { t } = useTranslation()
  usePageTitle()

  const technicians = [
    { name: 'Emma', rating: 4.8, specialties: ['Manicure', 'Pedicure'], experience: '3 years' },
    { name: 'Olivia', rating: 4.9, specialties: ['Nail Art', 'Gel Polish'], experience: '5 years' },
    { name: 'Ava', rating: 4.7, specialties: ['French Manicure'], experience: '2 years' },
    { name: 'Sophia', rating: 4.9, specialties: ['Nail Extensions'], experience: '4 years' },
    { name: 'Isabella', rating: 4.8, specialties: ['Manicure', 'Nail Art'], experience: '3 years' },
    { name: 'Mia', rating: 4.6, specialties: ['Pedicure'], experience: '2 years' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('technicians.title')}</h1>
          <p className="text-lg text-gray-600">{t('technicians.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technicians.map((tech, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-semibold text-gray-700">{tech.name.charAt(0)}</span>
                </div>
                <CardTitle className="text-xl">{tech.name}</CardTitle>
                <div className="flex items-center justify-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{tech.rating}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700">{t('technicians.experience')}</p>
                    <p className="text-sm text-gray-600">{tech.experience}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">{t('technicians.specialties')}</p>
                    <p className="text-sm text-gray-600">{tech.specialties.join(', ')}</p>
                  </div>
                  <Button asChild className="w-full">
                    <Link to="/booking">
                      {t('technicians.bookWith')} {tech.name}
                    </Link>
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

export default TechniciansPage
