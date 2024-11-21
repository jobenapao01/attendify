"use client";

import { PageHeader } from "@/components/layouts/PageHeader";
import { DataTable } from "@/components/ui/data-table";
import { absentColumns, AbsentType } from "@/data/absent-columns";
import { AbsentApplication } from "@/schemas/absent-application-schema";
import { Student } from "@/schemas/student-schema";

export default function AbsentPage() {
  const getStudentsAndAbsentsFromSessionStorage = () => {
    const existingStudents = sessionStorage.getItem("students");
    const existingAbsents = sessionStorage.getItem("absents");

    if (!existingStudents) return []; // Return empty if no students

    try {
      const parsedStudents = JSON.parse(existingStudents);
      const parsedAbsents = existingAbsents ? JSON.parse(existingAbsents) : []; // Handle case where absents might not exist
      const absentsArray = Array.isArray(parsedAbsents) ? parsedAbsents : [];

      const studentsWithAbsents = parsedStudents.map((student: Student) => {
        const absent =
          absentsArray.find(
            (absent: AbsentApplication) => absent.studentId === student.id
          ) || null; // Set absent to null if not found

        const absenceReason = absent ? absent.reason : null;
        const numberOfDays = absent ? absent.numberOfDays : null;
        const status = absent ? absent.status : "In Progress";
        return { ...student, absenceReason, numberOfDays, status }; // Combine student with their absence
      });

      return Array.isArray(studentsWithAbsents) ? studentsWithAbsents : [];
    } catch (error) {
      console.error("Error parsing data from session storage:", error);
      return [];
    }
  };

  const studentsAbsentData = getStudentsAndAbsentsFromSessionStorage();

  return (
    <div className="h-full flex flex-col px-4">
      <PageHeader
        headerText="Absence Records"
        btnText="Send application"
        modalType="absent"
        isBtnVisible={false}
      />
      <DataTable
        columns={absentColumns}
        data={studentsAbsentData}
        filterKey="name"
      />
    </div>
  );
}
