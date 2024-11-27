import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCabin as addCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

const useAddCabin = () => {
  const queryClient = useQueryClient(); // Corrected here
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: addCabinApi,
    onSuccess: () => {
      toast.success("Cabin Added!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCabin };
};

export default useAddCabin;
