# Internationalization (i18n) - Đa ngôn ngữ

## Tổng quan

Project sử dụng **i18next** và **react-i18next** để hỗ trợ đa ngôn ngữ.

## Ngôn ngữ được hỗ trợ

- 🇺🇸 **English (en)** - Tiếng Anh
- 🇻🇳 **Tiếng Việt (vi)** - Tiếng Việt

## Cấu trúc thư mục

```
i18n/
├── config.ts           # Cấu hình i18next
├── types.ts           # TypeScript type definitions
├── locales/
│   ├── en.json        # Bản dịch tiếng Anh
│   └── vi.json        # Bản dịch tiếng Việt
└── README.md          # File này
```

## Cách sử dụng

### 1. Trong Component

```tsx
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { t } = useTranslation()
  
  return (
    <div>
      <h1>{t('booking.title')}</h1>
      <p>{t('booking.subtitle')}</p>
    </div>
  )
}
```

### 2. Thay đổi ngôn ngữ

Sử dụng component `LanguageDropdown` đã có trong Header, hoặc thay đổi programmatically:

```tsx
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { i18n } = useTranslation()
  
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  }
  
  return (
    <button onClick={() => changeLanguage('vi')}>
      Tiếng Việt
    </button>
  )
}
```

### 3. Thêm bản dịch mới

#### Bước 1: Thêm key vào `locales/en.json`

```json
{
  "newSection": {
    "title": "New Title",
    "description": "New Description"
  }
}
```

#### Bước 2: Thêm bản dịch tương ứng vào `locales/vi.json`

```json
{
  "newSection": {
    "title": "Tiêu đề mới",
    "description": "Mô tả mới"
  }
}
```

#### Bước 3: Sử dụng trong component

```tsx
const { t } = useTranslation()
return <h1>{t('newSection.title')}</h1>
```

## Translation Keys hiện có

### Header
- `header.brandName` - Tên thương hiệu

### Booking Page
- `booking.title` - Tiêu đề trang
- `booking.subtitle` - Mô tả phụ
- `booking.phone` - Số điện thoại
- `booking.firstName` - Tên
- `booking.lastName` - Họ
- `booking.email` - Email
- `booking.phone_field` - Số điện thoại (field)
- `booking.date` - Ngày
- `booking.time` - Giờ
- `booking.service` - Dịch vụ
- `booking.technician` - Kỹ thuật viên
- `booking.notes` - Ghi chú
- `booking.submit` - Nút submit
- `booking.selectService` - Chọn dịch vụ
- `booking.selectTechnician` - Chọn kỹ thuật viên

### Services Page
- `services.title`
- `services.subtitle`
- `services.bookNow`

### Technicians Page
- `technicians.title`
- `technicians.subtitle`
- `technicians.experience`
- `technicians.specialties`
- `technicians.bookWith`

### Common
- `common.loading` - Đang tải
- `common.error` - Lỗi
- `common.success` - Thành công

## Features

- ✅ Tự động phát hiện ngôn ngữ trình duyệt
- ✅ Lưu ngôn ngữ đã chọn vào localStorage
- ✅ TypeScript autocomplete cho translation keys
- ✅ Dropdown chọn ngôn ngữ với cờ quốc gia
- ✅ Hỗ trợ fallback sang tiếng Anh nếu key không tồn tại

## Thêm ngôn ngữ mới

### 1. Thêm flag SVG vào `src/assets/images/languages/`

Ví dụ: `japan.svg`

### 2. Tạo file locale mới

Tạo `src/i18n/locales/ja.json`:

```json
{
  "header": {
    "brandName": "SENVERSE"
  },
  // ... các bản dịch khác
}
```

### 3. Cập nhật config

Trong `src/i18n/config.ts`:

```typescript
import ja from './locales/ja.json'

const resources = {
  en: { translation: en },
  vi: { translation: vi },
  ja: { translation: ja }, // Thêm dòng này
}
```

### 4. Cập nhật LanguageDropdown

Trong `src/components/common/LanguageDropdown.tsx`:

```typescript
import jpFlag from 'assets/images/languages/japan.svg'

const languages: Language[] = [
  { code: 'en', name: 'English', flag: usFlag },
  { code: 'vi', name: 'Tiếng Việt', flag: vnFlag },
  { code: 'ja', name: '日本語', flag: jpFlag }, // Thêm dòng này
]
```

## Best Practices

1. **Luôn thêm key mới vào tất cả các file locale**
2. **Sử dụng nested keys** cho tổ chức tốt hơn
3. **Tránh hardcode text** trong component
4. **Test với cả hai ngôn ngữ** trước khi commit
5. **Giữ cho bản dịch ngắn gọn và rõ ràng**

## Notes

- Ngôn ngữ mặc định: **English (en)**
- Fallback language: **English (en)**
- Storage: **localStorage** với key `i18nextLng`

