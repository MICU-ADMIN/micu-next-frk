import { CheckIcon } from "@heroicons/react/20/solid";

const features = [
  {
    name: "Invite team members",
    description:
      "Rerum repellat labore necessitatibus reprehenderit molestiae praesentium.",
  },
  {
    name: "List view",
    description:
      "Corporis asperiores ea nulla temporibus asperiores non tempore assumenda aut.",
  },
  {
    name: "Keyboard shortcuts",
    description:
      "In sit qui aliquid deleniti et. Ad nobis sunt omnis. Quo sapiente dicta laboriosam.",
  },
  {
    name: "Calendars",
    description:
      "Sed rerum sunt dignissimos ullam. Iusto iure occaecati voluptate eligendi fugiat sequi.",
  },
  {
    name: "Notifications",
    description:
      "Quos inventore harum enim nesciunt. Aut repellat rerum omnis adipisci.",
  },
  {
    name: "Boards",
    description:
      "Quae sit sunt excepturi fugit veniam voluptatem ipsum commodi.",
  },
  {
    name: "Reporting",
    description:
      "Eos laudantium repellat sed architecto earum unde incidunt. Illum sit dolores voluptatem.",
  },
  {
    name: "Mobile app",
    description:
      "Nulla est saepe accusamus nostrum est est. Fugit voluptatum omnis quidem voluptatem.",
  },
];

export function Features() {
  return (
    <div className="bg-inherit">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-1">
          <div>
            <h2 className="text-base font-semibold leading-7 text-primary-100">
              Everything you need
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-grey-100 sm:text-4xl">
              All-in-one platform
            </p>
            <p className="mt-6 text-base leading-7 text-gray-300">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
              impedit perferendis suscipit eaque, iste dolor cupiditate
              blanditiis ratione.
            </p>
          </div>
          <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-9">
                <dt className="font-semibold text-white">
                  <CheckIcon
                    className="absolute left-0 top-1 h-5 w-5 text-primary-100"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-2">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

export default function ApplicationLayout(props) {
  return (
    <div className="bg-primary-700 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:col-span-7">
          {/* <h2 className='inline sm:block lg:inline xl:block'>Want product news and updates?</h2> <p className='inline sm:block lg:inline xl:block'>Sign up for our newsletter.</p> */}
          <Features />
        </div>
        {props.children}
      </div>
    </div>
  );
}
