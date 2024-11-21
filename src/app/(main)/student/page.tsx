"use client";

import { PageHeader } from "@/components/layouts/PageHeader";
import { DataTable } from "@/components/ui/data-table";
import { studentColumns } from "@/data/student-columns";

export default function StudentPage() {
  const getStudentsFromSessionStorage = () => {
    const existingStudents = sessionStorage.getItem("students");

    if (!existingStudents) return [];

    try {
      const parsedStudents = JSON.parse(existingStudents);
      return Array.isArray(parsedStudents) ? parsedStudents : [];
    } catch (error) {
      console.error("Error parsing students from session storage:", error);
      return [];
    }
  };

  const studentsData = getStudentsFromSessionStorage();

  return (
    <div className="h-full flex flex-col py-4">
      <PageHeader
        headerText="Student Records"
        btnText="Add student"
        modalType="student"
      />
      <DataTable
        columns={studentColumns}
        data={studentsData}
        filterKey="name"
      />
    </div>
  );
}
