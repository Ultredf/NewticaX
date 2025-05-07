import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuth({ required = true } = {}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  
  useEffect(() => {
    if (!isLoading && required && !isAuthenticated) {
      // Redirect to login if not authenticated
      router.push("/");
    }
  }, [isLoading, isAuthenticated, required, router]);
  
  return {
    session,
    isLoading,
    isAuthenticated,
    user: session?.user,
  };
}