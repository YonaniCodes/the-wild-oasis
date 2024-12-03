import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";
export default function CheckOutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <Button
      // to={`/checkout/${bookingId}`}
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
      size="small"
      variation="primary"
    >
      Check out
    </Button>
  );
}
