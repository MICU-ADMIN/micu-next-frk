"use client";

import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Elements/Button/Button";
import { Popover } from "@headlessui/react";
import { requestHandler } from "@/app/_helpers/web/requestHandler";
import { Course } from "@/_types/dbTypes";
import { handleErrors, handleSuccess } from "@/app/_helpers/web/formatters";
import DeleteModal from "@/app/components/Modals/DeleteModal/DeleteModal";

// import { Button } from "@/components/ui/button";
// import { ConfirmModal } from "@/components/modals/confirm-modal";
// import { useConfettiStore } from "@/hooks/use-confetti-store";

interface ActionsProps {
  disabled: boolean;
  course: Course;
  setCourse: React.Dispatch<React.SetStateAction<Course>>;
  establishmentName: string;
}

export const Actions = ({ disabled, course, setCourse, establishmentName }: ActionsProps) => {
  const router = useRouter();
  // const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const res = await requestHandler({ type: "put", route: `courses`, body: { ...course, isPublished: course.isPublished ? false : true } });
      if (res?.success) {
        handleSuccess("Course updated");
        return setCourse((prev) => ({ ...prev, isPublished: course.isPublished ? false : true }));
      }

      handleErrors(res);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      const res = await requestHandler({ type: "delete", route: `courses`, body: { id: course.id } });
      if (res?.success) {
        toast.success("Course deleted");
        return router.push("/dashboard/courses/" + establishmentName);
      }

      handleErrors(res);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-x-2">
        <Button
          title={disabled ? "Complete all fields before being able to publish" : ""}
          onClick={onClick}
          disabled={disabled || isLoading}
          variant="secondary"
        >
          {course?.isPublished ? "Unpublish" : "Publish"}
        </Button>

        <Button disabled={isLoading} variant="icon" onClick={() => setShowDeleteModal(true)}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      {showDeleteModal && (
        <DeleteModal deleteText="Are you sure you want to delete this course?" close={() => setShowDeleteModal(false)} deleteAction={onDelete} />
      )}
    </>
  );
};
