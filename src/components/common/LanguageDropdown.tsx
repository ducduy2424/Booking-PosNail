import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'
import usFlag from 'assets/images/languages/us.svg'
import vnFlag from 'assets/images/languages/vietnam.svg'

interface Language {
  code: string
  name: string
  flag: string
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: usFlag },
  { code: 'vi', name: 'Tiếng Việt', flag: vnFlag },
]

export const LanguageDropdown: React.FC = () => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0]

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode)
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        aria-label="Select Language"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center border-2 border-white/20">
          <img src={currentLanguage.flag} alt={currentLanguage.name} className="w-full h-full object-cover" />
        </div>
        <ChevronDown className={`w-4 h-4 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50 border border-gray-200">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 transition-colors ${
                currentLanguage.code === language.code ? 'bg-gray-50' : ''
              }`}
            >
              <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center border border-gray-200">
                <img src={language.flag} alt={language.name} className="w-full h-full object-cover" />
              </div>
              <span
                className={`text-sm ${
                  currentLanguage.code === language.code ? 'font-semibold text-gray-900' : 'text-gray-700'
                }`}
              >
                {language.name}
              </span>
              {currentLanguage.code === language.code && <span className="ml-auto text-yellow-400">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageDropdown
