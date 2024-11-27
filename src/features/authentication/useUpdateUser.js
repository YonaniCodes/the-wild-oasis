import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../../services/apiAuth";
import toast from "react-hot-toast";

export const useUpdateUser = () => {
  const queryClient = useQueryClient(); // Corrected here

  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: ({ avatar, fullName, password }) =>
      updateProfile({ avatar, fullName, password }),
    onSuccess: () => {
      toast.success("Profile Updated!");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateUser };
};
