import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function DateAndTime({
  date,
  setDate,
  time,
  setTime,
  timeClass,
  dateClass,
}: {
  date: Date;
  setDate: any;
  time: string;
  setTime: any;
  timeClass?: string;
  dateClass?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`flex flex-row gap-4 w-full text-black`}>
      <div className="flex-1">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className={`${dateClass} w-full justify-between font-bold tracking-wider`}
            >
              {date ? date.toLocaleDateString("en-ca") : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="label"
              onSelect={(selectedDate) => {
                // console.log(selectedDate?.toLocaleDateString("en-ca"));
                setDate(selectedDate);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex-1">
        <Input
          type="time"
          id="time-picker"
          step="1"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className={`bg-background ${timeClass} font-bold appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none`}
        />
      </div>
    </div>
  );
}

export default DateAndTime;
