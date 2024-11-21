"use client";

import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

import { useStudentModal } from "@/hooks/useOpenStudentModal";
import { CreateStudentForm } from "../forms/CreateStudentForm";
import { EditStudentForm } from "../forms/EditStudentForm";
import { Student } from "@/schemas/student-schema";

export const StudentModal = () => {
  const { isOpen, onClose, id } = useStudentModal();

  const isEditMode = id!!;
  const headerText = isEditMode ? "Edit Student" : "Create Student";

  const getStudentsFromSessionStorage = (studentId: string): Student | null => {
    const existingStudents = sessionStorage.getItem("students");

    if (existingStudents) {
      try {
        const parsedStudents = JSON.parse(existingStudents);
        return (
          parsedStudents.find((student: Student) => student.id === studentId) ||
          null
        );
      } catch (error) {
        console.error("Error parsing students from session storage:", error);
      }
    }
    return null;
  };

  const studentData = getStudentsFromSessionStorage(id || "") || null;

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent>
        <DialogTitle>{headerText}</DialogTitle>
        {isEditMode && studentData ? (
          <EditStudentForm student={studentData} onClose={() => onClose()} />
        ) : (
          <CreateStudentForm onClose={() => onClose()} />
        )}
      </DialogContent>
    </Dialog>
  );
};
