import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  numberOfItems: number;
  variant?: string;
  label: string;
  icon: LucideIcon;
}

export const InfoCard = ({ variant, icon: Icon, numberOfItems, label }: InfoCardProps) => {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3">
      <div className={`rounded-full bg-${variant}-100 p-2`}>
        <Icon className={`w-8 h-8 text-${variant}-500`} />
      </div>

      <div>
        <p className="font-medium">{label}</p>
        <p className="text-gray-500 text-sm">
          {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
        </p>
      </div>
    </div>
  );
};
