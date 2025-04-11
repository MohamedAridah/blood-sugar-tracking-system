import { ComponentProps } from "react";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { cn } from "@/lib/utils";

const spinnerVariants = cva(
  "border border-gray-400 border-t-transparent rounded-full animate-spin",
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-6",
        lg: "size-8",
      },
    },
    defaultVariants: {
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
          height && `h-[${height}vh]  w-full`,
          fullScreen && "h-screen  w-full"
        )
      )}
      {...props}
    >
      <div className={cn(spinnerVariants({ size }))}></div>
      {text && <p>{text}</p>}
    </div>
  );
};

export default Spinner;
