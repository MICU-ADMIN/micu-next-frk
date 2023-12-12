"use client";
import IconBadge from "@/app/components/_Courses/IconBadge";
import { LayoutDashboard, ListChecks, CircleDollarSign, File } from "lucide-react";
import React from "react";
import { Actions } from "./_components/actions";
import { ChaptersForm } from "./_components/chapters-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { TitleForm } from "./_components/title-form";
import { Course, CourseAttachment, CourseChapter } from "@/_types/dbTypes";
import { PriceForm } from "./_components/price-form";
import { AttachmentForm } from "./_components/attachment-form";
import { Toaster } from "react-hot-toast";
import { Banner } from "@/app/components/_Courses/banner";
import { CategoryForm } from "./_components/category-form";

type CourseContainerProps = {
  data: { course: Course; attachments: CourseAttachment[]; chapters: CourseChapter[]; categories: any };
  searchParams: { id: string };
  completionText: string;
};

function CourseContainer({ data, searchParams }: CourseContainerProps) {
  const [course, setCourse] = React.useState<Course>(data.course);
  const [chapters, setChapters] = React.useState<CourseChapter[]>(data?.chapters || []);
  const [completionText, setCompletionText] = React.useState<string>("");
  const [attachments, setAttachments] = React.useState<CourseAttachment[]>(data?.attachments || []);
  const [categories, setCategories] = React.useState<any>(data?.categories || []);
  const [isComplete, setIsComplete] = React.useState(false);
  const [establishmentName, setEstablishmentName] = React.useState("");

  React.useEffect(() => {
    if (!course) return;
    setTimeout(() => {
      const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId,
        chapters.some((chapter) => chapter.isPublished),
      ];

      const totalFields = requiredFields.length;
      const completedFields = requiredFields.filter(Boolean).length;

      if (totalFields === completedFields) setIsComplete(true);
      else setIsComplete(false);

      const completionText = `(${completedFields}/${totalFields})`;
      setCompletionText(completionText);
    }, 0);
  }, [course, chapters]);

  React.useEffect(() => {
    //get last param of url
    const url = window.location.href;
    const urlArray = url.split("/");
    const name = urlArray[urlArray.length - 1].split("?")[0];
    setEstablishmentName(name);
  }, []);

  return (
    <>
      <Toaster />
      {!course?.isPublished && (
        <Banner
          label={`This course is unpublished. It will not be publically visible. ${!isComplete ? "Complete all fields before being able to publish." : ""} `}
        />
      )}

      <div className="p-6 mx-auto lg:min-w-[1200px] lg:w-[70vw] w-full relative">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700">Complete all fields {completionText}</span>
          </div>
          <Actions establishmentName={establishmentName} disabled={!isComplete} course={course} setCourse={setCourse} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} variant="indigo" />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <TitleForm initialData={course} courseId={course?.id} setCourse={setCourse} />
            <DescriptionForm initialData={course} courseId={course?.id} setCourse={setCourse} />
            <ImageForm initialData={course} courseId={course?.id} setCourse={setCourse} />

            <CategoryForm
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} variant="indigo" />
                <h2 className="text-xl">Course chapters</h2>
              </div>
              <ChaptersForm establishmentName={establishmentName} initialData={course} courseId={course?.id} chapters={chapters} setChapters={setChapters} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} variant="indigo" />
                <h2 className="text-xl">Sell your course</h2>
              </div>
              <PriceForm initialData={course} courseId={course?.id} setCourse={setCourse} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} variant="indigo" />
                <h2 className="text-xl">Resources & Attachments</h2>
              </div>
              <AttachmentForm initialData={course} courseId={course?.id} attachments={attachments} setAttachments={setAttachments} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseContainer;
