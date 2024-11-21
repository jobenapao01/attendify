"use client";

import { Student, studentSchema } from "@/schemas/student-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useStudent } from "@/hooks/stores/useStudentStore";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CreateStudentFormProps {
  onClose: () => void; // Function to close the edit form
}

export const CreateStudentForm = ({ onClose }: CreateStudentFormProps) => {
  const { onSave } = useStudent();

  const router = useRouter();

  const form = useForm<Student>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      id: "",
      name: "",
      course: "",
    },
  });

  const onSubmit = (values: Student) => {
    const newStudent = {
      ...values,
      id: uuidv4(),
    };

    const existingStudents = sessionStorage.getItem("students");

    let studentsArray: Student[] = [];

    if (existingStudents) {
      try {
        const parsedStudents = JSON.parse(existingStudents);

        if (Array.isArray(parsedStudents)) {
          studentsArray = parsedStudents;
        }
      } catch (error) {
        console.error("Error parsing students from session storage:", error);
      }
    }

    studentsArray.push(newStudent);

    sessionStorage.setItem("students", JSON.stringify(studentsArray));

    onSave(newStudent);
    toast.success("Student created.");
    router.refresh();
    form.reset();
    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Input Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course</FormLabel>
              <FormControl>
                <Input placeholder="Input Course" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant={"custom"}>
          Create
        </Button>
      </form>
    </Form>
  );
};
