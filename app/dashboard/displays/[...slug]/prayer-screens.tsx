"use client";
import FabButton from "@/app/components/__Layouts/Fab/Fab";
import React from "react";

const categories = [
  {
    name: "Handcrafted Collection",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-01-collection-01.jpg",
    imageAlt:
      "Brown leather key ring with brass metal loops and rivets on wood table.",
    description:
      "Keep your phone, keys, and wallet together, so you can lose everything at once.",
  },
  {
    name: "Organized Desk Collection",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-01-collection-02.jpg",
    imageAlt:
      "Natural leather mouse pad on white desk next to porcelain mug and keyboard.",
    description:
      "The rest of the house will still be a mess, but your desk will look great.",
  },
  {
    name: "Focus Collection",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-01-collection-03.jpg",
    imageAlt:
      "Person placing task list card into walnut card holder next to felt carrying case on leather desk pad.",
    description:
      "Be more productive than enterprise project managers with a single piece of paper.",
  },
];

function Grid() {
  return (
    <div className="min-h-full">
      <FabButton/>
      <main className="py-16">
        {/*  */}

        <div className="bg-white">
          <div className="mx-auto max-w-xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Prayer Screens
            </h2>

            <div className="mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
              {categories.map((category) => (
                <a
                  key={category.name}
                  href={category.href}
                  className="group block"
                >
                  <div
                    aria-hidden="true"
                    className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg lg:aspect-h-6 lg:aspect-w-5 group-hover:opacity-75"
                  >
                    <img
                      src={category.imageSrc}
                      alt={category.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-gray-900">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {category.description}
                  </p>
                </a>
              ))}
            </div>

            <h2 className="text-2xl mt-20 font-bold tracking-tight text-gray-900">
              Community boards
            </h2>

            <div className="mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
              {categories.map((category) => (
                <a
                  key={category.name}
                  href={category.href}
                  className="group block"
                >
                  <div
                    aria-hidden="true"
                    className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg lg:aspect-h-6 lg:aspect-w-5 group-hover:opacity-75"
                  >
                    <img
                      src={category.imageSrc}
                      alt={category.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-gray-900">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {category.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/*  */}
      </main>
    </div>
  );
}

function List() {
  return <></>;
}

export default ({ type, data }) => {
  switch (type) {
    case "grid":
      return <Grid data={data} />;
      break;
    case "list":
      return <List data={data} />;
      break;

    default:
      return <Grid data={data} />;
      break;
  }
};
