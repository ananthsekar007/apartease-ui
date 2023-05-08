import { ResidentLayout } from "./ResidentLayout";
import { useState, useEffect } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { AmenityBooking } from "../../types/AmenityTypes";
import { getResident, getResidentAuthToken } from "../../constants/LocalStorage";
import { AmenityBookingApiRoutes } from "../../routes/ApiRoutes";
import { showErrorMessage } from "../Toast";
import moment from "moment";
import { EditBookingModal } from "./modals/EditBookingModal";

export const ResidentBookingScreen = () => {
  const [bookings, setBookings] = useState<AmenityBooking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<AmenityBooking>();
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const onEditClick = (booking: AmenityBooking) => {
    setSelectedBooking(booking);
    setEditModalOpen(true);
  };

  const getResidentBooking = async () => {
    const resident = getResident();

    const authToken = getResidentAuthToken();

    const response = await fetch(
      `${AmenityBookingApiRoutes.GetAmenitiesForResident}/${resident?.residentId}`,
      {
        headers: {
          "Authorization": `Bearer ${authToken}`
        }
      }
    );
    if (!response.ok) {
      const error = await response.text();
      showErrorMessage(error);
    }

    const residentBookings = await response.json();
    setBookings(residentBookings);
  };

  useEffect(() => {
    getResidentBooking();
  }, []);

  return (
    <>
      <ResidentLayout>
        <Container>
          <TableContainer component={Paper} elevation={4}>
          <Typography
                  variant="h6"
                  textAlign={"center"}
                  style={{
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                >
                  Bookings
                </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Guest Name</TableCell>
                  <TableCell>Guest Email</TableCell>
                  <TableCell>Amenity Name</TableCell>
                  <TableCell>From</TableCell>
                  <TableCell>To</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.amenityBookingId}>
                    <TableCell>{booking.guestName}</TableCell>
                    <TableCell>{booking.guestEmail}</TableCell>
                    <TableCell>{booking.amenity?.amenityName}</TableCell>
                    <TableCell>
                      {moment(booking.from).format("MMMM Do YYYY, h:mm A")}
                    </TableCell>
                    <TableCell>
                      {moment(booking.to).format("MMMM Do YYYY, h:mm A")}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          onEditClick(booking);
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </ResidentLayout>
      <EditBookingModal
        open={editModalOpen}
        bookingDetails={selectedBooking}
        onClose={() => {
          setEditModalOpen(false);
        }}
        onSuccess={() => {
          setEditModalOpen(false);
          getResidentBooking();
        }}
      />
    </>
  );
};
