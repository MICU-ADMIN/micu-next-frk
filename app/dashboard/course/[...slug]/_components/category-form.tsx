"use client";

import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@/_types/dbTypes";
import FormGroup from "@/app/components/Elements/Form/FormGroup";
import Button from "@/app/components/Elements/Button/Button";

interface CategoryFormProps {
  initialData: Course;
  courseId: string;
  options: { label: string; value: string }[];
}

// const formSchema = z.object({
//   categoryId: z.string().min(1),
// });

export const CategoryForm = ({ initialData, courseId, options }: CategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [categoryId, setCatId] = useState(initialData?.categoryId || "");
  const [loading, setLoading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  // const onSubmit = async (values: z.infer<typeof formSchema>) => {
  //   try {
  //     await axios.patch(`/api/courses/${courseId}`, values);
  //     toast.success("Course updated");
  //     toggleEdit();
  //     router.refresh();
  //   } catch {
  //     toast.error("Something went wrong");
  //   }
  // }

  const selectedOption = options.find((option) => option.value === initialData.categoryId);

  return (
    <div className="mt-6 border bg-blue-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course category
        <Button onClick={toggleEdit} variant="icon">
          <div className="flex flex-row items-center">
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit category
              </>
            )}
          </div>
        </Button>
      </div>
      {!isEditing && <p className={`text-sm mt-2 ${!initialData?.categoryId && "text-slate-500 italic"}`}>{selectedOption?.label || "No category"}</p>}
      {isEditing && (
        <>
          <FormGroup
            className="w-full"
            altSetModel={true}
            errors={errors}
            setErrors={setErrors}
            fields={[
              {
                name: "categoryId",
                placeholder: "Category",
                type: "select",
                options: options,
              },
            ]}
            model={{ categoryId }}
            setModel={(model) => {
              // setDescription(model.description);
            }}
          />
          <Button disabled={loading || errors?.title} type="submit" onClick={() => onSubmit(categoryId)}>
            Save
          </Button>
        </>
      )}
    </div>
  );
};
