import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const {
    isLoading,
    isError,
    data: user,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    isLoading,
    isError,
    user,
    isAuthenticated: user?.role === "authenticated",
  };
}
