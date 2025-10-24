# Booking Frontend

Ứng dụng React TypeScript hiện đại cho hệ thống đặt chỗ, được xây dựng với các công nghệ và công cụ tiên tiến nhất.

## 🚀 Công nghệ sử dụng

### Core Technologies
- **React 19** - Thư viện JavaScript cho việc xây dựng giao diện người dùng
- **TypeScript** - Superset của JavaScript với static typing
- **Redux Toolkit** - Quản lý state hiện đại và hiệu quả
- **React Redux** - Tích hợp Redux với React
- **React Router v6** - Routing và navigation cho React apps

### UI Frameworks
- **shadcn/ui** - Re-usable components built with Radix UI and Tailwind CSS
- **Tailwind CSS v3** - Utility-first CSS framework cho styling nhanh chóng
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful & consistent icon library (546+ icons)
- **react-day-picker v9** - Flexible date picker component

### Internationalization
- **i18next** - Internationalization framework
- **react-i18next** - React bindings cho i18next
- **date-fns** - Modern date utility library

### Development Tools
- **Prettier** - Code formatter để đảm bảo code style nhất quán
- **ESLint** - Linting tool để đảm bảo code quality
- **PostCSS** - Tool để transform CSS với JavaScript plugins
- **Autoprefixer** - PostCSS plugin để tự động thêm vendor prefixes

### Features
- ✅ TypeScript support với path aliasing
- ✅ Redux Toolkit cho state management
- ✅ React Router v6 với lazy loading
- ✅ Internationalization (i18n) - English & Tiếng Việt
- ✅ shadcn/ui components (customizable & accessible)
- ✅ Custom DateTime Picker với calendar
- ✅ Tailwind CSS với design system
- ✅ Dark mode support
- ✅ ESLint + Prettier tích hợp hoàn chỉnh
- ✅ Hot reload development
- ✅ Modern build system với Create React App

## 📋 Yêu cầu hệ thống

- Node.js 18.0.0 hoặc mới hơn
- npm 8.0.0+ hoặc yarn 1.22.0+
- Git

## 🔧 Environment Variables

Tạo file `.env.local` trong thư mục gốc với các biến môi trường sau:

```bash
# API Configuration
REACT_APP_API_URL=https://api-posnail.citgroup.vn/api

# Development Configuration
REACT_APP_NODE_ENV=development
```

### Biến môi trường bắt buộc:
- `REACT_APP_API_URL`: URL của API backend

### URL Parameters:
- `store_id`: ID của cửa hàng được truyền qua URL parameter (ví dụ: `?store_id=1`). Nếu không có, mặc định sẽ là 1.

## 🛠 Cài đặt và Setup

### 1. Clone repository

```bash
git clone <repository-url>
cd booking-frontend
```

### 2. Cài đặt dependencies

Sử dụng npm:
```bash
npm install
```

Hoặc sử dụng yarn:
```bash
yarn install
```

### 3. Cấu hình môi trường

Tạo file `.env.local` trong thư mục root:
```env
# API Configuration
REACT_APP_API_URL=http://localhost:3000
REACT_APP_NAME=Booking Frontend

# Other configurations
REACT_APP_DEBUG=true
```

**Lưu ý:** `store_id` giờ đây được truyền qua URL parameter thay vì file .env. Ví dụ: `http://localhost:3000?store_id=1`

### 4. Chạy ứng dụng

Development mode:
```bash
npm start
# hoặc
yarn start
```

Ứng dụng sẽ chạy tại: `http://localhost:3000`

### 5. Build cho production

```bash
npm run build
# hoặc
yarn build
```

## 📁 Cấu trúc thư mục

