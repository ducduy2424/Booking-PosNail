import React from 'react'
import { useTranslation } from 'react-i18next'
import { usePageTitle } from 'hooks/usePageTitle'
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card'
import { Button } from 'components/ui/button'
import { Link } from 'react-router-dom'
import { Heart, Users, Award, Clock } from 'lucide-react'

const AboutPage: React.FC = () => {
  const { t } = useTranslation()
  usePageTitle()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('about.title')}</h1>
          <p className="text-lg text-gray-600">{t('about.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              SENVERSE was founded with a simple mission: to provide exceptional nail care services in a comfortable,
              professional environment. Since our establishment, we have been committed to delivering the highest
              quality services using premium products and cutting-edge techniques.
            </p>
            <p className="text-gray-600 mb-4">
              Our team of skilled technicians undergoes continuous training to stay updated with the latest trends and
              techniques in nail art and care. We believe that every client deserves personalized attention and care
              that makes them feel beautiful and confident.
            </p>
            <p className="text-gray-600">
              At SENVERSE, we're not just providing services; we're creating experiences that help our clients express
              their unique style and personality through beautiful nails.
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span>Our Mission</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  To provide exceptional nail care services that enhance our clients' natural beauty and boost their
                  confidence through professional, personalized care.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span>Our Values</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-600 space-y-2">
                  <li>• Quality and excellence in every service</li>
                  <li>• Hygiene and safety standards</li>
                  <li>• Customer satisfaction and comfort</li>
                  <li>• Innovation and creativity</li>
                  <li>• Professional and friendly service</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Happy Clients</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Clock className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">5+</h3>
              <p className="text-gray-600">Years Experience</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">1000+</h3>
              <p className="text-gray-600">Services Completed</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link to="/booking">{t('booking.submit')}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
