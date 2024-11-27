import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // Clear cache and redirect to login
      queryClient.clear(); // Clear all queries and mutations
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      // Handle logout errors
      console.error("Logout failed:", error.message);
    },
  });

  return { isLoading, logout };
}
