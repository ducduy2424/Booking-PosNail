# 📚 Components Guide - Booking Frontend

Hướng dẫn sử dụng các components có sẵn trong dự án.

## 🎯 shadcn/ui Components

### Button Component

**Import:**
```typescript
import { Button } from 'components/ui/button'
```

**Variants:**
```typescript
<Button variant="default">Default Button</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link Button</Button>
```

**Sizes:**
```typescript
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

**With Icons:**
```typescript
import { Plus, Trash, Edit } from 'lucide-react'

<Button>
  <Plus className="mr-2 h-4 w-4" />
  Add New
</Button>
```

---

### Card Component

**Import:**
```typescript
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from 'components/ui/card'
```

**Full Example:**
```typescript
<Card>
  <CardHeader>
    <CardTitle>Booking Details</CardTitle>
    <CardDescription>Review your booking information</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="space-y-2">
      <p>Date: January 15, 2024</p>
      <p>Time: 2:00 PM</p>
    </div>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Confirm</Button>
  </CardFooter>
</Card>
```

---

### Input Component

**Import:**
```typescript
import { Input } from 'components/ui/input'
import { Label } from 'components/ui/label'
```

**Basic Usage:**
```typescript
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="Enter your email" />
</div>
```

**With State:**
```typescript
const [value, setValue] = useState('')

<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Search..."
/>
```

**Different Types:**
```typescript
<Input type="text" placeholder="Text input" />
<Input type="email" placeholder="Email input" />
<Input type="password" placeholder="Password input" />
<Input type="number" placeholder="Number input" />
<Input type="date" />
<Input type="time" />
```

---

### Label Component

**Import:**
```typescript
import { Label } from 'components/ui/label'
```

**Usage:**
```typescript
<Label htmlFor="username">Username</Label>
<Label className="text-sm font-medium">Required Field *</Label>
```

---

## 🎨 Lucide Icons

**Import:**
```typescript
import {
  Home,
  User,
  Settings,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash,
  Edit,
  Check,
  AlertCircle
} from 'lucide-react'
```

**Basic Usage:**
```typescript
<Home className="h-5 w-5" />
<User size={24} />
<Settings className="w-6 h-6 text-gray-500" />
```

**With Buttons:**
```typescript
<Button variant="outline">
  <Search className="mr-2 h-4 w-4" />
  Search
</Button>
```

**Icon List (commonly used):**
- `Home` - Home icon
- `User` - User profile
- `Settings` - Settings/configuration
- `Search` - Search functionality
- `Menu` - Navigation menu
- `X` - Close/dismiss
- `Plus` - Add/create
- `Trash` - Delete
- `Edit` - Edit/modify
- `Check` - Success/confirm
- `AlertCircle` - Warning/error
- `Calendar` - Date picker
- `Clock` - Time
- `Mail` - Email
- `Phone` - Phone number
- `MapPin` - Location

[Full icon list](https://lucide.dev/icons/)

---

## 🎨 Utility Functions

### cn() - Class Merger

**Import:**
```typescript
import { cn } from 'lib/utils'
```

**Usage:**
```typescript
// Merge classes
<div className={cn('base-class', 'another-class')} />

// Conditional classes
<div className={cn(
  'px-4 py-2 rounded',
  isActive && 'bg-blue-500',
  isDisabled && 'opacity-50'
)} />

// Override classes
<div className={cn('p-4', className)} />
```

---

## 🎨 Tailwind CSS Classes

### Layout
```typescript
// Flexbox
<div className="flex items-center justify-between">
<div className="flex flex-col space-y-4">
<div className="grid grid-cols-3 gap-4">

// Container
<div className="container mx-auto px-4">
<div className="max-w-7xl mx-auto">
```

### Spacing
```typescript
// Padding
className="p-4"      // padding: 1rem (all sides)
className="px-4"     // padding horizontal
className="py-2"     // padding vertical
className="pt-4"     // padding top

// Margin
className="m-4"      // margin: 1rem
className="mx-auto"  // center horizontally
className="space-y-4" // vertical spacing between children
```

### Colors (Theme Variables)
```typescript
// Background
className="bg-background"
className="bg-primary"
className="bg-secondary"
className="bg-card"

// Text
className="text-foreground"
className="text-primary"
className="text-muted-foreground"

// Border
className="border border-border"
```

### Typography
```typescript
className="text-sm"       // 0.875rem
className="text-base"     // 1rem
className="text-lg"       // 1.125rem
className="text-xl"       // 1.25rem
className="text-2xl"      // 1.5rem
className="font-normal"   // font-weight: 400
className="font-medium"   // font-weight: 500
className="font-bold"     // font-weight: 700
```

### Borders & Radius
```typescript
className="rounded"       // border-radius: 0.25rem
className="rounded-lg"    // var(--radius)
className="rounded-md"    // calc(var(--radius) - 2px)
className="border"        // border: 1px solid
```

---

## 🌙 Dark Mode

**Toggle Dark Mode:**
```typescript
// In your component
const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark')
}

<Button onClick={toggleDarkMode}>
  Toggle Dark Mode
</Button>
```

**Dark Mode Classes:**
```typescript
// Automatically uses theme variables
<div className="bg-background text-foreground">
  This adapts to dark mode automatically
</div>

// Manual dark mode styling
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  Custom dark mode styling
</div>
```

---

## 📋 Common Patterns

### Form with Validation
```typescript
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { Label } from 'components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from 'components/ui/card'

function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Make a Booking</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter your name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Enter your email"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
          </div>
          
          <Button type="submit" className="w-full">
            Submit Booking
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
```

### Loading State
```typescript
import { Button } from 'components/ui/button'
import { Loader2 } from 'lucide-react'

function MyComponent() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Button disabled={isLoading}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {isLoading ? 'Loading...' : 'Submit'}
    </Button>
  )
}
```

### List with Cards
```typescript
import { Card, CardHeader, CardTitle, CardContent } from 'components/ui/card'
import { Button } from 'components/ui/button'
import { Edit, Trash } from 'lucide-react'

function BookingList({ bookings }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bookings.map((booking) => (
        <Card key={booking.id}>
          <CardHeader>
            <CardTitle>{booking.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {booking.date}
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="destructive" size="sm">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
```

---

## 🚀 Ready for UI Development!

Bạn đã có đầy đủ components và patterns để bắt đầu xây dựng giao diện!

**Next Steps:**
1. Gửi thiết kế giao diện cho tôi
2. Tôi sẽ tạo các components cần thiết
3. Implement pages với các components đã có

Happy Coding! 🎉

