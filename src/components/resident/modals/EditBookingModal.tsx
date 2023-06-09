import { AmenityBooking } from "../../../types/AmenityTypes";
import { UIModel } from "../../UIComponents/UIModal";
import { TextField, Tooltip } from "@mui/material";
import { Info } from "@mui/icons-material";
import { UIButton } from "../../UIComponents/UIButton";
import { useState } from "react";
import { getResident, getResidentAuthToken } from "../../../constants/LocalStorage";
import { AmenityBookingApiRoutes } from "../../../routes/ApiRoutes";
import { showErrorMessage } from "../../Toast";
import { isValidEmail } from "../../../constants/AppConstants";

interface EditBookingProps {
  bookingDetails: AmenityBooking | undefined;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const EditBookingModal = (props: EditBookingProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onEdit = async (e: any) => {
    e.preventDefault();

    const formEntries = new FormData(e.target).entries();
    const bookAmenityInput: any = Object.fromEntries(formEntries);

    let isError: boolean = false;

    Object.keys(bookAmenityInput).forEach((input) => {
      if(bookAmenityInput[input] == "" || bookAmenityInput[input] == undefined) {
        showErrorMessage("Please fill all the fields!");
        isError = true;
        return;
      }
    });

    if(isError) return;

    if(!isValidEmail(bookAmenityInput.guestEmail)) {
      showErrorMessage("Check the email and try again!");
      return;
    }

    const resident = getResident();
    const { bookingDetails } = props;

    const body = {
      amenityId: bookingDetails?.amenityId,
      guestName: bookAmenityInput.guestName,
      guestEmail: bookAmenityInput.guestEmail,
      from: bookAmenityInput.from,
      to: bookAmenityInput.to,
      residentId: resident?.residentId,
      amenityBookingId: bookingDetails?.amenityBookingId,
    };

    setLoading(true);

    const authToken = getResidentAuthToken();

    const response = await fetch(AmenityBookingApiRoutes.EditAmenityBooking, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
      body: JSON.stringify(body),
    });

    setLoading(false);

    if (!response.ok) {
      const error = await response.text();
      showErrorMessage(error);
      return;
    }
    props.onSuccess();
  };

  return (
    <>
      <UIModel
        isOpen={props.open}
        onClose={props.onClose}
        title={`Edit Booking`}
        hideCancel
      >
        <form className="auth-form" onSubmit={onEdit}>
          <TextField
            label="Guest Name"
            name="guestName"
            fullWidth
            className="form-element"
            defaultValue={props.bookingDetails?.guestName}
          />
          <TextField
            label="Guest Email"
            name="guestEmail"
            className="form-element"
            fullWidth
            defaultValue={props.bookingDetails?.guestEmail}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Tooltip title="Should only select a maximum total of 4 hrs!">
              <Info />
            </Tooltip>
          </div>
          <label htmlFor="fromDate">From</label>
          <br />
          <input
            type="datetime-local"
            className="date-time-picker form-element"
            name="from"
            id="fromDate"
            defaultValue={props.bookingDetails?.from}
          />
          <label htmlFor="toDate">To</label>
          <br />
          <input
            type="datetime-local"
            className="date-time-picker form-element"
            name="to"
            id="toDate"
            defaultValue={props.bookingDetails?.to}
          />
          <UIButton
            loading={loading}
            fullWidth
            style={{
              marginTop: 20,
            }}
            type="submit"
          >
            Book Now!
          </UIButton>
        </form>
      </UIModel>
    </>
  );
};
