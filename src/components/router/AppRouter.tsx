import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Header } from 'components/layout/Header'
import { Footer } from 'components/layout/Footer'
import LoadingSpinner from '../common/LoadingSpinner'
import { usePageTitle } from 'hooks/usePageTitle'
import { routeConfig, ROUTES } from 'routes'

// Loading component
const LoadingFallback: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner />
  </div>
)

// Inner component that uses router hooks
const RouterContent: React.FC = () => {
  usePageTitle() // Auto-update page title based on route

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {routeConfig.map((route) => (
              <Route key={route.path} path={route.path} element={<route.component />} />
            ))}

            {/* Catch all route - redirect to booking */}
            <Route path="*" element={<Navigate to={ROUTES.BOOKING} replace />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}

// Main App Router
const AppRouter: React.FC = () => {
  return (
    <Router>
      <RouterContent />
    </Router>
  )
}

export default AppRouter
