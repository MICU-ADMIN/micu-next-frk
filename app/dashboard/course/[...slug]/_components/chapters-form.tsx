"use client";

import { Loader2, PlusCircle } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Course, CourseChapter } from "@/_types/dbTypes";
import Button from "@/app/components/Elements/Button/Button";

import { requestHandler } from "@/app/_helpers/web/requestHandler";
import { handleErrors, handleSuccess } from "@/app/_helpers/web/formatters";
import dynamic from "next/dynamic";
import Spinner from "@/app/components/Elements/Spinner/Spinner";
const FormGroup = dynamic(() => import("@/app/components/Elements/Form/FormGroup"), { loading: () => <Spinner /> });
const ChaptersList = dynamic(() => import("./chapters-list"), { loading: () => <Spinner /> });

interface ChaptersFormProps {
  initialData: Course;
  chapters: CourseChapter[];
  setChapters: React.Dispatch<React.SetStateAction<CourseChapter[]>>;
  courseId: number;
  establishmentName: string;
}

export const ChaptersForm = ({ initialData, courseId, chapters, setChapters, establishmentName }: ChaptersFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [title, setTitle] = useState("");
  const [curChapers, setCurChapters] = useState(chapters);
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };

  const router = useRouter();

  const onSubmit = async () => {
    try {
      if (!title) return;
      setLoading(true);
      const res = await requestHandler({ type: "post", route: `courseChapters`, body: { courseId, title, positionInCourse: curChapers.length + 1 } });
      setLoading(false);
      if (res?.errors) return handleErrors(res);
      handleSuccess("Course chapter created");
      toggleCreating();

      setCurChapters((prev) => [...prev, { id: res.id, title, positionInCourse: curChapers.length + 1 }]);
      setChapters((prev) => [...prev, { id: res.id, title, positionInCourse: curChapers.length + 1 }]);
    } catch {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[], cb) => {
    setCurChapters((prev) => {
      const newChapters = [...prev];
      updateData.forEach((item) => {
        const index = newChapters.findIndex((chapter) => chapter.id == item.id);
        newChapters[index].positionInCourse = item.position;
      });
      return newChapters;
    });

    const res = await requestHandler({ type: "put", route: "courseChapters/reorder", body: { data: updateData } });

    if (res?.success) {
      setChapters(curChapers);
    }
    //revert changes if error
    else {
      setChapters(chapters);
      setCurChapters(chapters);
    }
  };

  const onEdit = (id: string) => {
    router.push(`/dashboard/courses/chapter/${establishmentName}?id=${id}`);
  };

  return (
    <div className="relative mt-6 border bg-blue-50 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Course chapters
        <Button onClick={toggleCreating} variant="icon">
          <div className="flex flex-row items-center">
            {isCreating ? (
              <>Cancel</>
            ) : (
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add a chapter
              </>
            )}
          </div>
        </Button>
      </div>
      {isCreating ? (
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
                maxLength: 50,
                autoFocus: true,
              },
            ]}
            model={{ title }}
            setModel={(model) => {
              setTitle(model.title);
            }}
          />
          <Button disabled={loading || errors?.title} type="submit" onClick={() => onSubmit()}>
            Save
          </Button>
        </>
      ) : (
        <div className={`text-sm mt-2 ${!chapters && "text-slate-500 italic"}`}>
          {!chapters && "No chapters"}
          <ChaptersList onEdit={onEdit} onReorder={onReorder} items={chapters || curChapers} />
        </div>
      )}

      {!isCreating && <p className="text-xs text-muted-foreground mt-4">Drag and drop to reorder the chapters</p>}
    </div>
  );
};
