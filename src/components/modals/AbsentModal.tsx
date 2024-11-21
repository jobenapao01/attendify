"use client";

import { useAbsentModal } from "@/hooks/useOpenAbsentModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { AbsentApplicationForm } from "../forms/AbsentApplicationForm";
import { AbsentApplication } from "@/schemas/absent-application-schema";

export const AbsentModal = () => {
  const { isOpen, onClose, id } = useAbsentModal();

  const isEditMode = id!!;

  const headerText = isEditMode ? "Edit Application" : "Send Application";

  const getAbsentApplicationFromSessionStorage = (id: string) => {
    const existingAbsents = sessionStorage.getItem("absents");

    if (!existingAbsents) return null;

    try {
      const parsedAbsents = JSON.parse(existingAbsents);

      if (!Array.isArray(parsedAbsents)) return null;

      return (
        parsedAbsents.find(
          (absent: AbsentApplication) => absent.studentId === id
        ) || null
      );
    } catch (error) {
      console.error("Error parsing absents from session storage:", error);
    }
  };

  const absentApplicationData: AbsentApplication =
    getAbsentApplicationFromSessionStorage(id!);

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent>
        <DialogTitle>{headerText}</DialogTitle>
        <AbsentApplicationForm absentData={absentApplicationData} />
      </DialogContent>
    </Dialog>
  );
};
