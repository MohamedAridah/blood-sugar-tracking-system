import Link from "next/link";
import clsx from "clsx";
import { MoveLeft } from "lucide-react";
import { Button, ButtonVariants } from "@/components/ui/button";

type BackButtonProps = React.ComponentProps<"a"> & {
  link: string;
  text?: string;
  variant?: ButtonVariants;
  className?: string;
};

const BackButton = ({
  text = "Go Back",
  variant = "outline",
  link,
  className,
  ...rest
}: BackButtonProps) => {
  return (
    <Button variant={variant} asChild>
      <Link
        href={link}
        className={clsx(
          "flex items-center gap-2 font-semibold mt-3 text-sm text-gray-500 hover:underline",
          className
        )}
        {...rest}
      >
        <MoveLeft size={18} />
        {text}
      </Link>
    </Button>
  );
};

export default BackButton;
