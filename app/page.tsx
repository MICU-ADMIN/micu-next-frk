import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import React from "react";
import { getSession } from "./_helpers/api/helpers";
import mysql from "mysql2/promise";
import {  createWebPage } from "./models/site";
import { QuickCreateSite } from "./comp/client/sites";



let url: string | null
let  subdomain: string  | undefined
let  path: string | undefined 
 let route: string | null


console.log("Establishing a database connection");
// Establishing a database connection
const conn = mysql.createConnection(process.env.DATABASE_URL || "");
if (!conn) {
  console.error("Failed to establish a database connection");
} else {
  console.log("Database connection established successfully");
}

console.log("Defining global variables with default values from next.js headers");
// Defining global variables with default values from next.js headers
// let url: string | null;
// let subdomain: string | undefined;
// let path: string | undefined;
// let route: any;

console.log("Using async function to get values from headers");
// Use async function to get values from headers

export async function getServerSideProps(){
   url = headers().get("host") || null;
     subdomain = headers()?.get("host")?.split(".")[0] || undefined;
    path =  headers()?.get("host")?.split("//")[1];
     route = subdomain || url;
    console.log(`URL: ${url}, Subdomain: ${subdomain}, Path: ${path}, Route: ${route}`);  
  }

// Revalidate interval in seconds
 const revalidate = 3600; // revalidate the data at most every hour
 console.log(`Revalidate interval set to ${revalidate} seconds`);

// Function to construct the Cloudflare URL
var cloudflare_url = (route: string | null, path: string | undefined) => {
  // Construct the URL
  let $url =
    "https://misty-bread-0c2c.mosqueicu.workers.dev/p4" +
    route +
    path +
    ".json";
  // Log the URL for debugging purposes
  console.log(`Constructed Cloudflare URL: ${$url}`);
  // Return the constructed URL
  return $url;
};

// Function to get the cached instance
const cachedInstance = async () => {
  console.log("Getting cached instance");
  // Return the cached instance
  try {
    const instance = cookies().get("instance");
    console.log("Cached instance retrieved: ", instance);
    return instance;
  } catch (error) {
    console.error("Error while getting cached instance: ", error);
  }
};

// Class for Instance
class Instance {
  expiry: number = 0;
  webPages: WebPage[] = [];

  // the amount of time for an instance to expire
  static revalidate = 300000;

  // Function to download a webpage and add it to the instance
  static async downloadWebPage(instance: any) {
    console.log("Downloading webpage and adding it to the instance");
    // Construct the URL
    const url: any = cloudflare_url(route, path);
    // Fetch the webpage
    try {
      console.log(`Fetching webpage from ${url}`);
      const response = await fetch(url);

      // If the fetch was successful
      if (response.ok) {
        // Parse the response as JSON
        console.log("Parsing response as JSON");
        const data = await response.json();
        // Log the data for debugging purposes
        console.log(`Data fetched from ${url}: `, data);
        // Create a new webpage from the data
        console.log("Creating new webpage from data");
        const page = new WebPage(data);
        // Post the instance with the new webpage added
        console.log("Posting instance with new webpage added");
        const updatedInstance = await Instance.postInstance({
          ...instance,
          webPages: [...instance.webPages, page],
        });
        // Log the updated instance for debugging purposes
        console.log("Updated instance: ", updatedInstance);
        // Return the updated instance
        return {updatedInstance, page};
      } else {
        // If the fetch was not successful, log the error
        console.error(`Error: ${response.status} - ${response.statusText}`);
        // Return the instance with a 404 error
        return await WebPage.canUserClaimWebPage(instance)  
      
      }
    } catch (error) {
      console.error("Error while downloading webpage: ", error);
    }
  }

  // Function to post an instance
  static async postInstance(instance: any) {
    console.log("Posting instance");
    try {
      // Set the instance in the cookies
      console.log("Setting instance in cookies");
      cookies().set("instance", instance);
      console.log("Instance posted successfully: ", instance);
    } catch (error) {
      // If there was an error, log it
      console.error("Error while posting instance: ", error);
    }
    // Return the instance
    return instance;
  }

  // Function to get an instance
  static async getInstance() {
    console.log("Getting instance");
    // If there is a cached instance
    if (!isInstanceSmelly(await cachedInstance())) {
      // Check if the instance is expired
  
      // Return the cached instance
      console.log("Returning cached instance");
      return await cachedInstance();
    } else {
      // If there is no cached instance, return a new instance
      console.log("Returning new instance");
      return new Instance();
    }
  }

