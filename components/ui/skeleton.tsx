import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      aria-hidden="true"
      role="status"
      aria-live="polite"
      aria-busy="true"
      {...props}
    />
  );
}

export { Skeleton };
