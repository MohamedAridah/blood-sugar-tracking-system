import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { LucideIcon, TriangleAlert } from "lucide-react";

const NotificationMessageVariants = cva("", {
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

type NotificationMessageProps = {
  title: string;
  subTitle?: string;
  icon?: LucideIcon;
} & VariantProps<typeof NotificationMessageVariants>;

const NotificationMessage = ({
  icon: Icon = TriangleAlert,
  title,
  subTitle,
  size,
  variant,
}: NotificationMessageProps) => {
  return (
    <div className="min-h-[200px] p-5 border rounded-lg shadow-sm flex items-center justify-center my-4">
      <div className="flex flex-col items-center text-center">
        <Icon className={cn(NotificationMessageVariants({ size, variant }))} />
        <h1 className="text-[15px]">{title}</h1>
        {subTitle && <p className="text-sm text-slate-700 mt-1">{subTitle}</p>}
      </div>
    </div>
  );
};

export default NotificationMessage;
