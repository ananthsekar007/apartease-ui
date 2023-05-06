import { Amenity } from "../../../types/AmenityTypes";
import { UIModel } from "../../UIComponents/UIModal";
import { TextField, Tooltip } from "@mui/material";
import { Info } from "@mui/icons-material";
import "../../auth.css";
import { UIButton } from "../../UIComponents/UIButton";
import { useState } from "react";
import { IconButton } from "rsuite";
import { AmenityBookingApiRoutes } from "../../../routes/ApiRoutes";
import { getResident } from "../../../constants/LocalStorage";
import { showErrorMessage, showSuccessMessage } from "../../Toast";

interface BookAmenityProps {
  open: boolean;
  onClose: () => void;
  amenity: Amenity;
}

export const BookAmenityModal = (props: BookAmenityProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const formEntries = new FormData(e.target).entries();
    const bookAmenityInput = Object.fromEntries(formEntries);
    const resident = getResident();

    setLoading(false);

    const response = await fetch(AmenityBookingApiRoutes.BookAmenity, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...bookAmenityInput,
        amenityId: props.amenity.amenityId,
        residentId: resident?.residentId,
      }),
    });

    setLoading(false);
    const responseText = await response.text();

    if (!response.ok) {
      showErrorMessage(responseText);
      return;
    }

    showSuccessMessage(responseText);

    props.onClose();
  };

  return (
    <>
      <UIModel
        isOpen={props.open}
        onClose={props.onClose}
        title="Book Amenity"
        hideCancel
      >
        <form className="auth-form" onSubmit={onSubmit}>
          <TextField
            label="Guest Name"
            name="guestName"
            fullWidth
            className="form-element"
          />
          <TextField
            label="Guest Email"
            name="guestEmail"
            className="form-element"
            fullWidth
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
          />
          <label htmlFor="toDate">To</label>
          <br />
          <input
            type="datetime-local"
            className="date-time-picker form-element"
            name="to"
            id="toDate"
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
