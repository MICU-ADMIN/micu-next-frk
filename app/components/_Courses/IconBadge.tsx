import React from "react";
import { LucideIcon } from "lucide-react";

interface Props {
  variant?: string;
  size?: "md" | "sm";
  icon: LucideIcon;
}

function IconBadge({ variant, icon: Icon, size = "md" }: Props) {
  return (
    <div className={`rounded-full bg-${variant}-100 p-2`}>
      <Icon className={` text-${variant}-500` + (size === "md" ? " w-8 h-8" : " w-4 h-4")} />
    </div>
  );
}

export default IconBadge;
