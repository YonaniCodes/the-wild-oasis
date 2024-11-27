import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export const useEditCabin = () => {
  const queryClient = useQueryClient(); // Corrected here

  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: patchCabin,
    onSuccess: () => {
      toast.success("Cabin Edited!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCabin };
};
