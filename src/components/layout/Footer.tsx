import React from 'react'
import { useTranslation } from 'react-i18next'
import { Facebook, Twitter, Instagram } from 'lucide-react'
import Logo from 'assets/images/logo/logo.svg'

interface FooterProps {
  className?: string
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const { t } = useTranslation()
  return (
    <footer className={`bg-white py-12 ${className}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <img src={Logo} alt="SENVERSE Logo" className="w-8 h-8" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{t('header.brandName')}</span>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">{t('footer.description')}</p>

            <div className="flex space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Facebook className="w-4 h-4 text-white" />
              </div>
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                <Twitter className="w-4 h-4 text-white" />
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Instagram className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Middle Column - Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">{t('footer.company')}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button className="text-gray-600 hover:text-gray-900 transition-colors text-left">
                    {t('footer.aboutLink')}
                  </button>
                </li>
                <li>
                  <button className="text-gray-600 hover:text-gray-900 transition-colors text-left">
                    {t('footer.career')}
                  </button>
                </li>
                <li>
                  <button className="text-gray-600 hover:text-gray-900 transition-colors text-left">
                    {t('footer.mobile')}
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">{t('footer.contact')}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button className="text-gray-600 hover:text-gray-900 transition-colors text-left">
                    {t('footer.whyUs')}
                  </button>
                </li>
                <li>
                  <button className="text-gray-600 hover:text-gray-900 transition-colors text-left">
                    {t('footer.partner')}
                  </button>
                </li>
                <li>
                  <button className="text-gray-600 hover:text-gray-900 transition-colors text-left">
                    {t('footer.faq')}
                  </button>
                </li>
                <li>
                  <button className="text-gray-600 hover:text-gray-900 transition-colors text-left">
                    {t('footer.blog')}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Contact Info */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">{t('footer.meetUs')}</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>+00 92 1234 56789</p>
              <p>info@bookingnails.com</p>
              <p>205. R Street, New York BD23200</p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-600">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
