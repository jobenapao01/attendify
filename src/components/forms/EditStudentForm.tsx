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
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface EditStudentFormProps {
  student: Student; // The student data to edit
  onClose: () => void; // Function to close the edit form
}

export const EditStudentForm: React.FC<EditStudentFormProps> = ({
  student,
  onClose,
}) => {
  const { onSave } = useStudent();

  const router = useRouter();

  const form = useForm<Student>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      id: student.id, // Set the default id
      name: student.name,
      course: student.course,
    },
  });

  const onSubmit = (values: Student) => {
    const updatedStudent = {
      ...values,
      id: student.id, // Keep the same id
    };

    // Update the student in session storage
    const existingStudents = sessionStorage.getItem("students");
    let studentsArray: Student[] = [];

    if (existingStudents) {
      try {
        const parsedStudents = JSON.parse(existingStudents);
        if (Array.isArray(parsedStudents)) {
          studentsArray = parsedStudents.map(
            (s) => (s.id === updatedStudent.id ? updatedStudent : s) // Update the student if the id matches
          );
        }
      } catch (error) {
        console.error("Error parsing students from session storage:", error);
      }
    }

    sessionStorage.setItem("students", JSON.stringify(studentsArray)); // Save updated array

    onSave(updatedStudent); // Call the onSave function
    toast.success("Student updated.");
    form.reset(); // Reset the form
    router.refresh();
    onClose(); // Close the edit form
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
          Update
        </Button>
      </form>
    </Form>
  );
};
