"use client";

import { Edit, MoreHorizontal, Send, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRouter } from "next/navigation";

import {
  AbsentApplication,
  AbsentApplicationStatus,
} from "@/schemas/absent-application-schema";

import { toast } from "sonner";

type StatusActionsProps = {
  id: string;
  status: AbsentApplicationStatus;
};

export const StatusActions = ({ id, status }: StatusActionsProps) => {
  const router = useRouter();

  const statusEnums: AbsentApplicationStatus[] = ["In Progress", "Approved"];

  const absents = JSON.parse(sessionStorage.getItem("absents") || "[]");
  const hasAbsents = absents.find(
    (absent: AbsentApplication) => absent.studentId === id
  );

  if (!hasAbsents) {
    return null;
  }

  const handleStatusChange = (newStatus: AbsentApplicationStatus) => {
    if (absents.length === 0) {
      toast.error("No absent application found.");
      return;
    }

    const absentToUpdate = absents.find(
      (absent: AbsentApplication) => absent.studentId === id
    );

    if (!absentToUpdate) {
      toast.error("Please send an absent applciation first");
      return;
    }

    const updatedAbsents = absents.map((absent: AbsentApplication) => {
      if (absent.studentId === id) {
        return { ...absent, status: newStatus };
      }
      return absent;
    });

    sessionStorage.setItem("absents", JSON.stringify(updatedAbsents));
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="p-4 size-8 w-fit"
          variant={status === "In Progress" ? "custom" : "customSecondary"}
        >
          <span className="sr-only">open menu</span>
          <p>{status}</p>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {statusEnums.map((statusEnum: AbsentApplicationStatus) => (
          <DropdownMenuItem
            onClick={() => handleStatusChange(statusEnum)}
            key={statusEnum}
          >
            {statusEnum}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
