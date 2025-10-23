import * as React from 'react'
import { DayPicker } from 'react-day-picker'

import { cn } from 'lib/utils'
import { buttonVariants } from './button'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  React.useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      /* Layout */
      .rdp-root, .rdp-month, .rdp-weeks {
        width: 100%;
      }
      
      .rdp-week, .rdp-weekdays {
        display: flex !important;
        width: 100% !important;
        justify-content: space-around !important;
      }
      
      .rdp-week {
        margin-top: 2px !important;
      }
      
      /* Cells */
      .rdp-weekday, .rdp-day {
        width: 36px !important;
        min-width: 36px !important;
        max-width: 36px !important;
        font-weight: 600;
        flex: 0 0 36px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      
      .rdp-day {
        height: 40px !important;
      }

      /* Active/Pressed state for day buttons */
      .rdp-day_button:active,
      .rdp-day:active {
        transform: scale(0.95) !important;
      }

      /* Selected day enhanced style - More specific selectors */
      .rdp-day_selected,
      .rdp-day_selected .rdp-day_button,
      button.rdp-day_selected {
        background: linear-gradient(135deg, #3b82f6, #8b5cf6) !important;
        color: white !important;
        font-weight: bold !important;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4) !important;
        transform: scale(1.1) !important;
        border: 2px solid white !important;
        border-radius: 8px !important;
        animation: pulse 2s infinite !important;
      }

      .rdp-day_selected:hover,
      .rdp-day_selected .rdp-day_button:hover,
      button.rdp-day_selected:hover {
        background: linear-gradient(135deg, #2563eb, #7c3aed) !important;
        transform: scale(1.1) !important;
        box-shadow: 0 6px 16px rgba(59, 130, 246, 0.5) !important;
      }

      /* Dropdown */
      .rdp-caption_dropdowns {
        display: flex !important;
        gap: 8px !important;
        align-items: center !important;
        justify-content: center !important;
      }
      
      .rdp-dropdown {
        padding: 4px 8px !important;
        border-radius: 6px !important;
        border: 1px solid #d1d5db !important;
        font-weight: 600 !important;
        font-size: 14px !important;
        background-color: white !important;
        color: #374151 !important;
        cursor: pointer !important;
        transition: all 0.2s ease !important;
      }
      
      .rdp-dropdown:hover {
        border-color: #1B365D !important;
        background-color: #f9fafb !important;
      }
      
      .rdp-dropdown:focus {
        outline: none !important;
        border-color: #1B365D !important;
        box-shadow: 0 0 0 2px rgba(27, 54, 93, 0.1) !important;
      }
      
      .rdp-dropdown_month {
        margin-right: 4px !important;
      }
      
      .rdp-dropdown_year {
        margin-left: 4px !important;
      }

      /* Hide duplicate caption label */
      .rdp-caption_label {
        display: none !important;
      }

      /* Navigation */
      .rdp-button_next, .rdp-button_previous {
        border-radius: 20px;
        background-color: #1B365D !important;
      }

      .rdp-button_next:hover, .rdp-button_previous:hover {
        background-color: #1B365D !important;
      }

      button svg.rdp-chevron {
        fill: white !important;
      }

      /* Today styling */
      .rdp-day_today {
        border: 2px solid #3b82f6 !important;
        color: #2563eb !important;
        background: linear-gradient(135deg, #dbeafe, #e0e7ff) !important;
        font-weight: bold !important;
        border-radius: 8px !important;
      }

      .rdp-day_today:hover {
        background: linear-gradient(135deg, #bfdbfe, #c7d2fe) !important;
      }

      /* Regular day hover */
      .rdp-day:hover:not(.rdp-day_selected):not(.rdp-day_today) {
        background: linear-gradient(135deg, #dbeafe, #e0e7ff) !important;
        transform: scale(1.05) !important;
        box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2) !important;
        border: 1px solid #93c5fd !important;
        border-radius: 8px !important;
      }

      /* Force selected day styling with maximum specificity */
      .rdp-root .rdp-day_selected,
      .rdp-root .rdp-day_selected button,
      .rdp-root button.rdp-day_selected,
      .rdp-root .rdp-day_selected .rdp-day_button {
        background: linear-gradient(135deg, #3b82f6, #8b5cf6) !important;
        color: white !important;
        font-weight: bold !important;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4) !important;
        transform: scale(1.1) !important;
        border: 2px solid white !important;
        border-radius: 8px !important;
        animation: pulse 2s infinite !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <DayPicker
      mode="single"
      showOutsideDays={showOutsideDays}
      className={cn('p-4 bg-white', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4 w-full',
        caption: 'flex justify-center items-center relative mb-1 px-10',
        nav: 'flex items-center gap-1',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-8 w-8 p-0 text-[#1B365D] hover:bg-[#1B365D] hover:text-white border-2 border-[#1B365D] rounded-lg transition-all duration-200 hover:scale-110 shadow-sm'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse',
        head_row: 'flex w-full justify-around mb-1',
        head_cell:
          'text-gray-600 rounded-md font-semibold text-[0.7rem] text-center flex items-center justify-center h-9 w-9 flex-[0_0_36px]',
        week: 'flex w-full justify-around mt-0.5',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-10 w-9 p-0 font-semibold text-gray-700 aria-selected:opacity-100 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 hover:scale-105 flex-[0_0_36px]'
        ),
        day_button: 'w-full h-full',
        day_selected:
          'bg-[#1B365D] text-white hover:bg-[#1B365D] hover:text-white focus:bg-[#1B365D] focus:text-white shadow-md scale-105',
        day_today: 'border-2 border-[#1B365D] text-[#1B365D] bg-white font-bold hover:bg-white',
        day_outside:
          'day-outside text-gray-400 opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_hidden: 'invisible',
        ...classNames,
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
