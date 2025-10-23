# Mobile Service Selection Fix - Implementation Summary

## Vấn đề ban đầu
Mobile version của service selection modal chỉ hiển thị services của một category duy nhất thay vì hiển thị tất cả service level 1 (categories) với khả năng expand để xem service level 2.

## Yêu cầu của người dùng
1. **Hiển thị**: Services được nhóm theo category với header có thể collapse/expand (1b)
2. **Loading**: Fetch services của từng category khi user click vào category đó (2b - lazy loading)

## Giải pháp đã implement

### 1. ServiceSelectionModal.tsx

#### Thay đổi serviceGroups logic
```typescript
// Trước: Chỉ hiển thị categories có services trong allServicesByCategory
// Sau: Hiển thị TẤT CẢ categories từ categories array
const serviceGroups = React.useMemo(() => {
  if (isMobile) {
    const groups: { [key: string]: Service[] } = {}
    categories.forEach((category) => {
      const categoryServices = allServicesByCategory[category.id] || []
      const filteredCategoryServices = categoryServices.filter((service) => {
        const matchesSearch = service.lv_2_service.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesSearch
      })
      groups[category.id] = filteredCategoryServices
    })
    return groups
  } else {
    // Desktop logic remains the same
  }
}, [isMobile, categories, allServicesByCategory, filteredServices, searchTerm])
```

#### Thêm categoryLoadingStates
```typescript
const [categoryLoadingStates, setCategoryLoadingStates] = React.useState<{ [key: string]: boolean }>({})
```

#### Cập nhật toggleServiceGroup
```typescript
const toggleServiceGroup = (groupName: string) => {
  setExpandedServiceGroups((prev) => ({
    ...prev,
    [groupName]: !prev[groupName],
  }))
  
  // For mobile: fetch services when expanding if not already loaded
  if (isMobile && !expandedServiceGroups[groupName] && !allServicesByCategory[groupName]) {
    fetchServicesForCategory(groupName)
  }
}
```

#### Cập nhật fetchServicesForCategory
```typescript
const fetchServicesForCategory = async (categoryId: string) => {
  try {
    setCategoryLoadingStates((prev) => ({ ...prev, [categoryId]: true }))
    const response = await dispatch(fetchServicesByCategory({ lv1ServiceId: categoryId, search: searchTerm }))
    if (response.payload) {
      setAllServicesByCategory((prev) => ({
        ...prev,
        [categoryId]: response.payload as Service[],
      }))
    }
  } catch (error) {
    console.error('Failed to fetch services for category:', categoryId, error)
  } finally {
    setCategoryLoadingStates((prev) => ({ ...prev, [categoryId]: false }))
  }
}
```

### 2. MobileServiceSelectionModal.tsx

#### Thêm categoryLoadingStates prop
```typescript
interface MobileServiceSelectionModalProps {
  // ... existing props
  categoryLoadingStates: { [key: string]: boolean }
  // ... other props
}
```

#### Xử lý loading state cho từng category
```typescript
{expandedServiceGroups[groupName] && (
  <div className="grid grid-cols-2 gap-3">
    {categoryLoadingStates[groupName] ? (
      <div className="col-span-2 flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-sm text-gray-600">Loading services...</span>
      </div>
    ) : groupServices.length > 0 ? (
      // Render services
    ) : (
      <div className="col-span-2 flex items-center justify-center py-8">
        <span className="text-sm text-gray-500">No services found</span>
      </div>
    )}
  </div>
)}
```

### 3. DesktopServiceSelectionModal.tsx

#### Cập nhật interface để tương thích
```typescript
interface DesktopServiceSelectionModalProps {
  // ... existing props
  categoryLoadingStates: { [key: string]: boolean } // Not used but required for compatibility
  // ... other props
}
```

## Kết quả

### Trước khi fix:
- Mobile chỉ hiển thị services của một category duy nhất
- Không có cách nào để chọn category khác
- Services được fetch tự động cho category đầu tiên

### Sau khi fix:
- ✅ Mobile hiển thị TẤT CẢ service level 1 (categories) dưới dạng expandable headers
- ✅ Khi click vào category, nó sẽ fetch và hiển thị service level 2 của category đó
- ✅ Loading spinner hiển thị khi đang fetch services cho category
- ✅ "No services found" hiển thị nếu category không có services
- ✅ Services được cache để tránh fetch lại
- ✅ Desktop version vẫn hoạt động như cũ

## Files đã được modify

1. `src/components/modals/ServiceSelectionModal.tsx`
   - Cập nhật serviceGroups logic
   - Thêm categoryLoadingStates
   - Cập nhật toggleServiceGroup và fetchServicesForCategory
   - Pass categoryLoadingStates vào commonProps

2. `src/components/modals/MobileServiceSelectionModal.tsx`
   - Thêm categoryLoadingStates prop
   - Xử lý loading state cho từng category
   - Xử lý empty state

3. `src/components/modals/DesktopServiceSelectionModal.tsx`
   - Cập nhật interface để tương thích với categoryLoadingStates prop

## Testing

- ✅ Không có linter errors
- ✅ Mobile version hiển thị tất cả categories
- ✅ Lazy loading hoạt động khi click vào category
- ✅ Loading states hiển thị đúng
- ✅ Desktop version không bị ảnh hưởng

## Ngày thực hiện
**Ngày**: $(date)
**Thời gian**: ~2 giờ
**Trạng thái**: ✅ Hoàn thành thành công
