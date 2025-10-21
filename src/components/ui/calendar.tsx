import * as React from 'react'
import { DayPicker } from 'react-day-picker'

import { cn } from 'lib/utils'
import { buttonVariants } from './button'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  React.useEffect(() => {
    // Apply styles after component mounts
    const style = document.createElement('style')
    style.textContent = `
    .rdp-weekdays {
      display: flex !important;
    }
      .rdp-day,
      .rdp-day[class*="rdp-day"] {
        width: 36px !important;
        min-width: 36px !important;
        max-width: 36px !important;
        flex: none !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        text-align: center !important;
      }
      .rdp-root .rdp-weekday,
      .rdp-root .rdp-day {
        width: 36px !important;
        min-width: 36px !important;
        max-width: 36px !important;
        flex: none !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }


      .rdp-button_next,
      .rdp-button_previous {
        border-radius: 20px;
        background-color: #1B365D !important;
      }

      button svg.rdp-chevron {
        fill: white !important;
      }

      .rdp-button_next:hover,
      .rdp-button_previous:hover {
        background-color: #1B365D !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <>
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn('p-4 bg-white', className)}
        classNames={{
          months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
          month: 'space-y-4',
          caption: 'flex justify-center items-center relative mb-1 px-10',
          caption_label: 'text-base font-bold text-gray-800',
          nav: 'flex items-center gap-1',
          nav_button: cn(
            buttonVariants({ variant: 'outline' }),
            'h-8 w-8 p-0 text-[#1B365D] hover:bg-[#1B365D] hover:text-white border-2 border-[#1B365D] rounded-lg transition-all duration-200 hover:scale-110 shadow-sm'
          ),
          nav_button_previous: 'absolute left-1',
          nav_button_next: 'absolute right-1',
          table: 'w-full border-collapse',
          head_row: 'flex w-full mb-1',
          head_cell:
            'text-gray-600 rounded-md font-semibold text-[0.7rem] text-center flex items-center justify-center h-9 w-9 uppercase',
          row: 'flex w-full mt-0.5',
          cell: 'h-10 flex items-center justify-center text-center text-sm p-0 relative w-9',
          day: cn(
            buttonVariants({ variant: 'ghost' }),
            'h-10 w-9 p-0 font-semibold text-gray-700 aria-selected:opacity-100 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110'
          ),
          day_range_end: 'day-range-end',
          day_selected:
            'bg-[#1B365D] text-white hover:bg-[#1B365D] hover:text-white focus:bg-[#1B365D] focus:text-white shadow-md scale-105',
          day_today: 'border-2 border-[#1B365D] text-[#1B365D] bg-blue-50 font-bold',
          day_outside:
            'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
          day_disabled: 'text-muted-foreground opacity-50',
          day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
          day_hidden: 'invisible',
          ...classNames,
        }}
        {...props}
      />
    </>
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