```
src/
├── components/          # Reusable components
│   ├── ui/             # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── calendar.tsx
│   │   ├── datetime-picker.tsx
│   │   ├── dialog.tsx
│   │   └── popover.tsx
│   ├── common/         # Common UI components
│   │   ├── Button.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── LanguageDropdown.tsx
│   ├── forms/          # Form components
│   │   └── BookingForm.tsx
│   ├── modals/         # Modal components
│   │   ├── ServiceSelectionModal.tsx
│   │   ├── TechnicianSelectionModal.tsx
│   │   └── SuccessModal.tsx
│   ├── navigation/     # Navigation components
│   ├── router/         # Router components
│   │   └── AppRouter.tsx
│   └── layout/         # Layout components
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── MainLayout.tsx
├── pages/              # Page components
│   ├── BookingPage.tsx      # Default home page
│   ├── ServicesPage.tsx
│   ├── TechniciansPage.tsx
│   ├── AboutPage.tsx
│   ├── ContactPage.tsx
│   └── ProfilePage.tsx
├── routes/             # Route configuration
│   └── index.ts
├── i18n/               # Internationalization
│   ├── config.ts       # i18next configuration
│   ├── types.ts
│   ├── locales/
│   │   ├── en.json     # English translations
│   │   └── vi.json     # Vietnamese translations
│   └── README.md
├── store/              # Redux store configuration
│   ├── index.ts        # Store setup
│   ├── slices/         # Redux slices
│   │   ├── bookingSlice.ts
│   │   ├── serviceSlice.ts
│   │   └── technicianSlice.ts
│   └── hooks.ts        # Typed hooks
├── services/           # API services
│   ├── api.ts
│   ├── bookingService.ts
│   ├── serviceService.ts
│   └── technicianService.ts
├── config/             # Configuration
│   ├── api.ts
│   └── endpoints.ts
├── hooks/              # Custom React hooks
│   ├── useDebounce.ts
│   ├── useMobile.ts
│   └── usePageTitle.ts
├── utils/              # Utility functions
│   └── helpers.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── lib/                # Library utilities
│   └── utils.ts        # cn() utility
├── assets/             # Static assets
│   ├── images/
│   │   ├── logo/
│   │   ├── languages/
│   │   └── background/
│   └── icons/
├── styles/             # Global styles
├── App.tsx             # Main App component
├── index.tsx           # Entry point (with Redux & i18n)
└── index.css           # Global CSS (with Tailwind directives)
```

## 🔧 Scripts có sẵn

```bash
# Development
npm start           # Chạy development server
npm run build       # Build cho production
npm test            # Chạy test suite

# Code Quality
npm run lint        # Kiểm tra code với ESLint
npm run lint:fix    # Tự động fix ESLint errors
npm run prettier    # Kiểm tra code formatting
npm run prettier:fix # Tự động format code
```

## 🎨 Configuration Files

### Prettier (`.prettierrc`)
```json
{
  "semi": false,
  "tabWidth": 2,
  "singleQuote": true,
  "printWidth": 120,
  "trailingComma": "es5",
  "endOfLine": "lf"
}
```

### EditorConfig (`.editorconfig`)
```ini
root = true

[*]
indent_style = space
indent_size = 2
```

### Tailwind CSS (`tailwind.config.js`)
```javascript
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // ... more theme colors
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}
```

### TypeScript Path Aliasing (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    // ... other options
  }
}
```

Với cấu hình này, bạn có thể import như sau:
```typescript
// Thay vì
import { Button } from '../../../components/common/Button'

// Bạn có thể viết
import { Button } from 'components/common/Button'
```

## 🎨 Components có sẵn

Dự án đã được setup với các shadcn/ui components sau:

### 1. **Button** (`components/ui/button.tsx`)
```typescript
import { Button } from 'components/ui/button'

// Variants
<Button>Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>
```

### 2. **Card** (`components/ui/card.tsx`)
```typescript
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from 'components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

### 3. **Input** (`components/ui/input.tsx`)
```typescript
import { Input } from 'components/ui/input'

<Input type="text" placeholder="Enter text..." />
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />
```

### 4. **Label** (`components/ui/label.tsx`)
```typescript
import { Label } from 'components/ui/label'

<Label htmlFor="email">Email Address</Label>
```

### 5. **Calendar & DateTime Picker** (`components/ui/calendar.tsx`, `components/ui/datetime-picker.tsx`)
```typescript
import { Calendar } from 'components/ui/calendar'
import { DateTimePicker } from 'components/ui/datetime-picker'

// Calendar với dropdown month/year
<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  captionLayout="dropdown"
/>

// DateTime Picker
<DateTimePicker
  value={date}
  onChange={setDate}
  placeholder="Pick a date and time"
/>
```

### 6. **Icons** (Lucide React)
```typescript
import { Home, User, Settings, Search, Menu, X } from 'lucide-react'

<Home className="h-5 w-5" />
<User className="h-6 w-6 text-blue-500" />
<Settings size={24} />
```

## 🎨 Styling Guide

### Sử dụng shadcn/ui Components

```typescript
import { Button } from 'components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from 'components/ui/card'

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click Me</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </CardContent>
    </Card>
  )
}
```

### Sử dụng Tailwind CSS

