import { redirect } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";

import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { InfoCard } from "./_components/info-card";
import { CoursesList } from "@/app/components/_Courses/courses-list";

export default async function Dashboard() {
  const { completedCourses, coursesInProgress } = await getDashboardCourses();

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard icon={Clock} label="In Progress" numberOfItems={coursesInProgress.length} variant="indigo" />
        <InfoCard icon={CheckCircle} label="Completed" numberOfItems={completedCourses.length} variant="emerald" />
      </div>
      {/* <CoursesList items={[...coursesInProgress, ...completedCourses]} /> */}

      <CoursesList
        items={[
          {
            id: "1",
            title: "Test",
            chapters: [],
            progress: 0,
            imageUrl: "/logo.png",
            price: 0,
            category: {
              name: "Test",
            },
          },
        ]}
      />
    </div>
  );
}
