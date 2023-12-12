```tsx

"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loader from "./components/Loader/Loader";

export const HomePage = ({ name }) => {
  const router = useRouter();
  React.useEffect(() => {
    if (name) router.push("/dashboard/home/" + name);
  }, []);

  if (name) return <Loader />;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white ">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full ">
        <Image className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] " src="/mosque2.png" alt="Next.js Logo" width={280} height={100} priority />
      </div>
      <h1 className="  mb-10">
        You don't seem to be logged in.
        <Link className="text-indigo-500 hover:underline" href="/login">
          Login here
        </Link>
      </h1>
    </main>
  );
};


```

```mermaid

Here is the Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
  + HomePage[ ] --> Loader[ ]
  + HomePage[name] --> /dashboard/home/[name]
  + HomePage[name] --> Link[ ] --> /login
```
Explanation:

* The `graph LR` keyword defines the graph structure.
* `HomePage` is the start node, representing the `HomePage` function.
* `Loader` is a subnode of `HomePage`, representing the `Loader` component.
* `HomePage[name]` is a subnode of `HomePage`, representing the branching logic based on the `name` parameter.
* `HomePage[name] --> /dashboard/home/[name]` is a directed edge from `HomePage[name]` to `/dashboard/home/[name]`, representing the navigation to the `/dashboard/home/` route based on the `name` parameter.
* `HomePage[name] --> Link[ ] --> /login` is a directed edge from `HomePage[name]` to the `Link`

```
