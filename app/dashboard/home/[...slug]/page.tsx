import React from "react";

import DashboardLayout from "@/app/components/Dashboards/DashboardLayout";
import { redirect } from "next/navigation";
import { Log, getSessionKnex } from "@/app/_helpers/api/helpers";
import { KnexConnection } from "@/app/_helpers/api/configs";

const calcPercentage = (num1: number, num2: number) => {
  const percentage = ((num1 - num2) / 2) * 100;
  return percentage;
};

async function getData() {
  try {
    const DB = await KnexConnection();

    const session = await getSessionKnex(DB);
    if (!session?.establishmentId) return "unauthorised";

    let dateToday = new Date() as any;
    let date1monthAgo = new Date(dateToday.getFullYear(), dateToday.getMonth() - 1, dateToday.getDate()) as any;
    let date2monthAgo = new Date(dateToday.getFullYear(), dateToday.getMonth() - 2, dateToday.getDate()) as any;

    dateToday = dateToday.toISOString();
    date1monthAgo = date1monthAgo.toISOString();
    date2monthAgo = date2monthAgo.toISOString();

    // using knex because issue with mysql2/promise with multiple statement query (this kind of query is more effecient but is not possible to use parameterised values and shouldnt be used with untrusted inputs to prevent sql injection)
    // queries: number of sites, records, article, courses created in the last 30 days and the 30 days before that
    const results = await DB.raw(
      `SELECT COUNT(id) AS numSitesCreated FROM Site WHERE createdAt BETWEEN '${date1monthAgo}' AND '${dateToday}' AND establishmentId = '${session.establishmentId}';
  SELECT COUNT(id) AS numRecordsCreated FROM Record WHERE createdAt BETWEEN '${date1monthAgo}' AND '${dateToday}' AND establishmentId = '${session.establishmentId}';
  SELECT COUNT(id) AS numArticlesCreated FROM Article WHERE createdAt BETWEEN '${date1monthAgo}' AND '${dateToday}' AND establishmentId = '${session.establishmentId}';
  SELECT COUNT(id) AS numCoursesCreated FROM Course WHERE createdAt BETWEEN '${date1monthAgo}' AND '${dateToday}' AND establishmentId = '${session.establishmentId}';
  SELECT COUNT(id) AS numSitesCreated FROM Site WHERE createdAt BETWEEN '${date2monthAgo}' AND '${date1monthAgo}' AND establishmentId = '${session.establishmentId}';
  SELECT COUNT(id) AS numRecordsCreated FROM Record WHERE createdAt BETWEEN '${date2monthAgo}' AND '${date1monthAgo}' AND establishmentId = '${session.establishmentId}';
  SELECT COUNT(id) AS numArticlesCreated FROM Article WHERE createdAt BETWEEN '${date2monthAgo}' AND '${date1monthAgo}' AND establishmentId = '${session.establishmentId}';
  SELECT COUNT(id) AS numCoursesCreated FROM Course WHERE createdAt BETWEEN '${date2monthAgo}' AND '${date1monthAgo}' AND establishmentId = '${session.establishmentId}';`
    );

    const sitePercentage = calcPercentage(results[0][0][0].numSitesCreated, results[0][4][0].numSitesCreated);
    const recordPercentage = calcPercentage(results[0][1][0].numRecordsCreated, results[0][5][0].numRecordsCreated);
    const articlePercentage = calcPercentage(results[0][2][0].numArticlesCreated, results[0][6][0].numArticlesCreated);
    const coursePercentage = calcPercentage(results[0][3][0].numCoursesCreated, results[0][7][0].numCoursesCreated);

    return {
      monthlyMetrics: [
        { name: "Sites", value: results[0][0][0].numSitesCreated, percentage: sitePercentage, color: sitePercentage > 0 ? "green" : "red" },
        { name: "Records", value: results[0][1][0].numRecordsCreated, percentage: recordPercentage, color: recordPercentage > 0 ? "green" : "red" },
        { name: "Articles", value: results[0][2][0].numArticlesCreated, percentage: articlePercentage, color: articlePercentage > 0 ? "green" : "red" },
        { name: "Courses", value: results[0][3][0].numCoursesCreated, percentage: coursePercentage, color: coursePercentage > 0 ? "green" : "red" },
      ],
    };
  } catch (err) {
    Log(err);
    return [];
  }
}

export default async function page({}: any) {
  const data = (await getData()) as any | "unauthorised";

  if (data === "unauthorised") return redirect("/login?unauthorised=true");
  return <DashboardLayout data={data} />;
}
