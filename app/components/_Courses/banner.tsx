import { AlertTriangle, CheckCircleIcon } from "lucide-react";

const bannerVariants = {
  variants: {
    variant: {
      warning: "bg-yellow-200/80 border-yellow-30 text-primary",
      success: "bg-emerald-700 border-emerald-800 text-secondary",
    },
  },
  defaultVariants: {
    variant: "warning",
  },
} as any;

interface BannerProps {
  label: string;
  variant?: keyof (typeof bannerVariants)["variants"]["variant"];
}

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
} as any;

export const Banner = ({ label, variant }: BannerProps) => {
  const Icon = iconMap[variant || "warning"];

  return (
    <div className={`border text-center p-4 text-sm flex items-center w-full ${bannerVariants.variants.variant[variant || "warning"]}`}>
      <Icon className="h-4 w-4 mr-2" />
      {label}
    </div>
  );
};
