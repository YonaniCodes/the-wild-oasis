import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export const useUpdateSetting = () => {
  const queryClient = useQueryClient(); // Corrected here

  const { isLoading: isUpdating, mutate: updateSettings } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Cabin Edited!");
      queryClient.invalidateQueries({
        queryKey: ["Settings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateSettings };
};
