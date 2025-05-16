"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { MoveLeft } from "lucide-react";
import { Button, ButtonVariants } from "@/components/ui/button";

type BackButtonProps = React.ComponentProps<"a"> & {
  link?: string;
  text?: string;
  variant?: ButtonVariants;
  className?: string;
};

const BackButton = ({
  text = "Go Back",
  variant = "link",
  link,
  className,
  ...rest
}: BackButtonProps) => {
  const router = useRouter();

  if (link) {
    return (
      <Link
        href={link}
        className={clsx(
          "group inline-flex items-center gap-2 font-semibold my-3 text-sm text-gray-500 hover:text-gray-600 hover:underline",
          className
        )}
        {...rest}
      >
        <MoveLeft
          size={18}
          className="group-hover:translate-x-1 duration-200 transition-all"
        />
        {text}
      </Link>
    );
  }

  return (
    <Button
      variant={variant}
      className={clsx(
        "group inline-flex items-center gap-2 font-semibold px-0 my-3 text-sm text-gray-500 hover:text-gray-600 hover:underline",
        className
      )}
      onClick={() => router.back()}
    >
      <MoveLeft
        size={18}
        className="group-hover:translate-x-1 duration-200 transition-all"
      />
      {text}
    </Button>
  );
};

export default BackButton;
