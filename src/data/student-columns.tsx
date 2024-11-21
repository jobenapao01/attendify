"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TableActions } from "@/components/TableActions";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
export type StudentType = {
  id: string;
  name: string;
  course: string;
};

export const studentColumns: ColumnDef<StudentType>[] = [
  {
    accessorKey: "id",
    size: 10,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          #
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "course",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Course
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <TableActions modalType="student" id={row.original.id} />
    ),
  },
];
