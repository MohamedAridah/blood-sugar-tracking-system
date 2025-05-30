import { LogOut } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { SignOutUser } from "@/actions/auth";

export default async function SignOutButton() {
  return (
    <form action={SignOutUser}>
      <button type="submit" className={buttonVariants({ variant: "outline" })}>
        <LogOut className="text-muted-foreground" /> Signout
      </button>
    </form>
  );
}
