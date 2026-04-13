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
  theme = "white",
}: {
  date: string;
  setDate: any;
  time: string;
  setTime: any;
  theme?: "white" | "orange";
}) {
  const [open, setOpen] = useState(false);
  const themes = {
    white: {
      border: "",
      background: "bg-white",
      text: "text-slate-700",
    },
    orange: {
      border: "border-orange-800",
      background: "bg-orange-900",
      text: "text-orange-200",
    },
  };

  const current = themes[theme];

  return (
    <div className={`flex flex-row gap-4 w-full ${current.text}`}>
      <div className="flex-1">
        <label htmlFor="" className="pl-1 font-bold">
          Date
        </label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className={`${current.background} ${current.border} w-full justify-between tracking-wider`}
            >
              {date ?? "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={new Date(date)}
              captionLayout="label"
              onSelect={(selectedDate) => {
                setDate(selectedDate?.toLocaleDateString("en-ca"));
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex-1">
        <label htmlFor="" className="font-bold pl-1">
          Time
        </label>
        <Input
          type="time"
          id="time-picker"
          step="1"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className={`${current.background} ${current.border} appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none`}
        />
      </div>
    </div>
  );
}

export default DateAndTime;
