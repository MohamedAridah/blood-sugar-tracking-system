import { useEffect, useState } from "react";
import { Session, User } from "better-auth/types";
import { authClient } from "@/lib/auth-client";

type StateType = {
  user: User;
  session: Session;
};

export function useSession() {
  const [session, setSession] = useState<StateType | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      try {
        const currentSession = await authClient.getSession();
        setSession(currentSession.data as StateType);
      } catch (error) {
        setSession(undefined);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSession();
  }, []);

  return { session, isLoading };
}
