import React from "react";

function Heading({ heading, subtitle }: { heading: string; subtitle: string }) {
  return (
    <div className="max-w-xl">
      <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
        {heading}
      </h2>
      <p className="mt-5 text-xl text-gray-500">{subtitle}</p>
    </div>
  );
}

export default Heading;
