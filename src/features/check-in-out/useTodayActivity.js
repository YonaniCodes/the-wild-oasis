import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

useQuery;

export function useTodayActivity() {
  const { isLoading, data: activities } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });
  return { isLoading, activities };
}
