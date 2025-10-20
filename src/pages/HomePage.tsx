import React from 'react'
import MainLayout from 'components/layout/MainLayout'
import { Button } from 'components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/card'

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Welcome to Booking Frontend</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A modern React TypeScript application with Redux, shadcn/ui, and Tailwind CSS
          </p>
        </div>

        <div className="flex gap-4">
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-12">
          <Card>
            <CardHeader>
              <CardTitle>TypeScript</CardTitle>
              <CardDescription>Type-safe development</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Built with TypeScript for enhanced developer experience and code quality.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>shadcn/ui</CardTitle>
              <CardDescription>Beautiful components</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Customizable components built with Radix UI and Tailwind CSS.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Redux Toolkit</CardTitle>
              <CardDescription>State management</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Efficient state management with Redux Toolkit and typed hooks.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}

export default HomePage
