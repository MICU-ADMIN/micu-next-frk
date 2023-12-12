"use client";

import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Course } from "@/_types/dbTypes";
import Button from "@/app/components/Elements/Button/Button";
import { Upload } from "react-feather";
import dynamic from "next/dynamic";
import { requestHandler } from "@/app/_helpers/web/requestHandler";
import { handleErrors } from "@/app/_helpers/web/formatters";
import Spinner from "@/app/components/Elements/Spinner/Spinner";

const FileSelectorModal = dynamic(() => import("@/app/components/_Uploads/FileSelectorModal"), { ssr: false, loading: () => <Spinner /> });

interface ImageFormProps {
  initialData: Course;
  setCourse: React.Dispatch<React.SetStateAction<Course>>;
  courseId: string;
}

export const ImageForm = ({ initialData, courseId, setCourse }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showFileSelector, setShowFileSelector] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleEdit = () => (!loading ? setIsEditing((current) => !current) : null);

  const onSubmit = async (imageUrl: string) => {
    try {
      setLoading(true);
      console.log("imageUrl", imageUrl, initialData);
      const res = await requestHandler({ type: "put", route: "courses", body: { ...initialData, imageUrl } });
      setLoading(false);
      if (res?.errors) return handleErrors(res);
      toast.success("Course updated");
      toggleEdit();
      setCourse((prev) => ({ ...prev, imageUrl: imageUrl }));
    } catch {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  if (!initialData) return null;

  return (
    <>
      {showFileSelector && (
        <FileSelectorModal
          allowMultiple={false}
          allowedTypes={["images"]}
          close={() => setShowFileSelector(false)}
          onFileSelect={(file) => {
            onSubmit(file.url);
            setShowFileSelector(false);
          }}
        />
      )}
      <div className="mt-6 border bg-blue-50 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
          Course image
          <Button onClick={toggleEdit} variant="icon">
            <div className="flex flex-row items-center">
              {isEditing && <>Cancel</>}
              {!isEditing && !initialData.imageUrl && (
                <>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add an image
                </>
              )}
              {!isEditing && initialData.imageUrl && (
                <>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit image
                </>
              )}
            </div>
          </Button>
        </div>
        {!isEditing &&
          (!initialData.imageUrl ? (
            <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
              <ImageIcon className="h-10 w-10 text-slate-500" />
            </div>
          ) : (
            <div className="relative aspect-video mt-2">
              <Image alt="Upload" fill className="object-cover rounded-md" src={initialData.imageUrl} />
            </div>
          ))}
        {isEditing && (
          <div
            onClick={() => setShowFileSelector(true)}
            className="flex items-center justify-center h-40  rounded-md border-dashed border-2 border-gray-200 flex-col gap-y-2 hover:border-indigo-500 hover:text-indigo-500 cursor-pointer"
          >
            {/* <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          /> */}
            <div className="flex items-center justify-center flex-col">
              <Upload className="h-10 w-10 text-indigo-500" />
              <p>Select Image</p>
            </div>
            {loading && (
              <div>
                <Spinner />
                <p>Saving</p>
              </div>
            )}

            <div className="text-xs text-muted-foreground mt-4">16:9 aspect ratio recommended</div>
          </div>
        )}
      </div>
    </>
  );
};
