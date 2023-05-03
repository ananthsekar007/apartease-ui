import { FormControlLabel, Switch, TextField } from "@mui/material";
import { UIModel } from "../../UIComponents/UIModal";
import { UIButton } from "../../UIComponents/UIButton";
import { useState } from "react";
import { Amenity } from "../../../types/AmenityTypes";
import { AmenityApiRoutes } from "../../../routes/ApiRoutes";

interface ViewEditAmenityModalProps {
  open: boolean;
  onCloseModal: () => void;
  amenity: Amenity;
  viewDetails: boolean;
  onEditSuccess?: () => void;
}

export const ViewEditAmenityModal = (props: ViewEditAmenityModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [allowWeekend, setAllowWeekend] = useState<boolean>(
    props.amenity.allowWeekend
  );

  const {
    amenityAddress,
    amenityContactNumber,
    amenityDescription,
    amenityName,
    mininumBookingHour,
    apartmentId,
    amenityId,
  } = props.amenity;

  const handleKeyDown = (event: any) => {
    if (event.keyCode !== 38 && event.keyCode !== 40) {
      event.preventDefault(); // prevent manual input
    }
  };

  const handleWeekendToggle = () => {
    setAllowWeekend(!allowWeekend);
  };

  const onEditAmenity = async (e: any) => {

    e.preventDefault();

    const formEntries = new FormData(e.target).entries();
    const editAmenityInput = Object.fromEntries(formEntries);

    console.log("Edit click", {
        ...editAmenityInput,
        allowWeekend,
        apartmentId,
        amenityId,
      })

    setLoading(true);

    const response = await fetch(AmenityApiRoutes.UpdateAmenity, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...editAmenityInput,
        minimumBookingHour: Number(editAmenityInput.minimumBookingHour),
        allowWeekend,
        apartmentId,
        amenityId,
      }),
    });
    setLoading(false);

    props.onCloseModal();

    props.onEditSuccess && props.onEditSuccess();
  };

  return (
    <UIModel
      isOpen={props.open}
      title={props.viewDetails ? "View Amenity" : "Update Amenity"}
      onClose={props.onCloseModal}
      hideCancel
    >
      <form className="auth-form" onSubmit={onEditAmenity}>
        <FormControlLabel
          className="form-element"
          control={
            <Switch
              name="allowWeekend"
              checked={allowWeekend}
              onChange={handleWeekendToggle}
              color="primary"
              disabled={props.viewDetails}
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
          disabled={props.viewDetails}
          defaultValue={amenityName}
        />
        <TextField
          label="Description"
          name="amenityDescription"
          fullWidth
          className="form-element"
          disabled={props.viewDetails}
          defaultValue={amenityDescription}
        />
        <TextField
          label="Contact Number"
          name="amenityContactNumber"
          fullWidth
          className="form-element"
          type="tel"
          disabled={props.viewDetails}
          defaultValue={amenityContactNumber}
        />
        <TextField
          label="Address"
          name="amenityAddress"
          fullWidth
          className="form-element"
          multiline
          disabled={props.viewDetails}
          defaultValue={amenityAddress}
        />
        <TextField
          label="Minimum Booking Hour"
          name="mininumBookingHour"
          fullWidth
          className="form-element"
          type="number"
          disabled={props.viewDetails}
          defaultValue={mininumBookingHour}
          InputProps={{
            onKeyDown: handleKeyDown,
          }}
          inputProps={{
            min: 0,
            step: 1,
            max: 4,
          }}
        />
        {!props.viewDetails && (
          <UIButton
            className="form-element"
            type="submit"
            loading={loading}
            fullWidth
          >
            Edit
          </UIButton>
        )}
      </form>
    </UIModel>
  );
};
