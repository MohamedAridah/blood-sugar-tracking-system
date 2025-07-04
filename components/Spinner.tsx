import { ComponentProps } from "react";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { cn } from "@/lib/utils";

const spinnerVariants = cva(
  "border !border-t-transparent rounded-full animate-spin",
  {
    variants: {
      variant: {
        default: "border-gray-400",
        destructive: "border-red-600",
      },
      size: {
        sm: "size-4",
        md: "size-6",
        lg: "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
);

type SpinnerProps = ComponentProps<"div"> & {
  text?: string;
  fullScreen?: boolean;
  height?: string;
} & VariantProps<typeof spinnerVariants>;

const Spinner = ({
  text,
  fullScreen = false,
  height,
  size,
  variant,
  ...props
}: SpinnerProps) => {
  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-busy="true"
      className={cn(
        clsx(
          "flex flex-col items-center gap-2 justify-center space-x-2",
          height && `h-[${height}vh]`,
          fullScreen && "h-screen w-full"
        )
      )}
      {...props}
    >
      <div className={cn(spinnerVariants({ size, variant }))}></div>
      {text ? <p>{text}</p> : null}
    </div>
  );
};

export default Spinner;
