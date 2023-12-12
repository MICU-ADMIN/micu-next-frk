// import { Category, Chapter, Course } from "@prisma/client";

import { RedirectLogin, getSession } from "@/app/_helpers/api/helpers";
import { NextRequest, NextResponse } from "next/server";
import { Course, CourseCategory, CourseChaspter } from "@/_types/dbTypes";

type CourseWithProgressWithCategory = Course & {
  category: CourseCategory;
  chapters: CourseChapter[];
  progress: number | null;
};

type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[];
  coursesInProgress: CourseWithProgressWithCategory[];
};

//@ts-expect-error
import { DBConnection } from "@/app/_helpers/api/configs";
export const getDashboardCourses = async (): Promise<DashboardCourses | void> => {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    //A lot of db requests are made. A progress column added to Course table. As only a string of the progress is needed in the course-list better to just have string and update the curse table on a progress change as well,
    //When clicking on a course then UserProgress can be fetched for more data
    //more effecient after to do 2 query table twice instead of filtering on server, as a user can have 1000s of courses and would take a long time to filter

    const [copletedCourses] = await (
      await conn
    ).query(
      " SELECT * FROM Course WHERE isPublished = true AND establishmentId = ? AND id IN (SELECT courseId FROM CourseUserProgress WHERE isCompleted = true AND userId = ?)",
      [session.establishmentId, session.userId]
    );
    const [coursesInProgress] = await (
      await conn
    ).query(
      " SELECT * FROM Course WHERE isPublished = true AND establishmentId = ? AND id IN (SELECT courseId FROM CourseUserProgress WHERE isCompleted = false AND userId = ?)",
      [session.establishmentId, session.userId]
    );

    // const purchasedCourses = await db.purchase.findMany({
    //   where: {
    //     userId: userId,
    //   },
    //   select: {
    //     course: {
    //       include: {
    //         category: true,
    //         chapters: {
    //           where: {
    //             isPublished: true,
    //           }
    //         }
    //       }
    //     }
    //   }
    // });

    // const courses = purchasedCourses.map((purchase) => purchase.course) as CourseWithProgressWithCategory[];

    // for (let course of courses) {
    //   const progress = await getProgress(userId, course.id);
    //   course["progress"] = progress;
    // }

    // const completedCourses = courses.filter((course) => course. ,.jmn , === 100);
    // const coursesInProgress = courses.filter((course) => (course.progress ?? 0) < 100);

    // return {
    //   completedCourses,
    //   coursesInProgress,
    // }

    return {
      ["completedCourses"]: [],
      ["coursesInProgress"]: [],
    };
  } catch (error) {
    console.log("[GET_DASHBOARD_COURSES]", error);
    return {
      completedCourses: [],
      coursesInProgress: [],
    };
  }
};
