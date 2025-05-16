import { ReactNode } from "react";
import clsx from "clsx";

type IconMenuProps = {
  icon: ReactNode;
  text?: string;
  className?: string;
};

const IconMenu = ({ icon, text, className }: IconMenuProps) => {
  return (
    <div
      className={clsx(
        "flex items-center gap-1 text-center space-x-1",
        className
      )}
    >
      {icon}
      {text && <span className="text-sm">{text}</span>}
    </div>
  );
};

export default IconMenu;
