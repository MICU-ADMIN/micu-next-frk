"use client";

import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@/_types/dbTypes";
import Button from "@/app/components/Elements/Button/Button";
import dynamic from "next/dynamic";
import { requestHandler } from "@/app/_helpers/web/requestHandler";
import { handleErrors, handleSuccess } from "@/app/_helpers/web/formatters";
import Spinner from "@/app/components/Elements/Spinner/Spinner";
const FormGroup = dynamic(() => import("@/app/components/Elements/Form/FormGroup"), { loading: () => <Spinner /> });

interface DescriptionFormProps {
  initialData: Course;
  setCourse: React.Dispatch<React.SetStateAction<Course>>;
  courseId: string;
}

export const DescriptionForm = ({ initialData, courseId, setCourse }: DescriptionFormProps) => {
  const [description, setDescription] = useState(initialData?.description || "");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (description: string) => {
    try {
      setLoading(true);
      const res = await requestHandler({ type: "put", route: "courses", body: { ...initialData, description } });
      setLoading(false);
      if (res?.errors) return handleErrors(res);
      handleSuccess("Course updated");
      toggleEdit();
      setCourse((prev) => ({ ...prev, description: description }));
    } catch {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };
  if (!initialData) return null;

  return (
    <div className="mt-6 border bg-blue-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course description
        <Button onClick={toggleEdit} variant="icon">
          <div className="flex flex-row items-center">
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit description
              </>
            )}
          </div>
        </Button>
      </div>
      {!isEditing && (
        <p
          dangerouslySetInnerHTML={{ __html: initialData.description || "No description" }}
          className={`text-sm mt-2 ${!initialData.description && "text-slate-500 italic"}`}
        ></p>
      )}
      {isEditing && (
        <>
          <FormGroup
            className="w-full"
            altSetModel={true}
            errors={errors}
            setErrors={setErrors}
            fields={[
              {
                name: "description",
                placeholder: "description",
                type: "editor",
                maxLength: 3000,
                autoFocus: true,
              },
            ]}
            model={{ description }}
            setModel={(model) => {
              setDescription(model.description);
            }}
          />
          <Button disabled={loading || errors?.title} type="submit" onClick={() => onSubmit(description)}>
            Save
          </Button>
        </>
      )}
    </div>
  );
};
