import { cn } from "@/lib/utils";

type Props = { full: string; short: string; className?: string };

export default function ResponsiveHeading({ full, short, className }: Props) {
  return (
    <>
      <span className={cn("hidden sm:inline", className)}>{full}</span>
      <span className={cn("inline sm:hidden", className)}>{short}</span>
    </>
  );
}
