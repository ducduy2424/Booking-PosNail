import * as React from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'

import { cn } from 'lib/utils'
import { Button } from 'components/ui/button'
import { Calendar } from 'components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover'

interface DateTimePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  value,
  onChange,
  placeholder = 'Pick a date and time',
  className,
  disabled = false,
}) => {
  const [date, setDate] = React.useState<Date | undefined>(value)
  const [month, setMonth] = React.useState<Date | undefined>(date)
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    if (value) {
      setDate(value)
      setMonth(value)
    }
  }, [value])

  // Reset date when popover opens if no date is selected
  React.useEffect(() => {
    if (isOpen && !date) {
      const today = new Date()
      today.setHours(9, 0, 0, 0)
      setDate(today)
      setMonth(today)
    }
  }, [isOpen, date])

  const hours = Array.from({ length: 24 }, (_, i) => i)
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5)

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      // Create a new date object to avoid mutation issues
      const newDate = new Date(selectedDate)

      // If there's already a time set, preserve it
      if (date) {
        newDate.setHours(date.getHours())
        newDate.setMinutes(date.getMinutes())
        newDate.setSeconds(0)
        newDate.setMilliseconds(0)
      } else {
        // Default to 9:00 AM
        newDate.setHours(9, 0, 0, 0)
      }
      setDate(newDate)
      setMonth(newDate)
      onChange?.(newDate)
    }
  }

  const handleTimeChange = (type: 'hour' | 'minute', value: string) => {
    if (date) {
      const newDate = new Date(date)
      if (type === 'hour') {
        newDate.setHours(parseInt(value))
      } else if (type === 'minute') {
        newDate.setMinutes(parseInt(value))
      }
      setDate(newDate)
      onChange?.(newDate)
    } else {
      // If no date selected yet, create one with today's date
      const newDate = new Date()
      if (type === 'hour') {
        newDate.setHours(parseInt(value))
      } else if (type === 'minute') {
        newDate.setMinutes(parseInt(value))
      }
      setDate(newDate)
      setMonth(newDate)
      onChange?.(newDate)
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full h-11 rounded-xl border border-gray-300 bg-white text-left font-normal px-3 hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 flex items-center',
            !date && 'text-gray-500',
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
          <span className="truncate">{date ? format(date, 'dd/MM/yyyy HH:mm') : placeholder}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[90vw] sm:w-auto max-h-[90vh] sm:h-[380px] p-0 rounded-2xl shadow-2xl bg-white overflow-auto sm:overflow-hidden border-2 border-gray-100"
        align="start"
      >
        <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
          <div className="sm:h-[380px] flex items-center justify-center">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={handleDateSelect}
              initialFocus
              disabled={(checkDate) => checkDate < new Date(new Date().setHours(0, 0, 0, 0))}
              className="sm:rounded-l-2xl"
            />
          </div>
          <div className="flex flex-row sm:flex-row divide-x sm:divide-x divide-gray-200 bg-gray-50 min-h-[120px] sm:h-[380px]">
            {/* Hours Column */}
            <div className="flex flex-col p-3 w-1/2 sm:w-20">
              <div className="text-xs font-semibold text-gray-700 mb-3 text-center uppercase tracking-wide">Hours</div>
              <div className="flex gap-2 overflow-x-auto sm:flex-col sm:overflow-y-auto flex-1 pb-2 sm:pb-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                {hours.map((hour) => (
                  <Button
                    key={hour}
                    variant={date && date.getHours() === hour ? 'default' : 'ghost'}
                    size="sm"
                    className={cn(
                      'w-10 h-10 sm:w-full sm:h-9 text-sm font-medium flex-shrink-0 rounded-lg transition-all duration-200',
                      date && date.getHours() === hour
                        ? 'bg-[#1B365D] text-white hover:bg-[#1B365D] shadow-md scale-105'
                        : 'hover:bg-white hover:shadow-sm hover:scale-105 text-gray-700'
                    )}
                    onClick={() => handleTimeChange('hour', hour.toString())}
                  >
                    {hour.toString().padStart(2, '0')}
                  </Button>
                ))}
              </div>
            </div>

            {/* Minutes Column */}
            <div className="flex flex-col p-3 w-1/2 sm:w-20">
              <div className="text-xs font-semibold text-gray-700 mb-3 text-center uppercase tracking-wide">
                Minutes
              </div>
              <div className="flex gap-2 overflow-x-auto sm:flex-col sm:overflow-y-auto flex-1 pb-2 sm:pb-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                {minutes.map((minute) => (
                  <Button
                    key={minute}
                    variant={date && date.getMinutes() === minute ? 'default' : 'ghost'}
                    size="sm"
                    className={cn(
                      'w-10 h-10 sm:w-full sm:h-9 text-sm font-medium flex-shrink-0 rounded-lg transition-all duration-200',
                      date && date.getMinutes() === minute
                        ? 'bg-[#1B365D] text-white hover:bg-[#1B365D] shadow-md scale-105'
                        : 'hover:bg-white hover:shadow-sm hover:scale-105 text-gray-700'
                    )}
                    onClick={() => handleTimeChange('minute', minute.toString())}
                  >
                    {minute.toString().padStart(2, '0')}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default DateTimePicker