```typescript
function MyComponent() {
  return (
    <div className="flex items-center justify-center p-4 bg-primary text-primary-foreground rounded-lg">
      <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80">
        Click Me
      </button>
    </div>
  )
}
```

### Custom Styling với cn() utility

```typescript
import { cn } from 'lib/utils'

function MyComponent({ className }: { className?: string }) {
  return (
    <div className={cn('p-4 rounded-lg border', className)}>
      Custom styled component
    </div>
  )
}
```

### Dark Mode

```typescript
// Add 'dark' class to html element
<html className="dark">

// Or toggle programmatically
document.documentElement.classList.toggle('dark')

// Components automatically adapt
<Card className="bg-card text-card-foreground">
  Works in both light and dark mode!
</Card>
```

## 🔄 Redux Store Setup

### 1. Tạo Store

```typescript
// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    // Add your reducers here
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

### 2. Tạo Typed Hooks

```typescript
// src/store/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './index'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

### 3. Wrap App với Provider

```typescript
// src/index.tsx
import { Provider } from 'react-redux'
import { store } from './store'

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

## 🌍 Internationalization (i18n)

Project hỗ trợ đa ngôn ngữ với i18next:

### Ngôn ngữ được hỗ trợ:
- 🇺🇸 English (en)
- 🇻🇳 Tiếng Việt (vi)

### Sử dụng trong component:
```typescript
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { t, i18n } = useTranslation()
  
  return (
    <div>
      <h1>{t('booking.title')}</h1>
      <button onClick={() => i18n.changeLanguage('vi')}>
        Tiếng Việt
      </button>
    </div>
  )
}
```

Chi tiết: [src/i18n/README.md](src/i18n/README.md)

## 🗺️ Routing

Project sử dụng React Router v6 với các routes sau:

| Route | Page | Description |
|-------|------|-------------|
| `/` | BookingPage | Homepage - Booking form |
| `/booking` | BookingPage | Booking form |
| `/services` | ServicesPage | Services list |
| `/technicians` | TechniciansPage | Technicians list |
| `/about` | AboutPage | About us |
| `/contact` | ContactPage | Contact page |
| `/profile` | ProfilePage | User profile |

### Navigation:
```typescript
import { useNavigate } from 'react-router-dom'

function MyComponent() {
  const navigate = useNavigate()
  
  return (
    <button onClick={() => navigate('/booking')}>
      Go to Booking
    </button>
  )
}
```

## 📚 Tài liệu tham khảo

### Core
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/)

### UI & Styling
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)
- [react-day-picker](https://daypicker.dev/)

### i18n & Date
- [i18next Documentation](https://www.i18next.com/)
- [react-i18next](https://react.i18next.com/)
- [date-fns](https://date-fns.org/)

### Code Quality
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)

## 🐛 Troubleshooting

### Lỗi thường gặp

**1. Module resolution errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**2. Tailwind CSS không hoạt động:**
- Đảm bảo đã thêm Tailwind directives vào `src/index.css`
- Kiểm tra `content` trong `tailwind.config.js`
- Restart development server

**3. shadcn/ui components không render đúng:**
- Kiểm tra CSS variables trong `src/index.css`
- Đảm bảo `lib/utils.ts` tồn tại với cn() function
- Check Radix UI dependencies đã được cài đặt

**4. Redux TypeScript errors:**
- Đảm bảo đã sử dụng typed hooks (`useAppDispatch`, `useAppSelector`)
- Kiểm tra type definitions trong store

**5. Path aliasing không hoạt động:**
- Đảm bảo `baseUrl: "./src"` trong `tsconfig.json`
- Restart TypeScript server trong IDE

## 🚀 Best Practices

### 1. Component Organization
- Sử dụng functional components với hooks
- Tách logic phức tạp vào custom hooks
- Giữ components nhỏ và focused

### 2. State Management
- Sử dụng Redux cho global state
- Sử dụng local state cho UI state
- Tận dụng Redux Toolkit's `createSlice`

### 3. Styling
- Sử dụng shadcn/ui cho UI components
- Sử dụng Tailwind cho layout và custom styling
- Leverage CSS variables cho theming
- Sử dụng cn() utility để merge classes

### 4. TypeScript
- Always type props và state
- Sử dụng interfaces cho object types
- Tránh `any` type

### 5. Code Quality
- Run linter trước khi commit
- Format code với Prettier
- Write meaningful component và function names

## 📄 License

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📞 Support

Nếu bạn gặp vấn đề, hãy tạo [issue](../../issues) trên GitHub repository.

---

**Happy Coding! 🎉**
