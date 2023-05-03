import React, { useState } from "react";
import { UIModel } from "../../UIComponents/UIModal";
import { UIButton } from "../../UIComponents/UIButton";
import "../../auth.css";
import { FormControlLabel, Switch, TextField } from "@mui/material";
import { AmenityApiRoutes } from "../../../routes/ApiRoutes";
import { Apartment } from "../../../types/ApartmentTypes";

interface AddAmenityModalProps {
  open: boolean;
  onCloseModal: () => void;
  onSuccess: (apartmentId: number | undefined) => void;
  apartmentId: number | undefined;
}

export const AddAmenityModal = (props: AddAmenityModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [allowWeekend, setAllowWeekend] = useState(true);

  const handleWeekendToggle = () => {
    setAllowWeekend(!allowWeekend);
  };

  const handleKeyDown = (event: any) => {
    if (event.keyCode !== 38 && event.keyCode !== 40) {
      event.preventDefault(); // prevent manual input
    }
  };

  const onAddAmenity = async (e: any) => {
    e.preventDefault();

    const formEntries = new FormData(e.target).entries();
    const addAmenityInput = Object.fromEntries(formEntries);

    setLoading(true);

    const response = await fetch(AmenityApiRoutes.AddAmenity, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...addAmenityInput,
        allowWeekend,
        apartmentId: props?.apartmentId,
      }),
    });
    setLoading(false);

    props.onSuccess(props?.apartmentId);
    props.onCloseModal();
  };

  return (
    <>
      <UIModel
        isOpen={props.open}
        title="Add Amenity"
        onClose={props.onCloseModal}
        hideCancel
      >
        <form onSubmit={onAddAmenity} className="auth-form">
          <FormControlLabel
            className="form-element"
            control={
              <Switch
                name="allowWeekend"
                checked={allowWeekend}
                onChange={handleWeekendToggle}
                color="primary"
              />
            }
            label="Do you want the amenity to be open on weekends?"
            labelPlacement="start"
          />
          <TextField
            label="Name"
            name="amenityName"
            fullWidth
            className="form-element"
          />
          <TextField
            label="Description"
            name="amenityDescription"
            fullWidth
            className="form-element"
          />
          <TextField
            label="Contact Number"
            name="amenityContactNumber"
            fullWidth
            className="form-element"
            type="tel"
          />
          <TextField
            label="Address"
            name="amenityAddress"
            fullWidth
            className="form-element"
            multiline
          />
          <TextField
            label="Minimum Booking Hour"
            name="mininumBookingHour"
            fullWidth
            className="form-element"
            type="number"
            InputProps={{
              onKeyDown: handleKeyDown,
            }}
            inputProps={{
              min: 0,
              step: 1,
              max: 4,
            }}
          />
          <UIButton
            className="form-element"
            type="submit"
            loading={loading}
            fullWidth
          >
            Add
          </UIButton>
        </form>
      </UIModel>
    </>
  );
};
