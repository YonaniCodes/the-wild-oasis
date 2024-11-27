import { useQuery } from "@tanstack/react-query";

import { getSettings } from "../../services/apiSettings";

const useSettings = () => {
  const options = {
    queryFn: getSettings,
    queryKey: ["Settings"],
  };
  const { isLoading, data: settings, isError } = useQuery(options);

  return { settings, isError, isLoading };
};

export default useSettings;
