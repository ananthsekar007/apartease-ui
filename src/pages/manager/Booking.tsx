import { ManagerLayout } from "../../components/manager/ManagerLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AmenityBooking } from "../../types/AmenityTypes";
import moment from "moment";
import { getManager } from "../../constants/LocalStorage";
import { AmenityBookingApiRoutes } from "../../routes/ApiRoutes";
import { showErrorMessage } from "../../components/Toast";

export const ManagerBookings = () => {
  const [bookings, setBookings] = useState<AmenityBooking[]>([]);

  const getBookingsForManager = async () => {
    const manager = getManager();
    const response = await fetch(
      `${AmenityBookingApiRoutes.GetAmenitiesForManager}/${manager?.managerId}`
    );
    if (!response.ok) {
      const error = await response.text();
      showErrorMessage(error);
    }

    const residentBookings = await response.json();
    setBookings(residentBookings);
  };

  useEffect(() => {
    getBookingsForManager();
  }, []);

  return (
    <>
      <ManagerLayout>
        <Container>
          <TableContainer component={Paper} elevation={4}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Resident Name</TableCell>
                  <TableCell>Guest Name</TableCell>
                  <TableCell>Guest Email</TableCell>
                  <TableCell>From</TableCell>
                  <TableCell>To</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.amenityBookingId}>
                    <TableCell
                      component="th"
                      scope="row"
                    >{`${booking.resident?.firstName} ${booking.resident?.lastName}`}</TableCell>
                    <TableCell>{booking.guestName}</TableCell>
                    <TableCell>{booking.guestEmail}</TableCell>
                    <TableCell>
                      {moment(booking.from).format("MMMM Do YYYY, h:mm A")}
                    </TableCell>
                    <TableCell>
                      {moment(booking.to).format("MMMM Do YYYY, h:mm A")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </ManagerLayout>
    </>
  );
};
