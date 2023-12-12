"use client";

import { Pencil, PlusCircle, ImageIcon, File, Loader2, X, Upload } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Course, CourseAttachment } from "@/_types/dbTypes";
import Button from "@/app/components/Elements/Button/Button";
import dynamic from "next/dynamic";
const FileSelectorModal = dynamic(() => import("@/app/components/_Uploads/FileSelectorModal"), { ssr: false });

interface AttachmentFormProps {
  initialData: Course;
  attachments: CourseAttachment[];
  setAttachments: React.Dispatch<React.SetStateAction<CourseAttachment[]>>;
  courseId: number;
}

// const formSchema = z.object({
//   url: z.string().min(1),
// });

export const AttachmentForm = ({ initialData, attachments, courseId }: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [showFileSelector, setShowFileSelector] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: any) => {
    // try {
    //   await axios.post(`/api/courses/${courseId}/attachments`, values);
    //   toast.success("Course updated");
    //   toggleEdit();
    //   router.refresh();
    // } catch {
    //   toast.error("Something went wrong");
    // }
  };

  const onDelete = async (id: number) => {
    try {
      setDeletingId(id);
      // await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      {showFileSelector && (
        <FileSelectorModal
          allowMultiple
          allowedTypes={["images", "videos", "audio", "other"]}
          close={() => setShowFileSelector(false)}
          onFileSelect={(file) => {
            onSubmit(file.url);
            setShowFileSelector(false);
          }}
        />
      )}
      <div className="mt-6 border bg-blue-50 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
          Course attachments
          <Button onClick={toggleEdit} variant="icon">
            <div className="flex items-center ">
              {isEditing && <>Cancel</>}
              {!isEditing && (
                <>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add attachments (optional)
                </>
              )}
            </div>
          </Button>
        </div>
        {!isEditing && (
          <>
            {attachments.length === 0 && <p className="text-sm mt-2 text-slate-500 italic">No attachments yet</p>}
            {attachments.length > 0 && (
              <div className="space-y-2">
                {attachments.map((attachment) => (
                  <div key={attachment.id} className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md">
                    <File className="h-4 w-4 mr-2 flex-shrink-0" />
                    <p className="text-xs line-clamp-1">{attachment.name}</p>
                    {deletingId === attachment.id && (
                      <div>
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    )}
                    {deletingId !== attachment.id && (
                      <button
                        type="button"
                        onClick={() => onDelete(attachment.id)}
                        className="ml-auto hover:opacity-75 transition"
                        aria-label="Delete attachment"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        {isEditing && (
          <div>
            {/* <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          /> */}

            <div
              onClick={() => setShowFileSelector(true)}
              className="flex items-center justify-center h-40  rounded-md border-dashed border-2 border-gray-200 flex-col gap-y-2 hover:border-indigo-500 hover:text-indigo-500 cursor-pointer"
            >
              <div className="flex items-center justify-center flex-col">
                <Upload className="h-10 w-10 text-indigo-500" />
                <p>Select Attachments</p>
              </div>
              <div className="text-xs text-muted-foreground mt-4">Add anything your students might need to complete the course.</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
