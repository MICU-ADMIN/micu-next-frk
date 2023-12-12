"use client";

import { Pencil } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@/_types/dbTypes";
import Button from "@/app/components/Elements/Button/Button";
import dynamic from "next/dynamic";
import Spinner from "@/app/components/Elements/Spinner/Spinner";
import { handleErrors, handleSuccess } from "@/app/_helpers/web/formatters";
import { requestHandler } from "@/app/_helpers/web/requestHandler";

const FormGroup = dynamic(() => import("@/app/components/Elements/Form/FormGroup"), { ssr: false, loading: () => <Spinner /> });

interface PriceFormProps {
  initialData: Course;
  setCourse: React.Dispatch<React.SetStateAction<Course>>;
  courseId: string;
}

export const PriceForm = ({ initialData, courseId, setCourse }: PriceFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [model, setModel] = useState<any>({ price: initialData?.price, type: initialData?.type });
  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const res = await requestHandler({ type: "put", route: "courses", body: { ...initialData, price: model.price, type: model.type } });
      setLoading(false);
      if (res?.errors) return handleErrors(res);
      handleSuccess("Course updated");
      toggleEdit();
      setCourse((prev) => ({ ...prev, price: model.price, type: model.type }));
    } catch {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="mt-6 border bg-blue-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course price (£)
        <Button onClick={toggleEdit} variant="icon">
          <div className="flex items-center">
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                {initialData?.price ? "Edit " : "Add "}
                price (optional)
              </>
            )}
          </div>
        </Button>
      </div>
      {!isEditing && <p className={`text-sm mt-2 ${!initialData?.price && "text-slate-500 italic"}`}>{initialData?.price ? initialData.price : "No price"}</p>}
      {isEditing && (
        <>
          <FormGroup
            className="w-full"
            altSetModel={true}
            errors={errors}
            setErrors={setErrors}
            fields={[
              {
                name: "type",
                placeholder: "Type",
                type: "select",
                options: [
                  { label: "Free", value: "free" },
                  { label: "Paid", value: "paid" },
                ],
                required: true,
                autoFocus: true,
              },
              {
                name: "price",
                placeholder: "Price",
                type: "input",
                subType: "number",
                max: 2000,
                autoFocus: true,
                hidden: ({ model }: any) => model.type === "free",
              },
            ]}
            model={model}
            setModel={(model) => {
              setModel(model);
            }}
          />
          <Button loading={loading} disabled={loading || errors?.price} type="submit" onClick={() => onSubmit()}>
            Save
          </Button>
        </>
      )}
    </div>
  );
};
