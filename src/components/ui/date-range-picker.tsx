import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DateRange as OriginalDateRange } from "react-day-picker";

export type DateRange = {
  from?: Date | undefined;
  to?: Date | undefined;
};

interface DateRangePickerFieldProps {
  control: any; // Replace with the appropriate type for your form control
  name: string;
  defaultValue?: DateRange;
  onDateRangeChange?: (from: Date | undefined, to: Date | undefined) => void;
}

export const DateRangePickerField: React.FC<DateRangePickerFieldProps> = ({
  control,
  name,
  defaultValue,
  onDateRangeChange,
}) => {
  const today = new Date();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Start and End Date</FormLabel>
          <Popover modal={true}>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !field.value.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value.from ? (
                  field.value.to ? (
                    <>
                      {format(field.value.from, "LLL dd, y")} -{" "}
                      {format(field.value.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(field.value.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={field.value.from || defaultValue?.from}
                selected={{
                  from: field.value.from,
                  to: field.value.to,
                }}
                onSelect={(range) => {
                  field.onChange(range);
                  if (range) {
                    if (onDateRangeChange) {
                      onDateRangeChange(range.from, range.to);
                    }
                  }
                }}
                numberOfMonths={2}
                disabled={{ before: today }}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
