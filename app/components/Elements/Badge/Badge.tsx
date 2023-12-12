import React from "react";
import { LucideIcon } from "lucide-react";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement>;

function Badge({ children, className, ...props }: BadgeProps) {
  return (
    <span
      title={children as string}
      className={`  rounded-full w-max flex-shrink-0 inline-flex justify-center items-center rounded-tremor-full bg-primary-100 text-primary-700 px-2.5 py-0.5 text-sm border border-primary-500 ${className}`}
      {...props}
    >
      <p className=" text-sm text-overlow-ellipsis overflow-ellipsis  whitespace-nowrap overflow-hidden">
        {children}
      </p>
    </span>
  );
}

export default Badge;
