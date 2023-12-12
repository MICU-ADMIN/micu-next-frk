import { redirect } from "next/navigation";

import { Log, getSessionKnex } from "@/app/_helpers/api/helpers";
import CourseHeader from "./CourseHeader";

import { Course, CourseAttachment, CourseChapter } from "@/_types/dbTypes";
import CourseContainer from "./CourseContainer";
import { KnexConnection } from "@/app/_helpers/api/configs";

async function getData(id: string) {
  try {
    const DB = await KnexConnection();

    const session = await getSessionKnex(DB);
    if (!session?.establishmentId) return "unauthorised";

    //sanitise id because getting all the data in a single query using multiple statements, pararmeterised queries are not possible with multiple statements, so need to sanitise manually
    const numbId = parseInt(id); //parse id to int
    if (isNaN(numbId)) return "unauthorised";

    // using knex because issue with mysql2/promise with multiple statements
    const results = await DB.raw(
      `SELECT id, userId, type, title, description, imageUrl, price, progress, isPublished, categoryId, createdAt, updatedAt, deletedAt FROM Course WHERE id = ${id} AND establishmentId = '${session.establishmentId}';
      SELECT id, courseId, positionInCourse, userId, title, description, videoUrl, position, isPublished, isFree, createdAt, updatedAt, deletedAt FROM CourseChapter WHERE courseId = ${id} AND establishmentId = '${session.establishmentId}';
      SELECT id, name, url, courseId, userId, createdAt, updatedAt, deletedAt FROM CourseAttachment WHERE courseId = ${id} AND establishmentId = '${session.establishmentId}';
      `
    );

    const course = results[0][0][0];
    const chapters = results[0][1];
    const attachments = results[0][2];

    //close connection

    return { course: course as Course, chapters: chapters as CourseChapter[], attachments: attachments as CourseAttachment[] };
  } catch (err) {
    Log(err);
    return [];
  }
}

const CourseIdPage = async ({ searchParams }: { searchParams: { id: string } }) => {
  if (!searchParams.id) return <div className="flex flex-col items-center justify-center h-screen w-screen ">Invalid Course</div>;

  const data = (await getData(searchParams.id)) as { course: Course; chapters: CourseChapter[]; attachments: CourseAttachment[] } | "unauthorised";

  if (data === "unauthorised") return redirect("/login?unauthorised=true");

  const categories = [] as any;
  const completionText = "";
  const isComplete = false;

  if (!data?.course) return <div className="flex flex-col items-center justify-center h-screen w-screen ">Invalid Course</div>;

  return (
    <>
      <CourseHeader />
      <div className="page-wrapper bg-white ">
        <CourseContainer data={data} searchParams={searchParams} completionText={completionText} isComplete={isComplete} />
      </div>
    </>
  );
};

export default CourseIdPage;
