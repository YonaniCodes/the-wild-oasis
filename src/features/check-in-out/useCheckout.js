import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useCheckout = () => {
  const queryClient = useQueryClient(); // Corrected here
  const navigate = useNavigate();

  const { isLoading: isCheckingOut, mutate: checkout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-out" }),
    onSuccess: (data) => {
      toast.success(`Booking # ${data.id} is checked out`);
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: () => toast.error(`there was an error while checking out`),
  });

  return { isCheckingOut, checkout };
};
