import React from 'react'
import { Calendar } from 'lucide-react'
import { Button } from './button'
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover'
import { Calendar as CalendarComponent } from 'components/ui/calendar'
import { cn } from 'lib/utils'

interface DatePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = 'Pick a date',
  className,
  disabled = false,
}) => {
  const [open, setOpen] = React.useState(false)

  const formatDate = (date: Date | undefined) => {
    if (!date) return placeholder
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const handleDateSelect = (selectedDate: Date | undefined) => {
    onChange?.(selectedDate)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal bg-white',
            !value && 'text-muted-foreground',
            className
          )}
          disabled={disabled}
        >
          <Calendar className="mr-2 h-4 w-4" />
          {formatDate(value)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2 rounded-xl shadow-xl" align="start">
        <CalendarComponent
          mode="single"
          selected={value}
          onSelect={(d: Date | undefined) => handleDateSelect(d)}
          initialFocus
          disabled={(date) => date < new Date()}
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
