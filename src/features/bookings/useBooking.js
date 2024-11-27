import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";
const useBooking = (id) => {
  const { bookingId } = useParams();
  const options = {
    queryFn: () => getBooking(bookingId),
    queryKey: ["booking", bookingId],
    retry: false,
  };
  const { isLoading, data: booking, isError } = useQuery(options);

  return { booking, isError, isLoading };
};

export default useBooking;