  // Constructor for Instance
  constructor() {
    console.log("Constructing Instance");
    // Initialize the webPages array
    this.webPages = [];
    // Set the expiry time for the instance
    this.expiry = Instance.revalidate + Date.now();
    console.log(`Instance created with expiry time: ${this.expiry}`);
  }
}

// Function to check if an instance is expired
var isInstanceSmelly = (instance: any) => {
  console.log("Checking if instance is expired");
  // Log the instance for debugging purposes
  console.warn("Checking if instance is expired: ", instance);

  // Return whether the instance is expired
   if(!instance || instance.expiry < Date.now()){
    console.log("Instance is expired");
    return true
  } else {
    console.log("Instance is not expired");
  return  false
  }
};

// Class for WebPage
class WebPage {
  page: {
    code: number;
    content: any;
    metadata: any;
  };
  route: string | null;
  subdomain: string | undefined;
  path: string | undefined;
  url: string | null;

  static {
     getServerSideProps()
  }
  // Constructor for WebPage
  constructor(page: any) {
    console.log("Constructing WebPage");
    // Initialize the page with the provided data
    this.page = page;
    // Set the route, path, url, and subdomain
    this.route = route;
    this.path = path;
    this.url = url;
    this.subdomain = subdomain;
    console.log(`WebPage created with route: ${this.route}, path: ${this.path}, url: ${this.url}, subdomain: ${this.subdomain}`);
  }



  // Function to check if a user can claim a webpage
  static async canUserClaimWebPage(instance: any) {
    console.log("Checking if user can claim webpage");
    // Get the current session
    const session = await getSession(conn);
    console.log("Current session: ", session);

    // If there is no session
    if (!cookies().get("session")) {
      return {instance, page : {code : 404}};
    } else if (session.establishmentName == subdomain) {
      // If the user can claim the webpage, return 9000
      console.log("User can claim the webpage, returning 9000");
      return {instance, page : {code : 9000}};
    } else {
      return {instance, page : {code : 404}};
    }
  }

  // Function to get the current webpage
static async getCurrentWebPage($instance: any) {    
  console.log("Getting current webpage");
  // Get the page and instance

  let pageInstance : any = filterForPage(path, $instance);
  if (!pageInstance) {
    pageInstance = await Instance.downloadWebPage($instance);
  }

  let { page, instance } = pageInstance;
  console.log(`Current page and instance: `, { page, instance, path });
  
  // Return the page and instance
  return { page , instance };
}
}



//   // Function to create a webpage
//    async function createWebPage(
//     route: string | undefined,
//     path: string | undefined,
//     page : any
//   ): Promise<void> {
//  // ...    
//  "use server";
//  try {
//       const response = await fetch(cloudflare_url(route, path), {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/octet-stream",
//           "X-Custom-Auth-Key": authKey,
//         },
//         body: JSON.stringify(page),
//       });
  
//       console.warn(response);
  
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       } else {
//        const data = await response.json();
//         console.log(data)        }
//       } catch (error) {
//       console.error("Error in createSite()", error);
//         }
// }


// Function to filter for a specific page
function filterForPage(path: any, instance: any) {
  console.log("Filtering for specific page");
  // Return the page with the matching path, or a 404 error
  const page = instance?.webPages?.filter((page: any) => page.path == path)[0]
  if (!page) {
    console.log("No page found, returning false");
    return false
  } else{
    console.log(`Filtered page for path ${path}: `, page + instance);
    return {page, instance};
  }
}

// Main function
export default async () => {
  console.log("Running main function");
  // Get the current page and instance
  var { page, instance } = await WebPage.getCurrentWebPage(
    await Instance.getInstance()
  );
  // console.log("Current page and instance: ", { page, instance });

  // If there is no page, display a loading message
  if (!page) {
    console.log("No page found, displaying loading message");
    <p>loading</p>;
  }

  // Log the page for debugging purposes
  console.log("page " + JSON.stringify(page));

  // Switch on the page code
  console.log("Switching on page code");
  switch (page.code) {
    case 9000:
      // If the user can claim the page, display a claim site button
      console.log("User can claim the page, displaying claim site button");

      return (
      <QuickCreateSite func={
        createWebPage(route, path, {code:200, content:"welcome to your first page"})
      }  />
      );
      case 404:
      return (
      <p>404</p>
        );

    default:
      // Otherwise, display the page content
      console.log("Displaying page content");
      return (
        <h1>
          <p>{JSON.stringify(page.content ||  page?.page?.content)}</p>;
{/* patch */}
        </h1>
      );
  }
};
