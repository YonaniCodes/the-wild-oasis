import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useCheckin = () => {
  const queryClient = useQueryClient(); // Corrected here
  const navigate = useNavigate();

  const { isLoading: isCheckingIn, mutate: checkin } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-in", isPaid: true }),
    onSuccess: (data) => {
      toast.success(`Booking # ${data.id} is checked In`);
      queryClient.invalidateQueries({
        active: true,
      });
      navigate("/");
    },
    onError: () => toast.error(`there was an error while checking in`),
  });

  return { isCheckingIn, checkin };
};
