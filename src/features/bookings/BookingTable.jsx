import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";
import PropTypes from "prop-types";

function BookingTable({ count }) {
  const { bookings, isLoading } = useBookings();

  if (!isLoading && (!bookings || bookings.length === 0)) {
    return <Empty resourceName="bookings" />;
  }

  if (isLoading) return <Spinner />;
  console.log(bookings);

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>

      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Menus>
  );
}

BookingTable.propTypes = {
  count: PropTypes.number,
};

export default BookingTable;
