"use client";


export async function QuickCreateSite({ func }: any) {
  return (
    <div>
      No site on this path. Do you want to create a webpage at this location?
      Find out more about sites{" "}
      <a
        onClick={async () => {
          await func();
        }}
      >
        create site
      </a>
    </div>
  );
}
