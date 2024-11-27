import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signUpApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signUpApi({ email, password, fullName }),
    onSuccess: () => {
      // queryClient.setQueryData(["user"], user);
      toast.success("User Created");
      // navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err.message);
      toast.error("Provided email or password is not correct!");
    },
  });

  return { isLoading, signup };
}
