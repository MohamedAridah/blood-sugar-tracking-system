import Image from "next/image";
import { person } from "@/data/person";
import { Camera, Pen } from "lucide-react";

import Panel from "@/components/Panel";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import DeleteAccountAction from "./components/delete-account-button";
import ChangeAccountPassword from "./components/change-account-password";
import UserInfoPanel from "./components/user-info-panel";
import { auth } from "@/lib/auth";
import UserBioPanel from "./components/user-bio-panel";
import UserActionsPanel from "./components/user-actions-panel";

const Account = async () => {
  return (
    <section>
      <h1 className="font-semibold text-lg">My Profile</h1>

      <UserBioPanel />

      <UserInfoPanel />

      <UserActionsPanel />
    </section>
  );
};

export default Account;
