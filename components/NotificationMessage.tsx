import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { LucideIcon, TriangleAlert } from "lucide-react";
import React from "react";

const IconVariants = cva("mb-2", {
  variants: {
    variant: {
      success: "text-green-400",
      warning: "text-orange-400",
      danger: "text-red-400",
      gray: "text-gray-300",
    },
    size: {
      sm: "size-[25px]",
      md: "size-[35px]",
      lg: "size-[45px]",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "warning",
  },
});

const MessageVariants = cva(
  "min-h-52 p-5 rounded-lg flex items-center justify-center my-4",
  {
    variants: {
      theme: {
        border: "border shadow-sm",
        "no-border": "shadow-none border-0",
      },
    },
    defaultVariants: {
      theme: "border",
    },
  }
);

type Props = {
  children?: React.ReactNode;
  title: string;
  description?: string;
  icon?: LucideIcon;
  className?: string;
} & VariantProps<typeof IconVariants> &
  VariantProps<typeof MessageVariants>;

const NotificationMessage = ({
  children,
  title,
  description,
  icon: Icon = TriangleAlert,
  className,
  size,
  variant,
  theme,
}: Props) => {
  return (
    <div className={cn(MessageVariants({ theme }), className)}>
      <div className="flex flex-col items-center text-center">
        <Icon className={cn(IconVariants({ size, variant }))} />
        <h1 className="text-sm  text-slate-700 font-semibold">{title}</h1>
        {description && <p className="text-sm text-slate-700">{description}</p>}
        {children}
      </div>
    </div>
  );
};

export default NotificationMessage;
