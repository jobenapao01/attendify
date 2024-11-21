"use client";

import { DashboardCard } from "@/components/cards/DashboardCard";

import { AbsentApplication } from "@/schemas/absent-application-schema";

export default function DashboardPage() {
  const countTotalStudents = () => {
    const students = JSON.parse(sessionStorage.getItem("students") || "[]");
    return students.length;
  };
  const countTotalAbsents = () => {
    const absents = JSON.parse(sessionStorage.getItem("absents") || "[]");
    return absents.filter(
      (absent: AbsentApplication) => absent.status === "Approved"
    ).length;
  };

  const totalStudents = countTotalStudents();
  const totalAbsents = countTotalAbsents();
  return (
    <div className="h-full flex px-8">
      <div className="flex gap-8 flex-col md:flex-row ">
        <DashboardCard
          cardTitle="Total Number of Students"
          total={totalStudents}
        />
        <DashboardCard
          cardTitle="Total Number of Absents"
          total={totalAbsents}
          className="bg-green-100"
        />
      </div>
    </div>
  );
}
