import { AbsentModal } from "@/components/modals/AbsentModal";
import { StudentModal } from "@/components/modals/StudentModal";

export const ModalProvider = () => {
  return (
    <>
      <AbsentModal />
      <StudentModal />
    </>
  );
};
