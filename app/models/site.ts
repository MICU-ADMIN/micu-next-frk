"use server"
// model

const authKey = process.env.CLOUDFLARE_KEY || ""; // Replace with the actual authentication key

var cloudflare_url = (route: string | undefined, path: string | undefined) => {
  let url =
    "https://misty-bread-0c2c.mosqueicu.workers.dev/p4" +
    route +
    path +
    ".json";
  console.log(url);
  return url;
};

  // Function to create a webpage
  export async function createWebPage(
    route: any,
    path: string | undefined,
    page : any
  ): Promise<void> {
 // ...    
//  "use server";
 try {
      const response = await fetch(cloudflare_url(route, path), {
        method: "PUT",
        headers: {
          "Content-Type": "application/octet-stream",
          "X-Custom-Auth-Key": authKey,
        },
        body: JSON.stringify(page),
      });
  
      console.warn(response);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
       const data = await response.json();
        console.log(data)        }
      } catch (error) {
      console.error("Error in createSite()", error);
        }
}



/**
 * Asynchronous function to fetch data from a site using Cloudflare.
 * @param route - The route for the site.
 * @param path - The path for the site.
 * @returns A Promise resolving to the fetched data.
 */
export async function getSite(
  route: string | undefined,
  path: string | undefined
): Promise<any> {
  try {
    // Construct the URL using the provided route and path
    const url = cloudflare_url(route, path);

    // Use the fetch API to make the request
    const response = await fetch(url);

    // Ensure the response status is within the success range
    if (response.ok) {
      // Parse the response as JSON
      const data = await response.json();

      // Log the data for debugging purposes
      console.log(data);

      // Return the parsed data
      return data;
    } else {
      // Handle non-successful response status
      console.error(`Error: ${response.status} - ${response.statusText}`);
    return false
    }
  } catch (error) {
    // Handle any unexpected errors during the fetch operation
    console.error("Unexpected Error:", error);
  }
}
