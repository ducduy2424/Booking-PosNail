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
        flex: 0 0 36px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      
      .rdp-day {
        height: 40px !important;
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
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <DayPicker
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
          'h-10 w-9 p-0 font-semibold text-gray-700 aria-selected:opacity-100 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110 flex-[0_0_36px]'
        ),
        day_button: 'w-full h-full',
        day_selected:
          'bg-[#1B365D] text-white hover:bg-[#1B365D] hover:text-white focus:bg-[#1B365D] focus:text-white shadow-md scale-105',
        day_today: 'border-2 border-[#1B365D] text-[#1B365D] bg-blue-50 font-bold',
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
