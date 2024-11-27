import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

const useBookings = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // SORT
  const sortValue = searchParams.get("sortBy") || "startDate-desc";
  const sort =
    !sortValue || sortValue === "all"
      ? null
      : {
          field: sortValue.split("-")[0], // Extract the field (e.g., 'startDate')
          order: sortValue.split("-")[1], // Extract the order (e.g., 'desc')
        };
  //  Page
  let page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  // Query options
  const fetchOptions = {
    queryFn: () => getBookings({ filter, sort, page }),
    queryKey: ["bookings", filter, sort, page], // Include `sort` in the query key to handle caching correctly
  };

  // / React Query Hook
  const { isLoading, data, isError } = useQuery(fetchOptions);

  // Safely access `data`
  const bookings = data?.data || []; // Default to an empty array if undefined
  const count = data?.count || 0; // Default to 0 if undefined

  // PREFETCHING DATA
  let pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page + 1], // Unique key for the query
      queryFn: () => getBookings({ filter, sort, page: page + 1 }), // Function to fetch data
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page - 1], // Unique key for the query
      queryFn: () => getBookings({ filter, sort, page: page - 1 }), // Function to fetch data
    });

  return { bookings, isError, isLoading, count };
};

export default useBookings;
