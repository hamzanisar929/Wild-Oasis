import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings as getCabinBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const sortRaw = searchParams.get("SortBy") || "startDate-desc";
  const [field, direction] = sortRaw.split("-");
  const sortBy = { field, direction };

  let page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getCabinBookings({ filter, sortBy, page }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page > PAGE_SIZE) {
    page = 1;
  }

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getCabinBookings({ filter, sortBy, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getCabinBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return { isLoading, bookings, error, count };
}
