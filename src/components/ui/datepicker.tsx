import { ChevronDownIcon } from "lucide-react";
import { Button } from "./button";
import { Label } from "./label";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Calendar } from "./calendar";
import { Input } from "./input";
import React from "react";

interface Calendar24Props {
  deadline: string; // full deadline string
  onDeadlineChange: (deadline: string) => void;
}

export function Calendar24({ deadline, onDeadlineChange }: Calendar24Props) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(deadline ? new Date(deadline) : undefined)
  const [time, setTime] = React.useState(deadline ? new Date(deadline).toLocaleTimeString('en-GB', { hour12: false }) : '10:30:00')

  React.useEffect(() => {
    if (date && time) {
      const isoString = `${date.toISOString().split('T')[0]}T${time}`
      onDeadlineChange(isoString)
    }
  }, [date, time, onDeadlineChange])

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="date-picker" className="px-1">Deadline Date</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" id="date-picker" className="w-32 justify-between font-normal">
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(selectedDate: Date | undefined) => {
                setDate(selectedDate)
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="time-picker" className="px-1">Deadline Time</Label>
        <Input
          type="time"
          id="time-picker"
          step="1"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  )
}
