"use client";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Elements/Button/Button";
import dynamic from "next/dynamic";
import { requestHandler } from "@/app/_helpers/web/requestHandler";
import { Course } from "@/_types/dbTypes";
import { handleErrors, handleSuccess } from "@/app/_helpers/web/formatters";
import Spinner from "@/app/components/Elements/Spinner/Spinner";
const FormGroup = dynamic(() => import("@/app/components/Elements/Form/FormGroup"), { loading: () => <Spinner /> });

interface TitleFormProps {
  initialData: Course;
  courseId: number;
  setCourse: React.Dispatch<React.SetStateAction<Course>>;
}

export const TitleForm = ({ initialData, setCourse, courseId }: TitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(initialData?.title);
  const [errors, setErrors] = useState<any>({});

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (title: string) => {
    try {
      setLoading(true);
      const res = await requestHandler({ type: "put", route: "courses", body: { ...initialData, title } });
      setLoading(false);
      if (res?.errors) return handleErrors(res);
      handleSuccess("Course updated");
      toggleEdit();
      setCourse((prev) => ({ ...prev, title: title }));
    } catch {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="mt-6 border bg-blue-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course title
        <Button onClick={toggleEdit} variant="icon">
          <div className="flex items-center">
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit title
              </>
            )}
          </div>
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{initialData?.title}</p>}
      {isEditing && (
        <>
          <FormGroup
            className="w-full"
            altSetModel={true}
            errors={errors}
            setErrors={setErrors}
            fields={[
              {
                name: "title",
                placeholder: "Title",
                type: "input",
                required: true,
                maxLength: 50,
                autoFocus: true,
              },
            ]}
            model={{ title }}
            setModel={(model) => {
              setTitle(model.title);
            }}
          />
          <Button loading={loading} disabled={loading || errors?.title} type="submit" onClick={() => onSubmit(title)}>
            Save
          </Button>
        </>
      )}
    </div>
  );
};
