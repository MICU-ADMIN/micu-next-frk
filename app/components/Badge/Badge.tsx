import React from "react";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement>;

function Badge({ children, className, ...props }: BadgeProps) {
  return (
    <span
      className={`  rounded-full w-max flex-shrink-0 inline-flex justify-center items-center rounded-tremor-full bg-indigo-100 text-indigo-700 px-2.5 py-0.5 text-sm border border-indigo-500 ${className}`}
      {...props}
    >
      <p className=" text-sm whitespace-nowrap">{children}</p>
    </span>
  );
}

export default Badge;
