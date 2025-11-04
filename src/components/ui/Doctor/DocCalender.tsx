import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "../../../lib/utils"
import { Button } from "../button"
import { Calendar } from "../calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../popover"

export default function DocCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="flex flex-col items-center justify-center  p-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-3xl border border-gray-100">
        {/* Title and Description */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">
            Select a Date
          </h1>
          <p className="text-gray-500 text-sm">
            Choose a day from the calendar below to continue.
          </p>
        </div>

        {/* Calendar Picker */}
        <div className="flex justify-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[320px] justify-start text-left font-medium border-gray-300 shadow-sm hover:bg-gray-50 text-gray-700",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                {date ? format(date, "EEEE, MMMM d, yyyy") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-lg"
              align="center"
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                showOutsideDays
                initialFocus
                disabled={{ before: new Date() }}
                className="rounded-2xl"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Selected Date Output */}
        <div className="mt-8 text-center text-gray-700">
          {date ? (
            <p className="text-lg font-medium">
              Selected Date:{" "}
              <span className="text-primary font-semibold">
                {format(date, "EEEE, MMMM d, yyyy")}
              </span>
            </p>
          ) : (
            <p className="text-gray-400 italic">No date selected</p>
          )}
        </div>
      </div>
    </div>
  )
}
