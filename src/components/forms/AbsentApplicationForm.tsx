"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  AbsentApplication,
  absentApplicationSchema,
} from "@/schemas/absent-application-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { DateRangePickerField } from "../ui/date-range-picker";
import { Button } from "../ui/button";
import { useAbsentModal } from "@/hooks/useOpenAbsentModal";
import { useAbsentApplication } from "@/hooks/stores/useAbsentStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type AbsentApplicationProps = {
  absentData?: AbsentApplication;
};

export const AbsentApplicationForm = ({
  absentData,
}: AbsentApplicationProps) => {
  const { id, onClose } = useAbsentModal();
  const { onSave } = useAbsentApplication();
  const router = useRouter();

  const form = useForm<AbsentApplication>({
    resolver: zodResolver(absentApplicationSchema),
    defaultValues: {
      dateRange: {
        from: absentData?.dateRange?.from
          ? new Date(absentData.dateRange.from)
          : new Date(),
        to: absentData?.dateRange?.to
          ? new Date(absentData.dateRange.to)
          : new Date(),
      },
      numberOfDays: absentData?.numberOfDays || 0,
      reason: absentData?.reason || "",
      studentId: absentData?.studentId || "",
      status: absentData?.status || "In Progress",
    },
  });

  const onSubmit = (values: AbsentApplication) => {
    const newAbsentApplication = {
      ...values,
      studentId: id || "",
    };

    const existingAbsents = sessionStorage.getItem("absents");

    let absentsArray: AbsentApplication[] = [];

    if (existingAbsents) {
      try {
        const parsedAbsents = JSON.parse(existingAbsents);

        if (Array.isArray(parsedAbsents)) {
          absentsArray = parsedAbsents;
        }
      } catch (error) {
        console.error("Error parsing absents from session storage:", error);
      }
    }

    if (absentData) {
      const index = absentsArray.findIndex(
        (absent) => absent.studentId === absentData.studentId
      );
      if (index !== -1) {
        absentsArray[index] = newAbsentApplication;
      }
      toast.success("Absence Application Updated");
    } else {
      absentsArray.push(newAbsentApplication);
      toast.success("Absence Application Created");
    }
    onSave(newAbsentApplication);
    sessionStorage.setItem("absents", JSON.stringify(absentsArray));
    router.refresh();
    onClose();
  };

  const handleDateRangeChange = (
    from: Date | undefined,
    to: Date | undefined
  ) => {
    // Ensure from and to are valid Date objects
    console.log("DAte range from:", from);
    console.log("DAte range TO:", to);
    if (
      from instanceof Date &&
      !isNaN(from.getTime()) &&
      to instanceof Date &&
      !isNaN(to.getTime())
    ) {
      const diffTime = Math.abs(to.getTime() - from.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Calculate days
      form.setValue("numberOfDays", diffDays); // Update number of days
    } else {
      form.setValue("numberOfDays", 0); // Reset if no valid date range
      // }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <DateRangePickerField
              control={form.control}
              name="dateRange"
              defaultValue={{
                from: absentData?.dateRange?.from || new Date(),
                to: absentData?.dateRange?.to || new Date(),
              }}
              onDateRangeChange={(
                from: Date | undefined,
                to: Date | undefined
              ) => {
                handleDateRangeChange(from, to);
              }}
            />
          )}
        />

        <FormField
          control={form.control}
          name="numberOfDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel>No. of days</FormLabel>
              <FormControl>
                <Input placeholder="Number of days" {...field} readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Textarea placeholder="Reason for absence" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-x-2">
          <Button type="submit" variant={"custom"}>
            Submit
          </Button>
          <Button type="button" onClick={() => form.reset()}>
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
};
