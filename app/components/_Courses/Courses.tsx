import React from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import RecordViewer from "../__Layouts/RecordViewer/RecordViewer";
import { Course } from "@/_types/dbTypes";
import CourseForm from "./CourseForm";
import Badge from "../Elements/Badge/Badge";

type Props = {
  courses: Course[];
  currentEstablishment: any;
  publicEstablishmentId: string;
};

function Courses({ courses, publicEstablishmentId = "", currentEstablishment }: Props) {
  const router = useRouter();
  const [curCourses, setCurCourses] = React.useState<Course[] | null>(null);
  const [showAddScreen, setShowAddScreen] = React.useState(false);
  const [editingCourse, setEditingCourse] = React.useState<Course | null>(null);

  React.useEffect(() => {
    if (courses && courses.length > 0) {
      setCurCourses(courses);
    }
  }, [courses]);

  const navigateTo = (id: string | number) => {
    router.push("/dashboard/course/" + publicEstablishmentId + "?id=" + id);
  };

  if (!currentEstablishment) return null;
  return (
    <>
      <Toaster />
      <RecordViewer
        records={curCourses || []}
        onPress={(id: string) => navigateTo(id)}
        addAction={setShowAddScreen}
        editAction={setEditingCourse}
        addLabel="Add New Course"
        defaultView="table"
        route="courses"
        setRecords={setCurCourses}
        additionalColumns={[
          {
            name: "type",
            placeholder: "Type",
            type: "custom",
            width: "150px",
            component: ({ row }: { row: Course }) => <Badge>{row.type}</Badge>,
          },
        ]}
      />
      {(showAddScreen || editingCourse) && (
        <CourseForm
          editModel={editingCourse}
          setCurRecords={setCurCourses}
          publicEstablishmentId={publicEstablishmentId}
          close={() => {
            setShowAddScreen(false);
            setEditingCourse(null);
          }}
        />
      )}
    </>
  );
}

export default Courses;
