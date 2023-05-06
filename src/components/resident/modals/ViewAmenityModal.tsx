import { Amenity } from "../../../types/AmenityTypes";
import { UIModel } from "../../UIComponents/UIModal";
import { Typography, Container } from "@mui/material";

interface ViewAmenityModalProps {
  open: boolean;
  onClose: () => void;
  amenity: Amenity;
}

export const ViewAmenityModal = (props: ViewAmenityModalProps) => {
  return (
    <>
      <UIModel
        isOpen={props.open}
        onClose={props.onClose}
        title={`View ${props.amenity.amenityName} Amenity`}
      >
        <Typography variant="body1">
          <strong>Description : </strong>{props.amenity.amenityDescription}
        </Typography>

        <Typography variant="body1">
          <strong>Contact Number : </strong> {props.amenity.amenityContactNumber}
        </Typography>
        <Typography variant="body1">
          <strong>Address : </strong>
          {props.amenity.amenityAddress}
        </Typography>
        <Typography variant="body1">
          <strong>Open on weekends? : </strong>
          {props.amenity.allowWeekend ? "Yes" : "No"}
        </Typography>
        <Typography variant="body1">
          <strong>Minimum Booking Hour : </strong>
          {props.amenity.mininumBookingHour} hr(s)
        </Typography>
      </UIModel>
    </>
  );
};
