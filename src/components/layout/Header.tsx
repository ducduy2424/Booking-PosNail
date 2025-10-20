import React from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageDropdown } from 'components/common/LanguageDropdown'
import Logo from 'assets/images/logo/logo.svg'

interface HeaderProps {
  className?: string
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const { t } = useTranslation()

  return (
    <header className={`relative z-20 backdrop-blur-sm ${className}`}>
      {/*Header */}
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <img src={Logo} alt="SENVERSE Logo" className="w-8 h-8" />
          </div>
          <span className="text-2xl font-bold text-white">{t('header.brandName')}</span>
        </div>

        {/* Language Selector */}
        <div className="flex items-center space-x-4">
          <LanguageDropdown />
        </div>
      </div>
    </header>
  )
}

export default Header
