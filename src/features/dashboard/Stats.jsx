import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
export default function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}) {
  // 1
  const numBookings = bookings.length;
  //2
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  //3
  const checkins = confirmedStays.length;
  // 4
  const occupation = confirmedStays.reduce(
    (acc, cur) => acc + cur.numNights,
    0
  );
  const possibleOccupations = numDays * 1 * cabinCount;
  const occupationRate = occupation / possibleOccupations;
  return (
    <>
      <Stat
        title="bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupationRate * 100) + "%"}
      />
    </>
  );
}
