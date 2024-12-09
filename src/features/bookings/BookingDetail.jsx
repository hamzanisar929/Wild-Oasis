import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckOut } from "../check-in-out/useCheckout";
import { FiDelete } from "react-icons/fi";
import { useDeleteBooking } from "./useDeleteBooking";
import { useNavigate } from "react-router-dom";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isLoading, booking } = useBooking();
  const { checkOut, isCheckingOut } = useCheckOut();
  const { deleteBookingWithId, isDeletingBooking } = useDeleteBooking();
  const { status, id: bookingId } = booking;
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  if (isLoading) return <Spinner />;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkOut(bookingId)}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>

        <Button
          variation="danger"
          icon={<FiDelete />}
          onClick={() =>
            deleteBookingWithId(bookingId, {
              onSettled: () => navigate(-1),
            })
          }
          disabled={isDeletingBooking}
        >
          Delete booking
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
