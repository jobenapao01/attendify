"use client";

import { Edit, MoreHorizontal, Send, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRouter } from "next/navigation";
import { useAbsentModal } from "@/hooks/useOpenAbsentModal";
import { useStudentModal } from "@/hooks/useOpenStudentModal";
import { toast } from "sonner";

type TableActionsProps = {
  id: string;
  modalType: "absent" | "student";
};

export const TableActions = ({ id, modalType }: TableActionsProps) => {
  const { onOpen: openAbsent } = useAbsentModal();
  const { onOpen: openStudent } = useStudentModal();

  const router = useRouter();

  //const { onOpen: onOpenDelete } = useDeleteModal();
  const handleClick = (id: string, type: "absent" | "student") => {
    if (type === "absent") {
      openAbsent(id);
    }
    if (type === "student") {
      openStudent(id);
    }
  };

  const handleDelete = () => {
    const students = JSON.parse(sessionStorage.getItem("students") || "[]");
    const absents = JSON.parse(sessionStorage.getItem("absents") || "[]");

    const updatedStudents = students.filter(
      (student: { id: string }) => student.id !== id
    );

    const updatedAbsents = absents.filter(
      (absent: { studentId: string }) => absent.studentId !== id
    );

    sessionStorage.setItem("students", JSON.stringify(updatedStudents));
    sessionStorage.setItem("absents", JSON.stringify(updatedAbsents));
    toast.success("Student deleted successfully");
    router.refresh();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="p-0 size-8" variant="ghost">
          <span className="sr-only">open menu</span>
          <MoreHorizontal className="text-black size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => handleClick(id, modalType)}>
          {modalType === "student" && (
            <>
              <Edit className="mr-2 size-4" />
              Edit
            </>
          )}

          {modalType === "absent" && (
            <>
              <Send className="mr-2 size-4" />
              Send Application
            </>
          )}
        </DropdownMenuItem>
        {modalType === "student" && (
          <>
            {" "}
            <DropdownMenuItem onClick={handleDelete}>
              <div className="flex text-rose-500 hover:text-rose-600">
                <Trash className="mr-2 size-4" />
                Delete
              </div>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
