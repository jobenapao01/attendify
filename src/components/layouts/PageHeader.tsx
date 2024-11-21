"use client";

import { useAbsentModal } from "@/hooks/useOpenAbsentModal";
import { Button } from "../ui/button";
import { useStudentModal } from "@/hooks/useOpenStudentModal";

type PageHeaderProps = {
  headerText: string;
  btnText: string;
  modalType: "absent" | "student";
  isBtnVisible?: boolean;
};

export const PageHeader = ({
  btnText,
  headerText,
  modalType,
  isBtnVisible = true,
}: PageHeaderProps) => {
  const { onOpen: openAbsent } = useAbsentModal();
  const { onOpen: openStudent } = useStudentModal();

  const handleClick = (modalType: string) => {
    if (modalType === "absent") {
      openAbsent();
    }

    if (modalType === "student") {
      openStudent();
    }
  };

  return (
    <div className="w-full flex justify-between items-center px-4 mb-4">
      <h1 className="text-[#002971] text-2xl font-semibold">{headerText}</h1>
      {isBtnVisible && (
        <Button
          onClick={() => handleClick(modalType)}
          className="text-sm bg-blue-600 p-4 hover:bg-blue-700"
        >
          {btnText}
        </Button>
      )}
    </div>
  );
};
