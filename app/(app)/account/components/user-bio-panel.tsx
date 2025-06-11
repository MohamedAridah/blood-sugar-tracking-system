"use client";

import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import Panel from "@/components/Panel";
import { Camera } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const UserBioPanel = () => {
  const { data, isPending } = authClient.useSession();
  const person = data?.user;

  if (isPending) {
    return (
      <Panel>
        <div className="flex items-center space-x-4">
          <Skeleton className="w-20 h-20 rounded-full" />
          <div className="flex flex-col space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
      </Panel>
    );
  }

  return (
    <Panel>
      <div className="flex flex-row items-center gap-5 ">
        <div className="group relative ">
          <Image
            src="https://dummyjson.com/icon/michaelw/128"
            alt={`${person?.name} profile photo`}
            width={100}
            height={100}
            className=" max-w-[100px] rounded-full shadow-md overflow-hidden group-hover:cursor-pointer"
          />
          <div className="absolute bottom-0 right-0 -translate-y-2 translate-x-1/3 rounded-full bg-white dark:bg-slate-200 p-1 flex items-center justify-center">
            <Camera
              size={20}
              className="shadow-sm group-hover:cursor-pointer dark:text-black"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold">
            {person?.firstName} {person?.lastName}
          </h3>
          <p className="text-muted-foreground text-sm">{person?.email}</p>
        </div>
      </div>
    </Panel>
  );
};

export default UserBioPanel;
