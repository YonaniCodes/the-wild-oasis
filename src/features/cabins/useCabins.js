import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

const useCabins = () => {
  const options = {
    queryFn: getCabins,
    queryKey: ["cabins"],
  };
  const { isLoading, data: cabins, isError } = useQuery(options);

  return { cabins, isError, isLoading };
};

export default useCabins;
