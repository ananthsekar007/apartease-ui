import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import AmenityImage from "../../assets/Amenity.jpg";
import { cardMediaStyles } from "./ApartmentCard";
import { Amenity } from "../../types/AmenityTypes";
import { ViewEditAmenityModal } from "./modals/ViewEditAmenityModal";
import { useState } from "react";

interface AmenityCardProps {
  amenity: Amenity;
  onEditSuccess?: () => void;
}

export const AmenityCard = ({ amenity, onEditSuccess }: AmenityCardProps) => {
  const [viewModalOpen, setViewModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  return (
    <>
      <Card elevation={6} style={{ borderRadius: 5 }}>
        <CardMedia style={cardMediaStyles.media} image={AmenityImage}>
          <div style={cardMediaStyles.fadeOverlay} />
        </CardMedia>
        <CardContent>
          <Typography variant="h5" fontWeight={400}>
            {amenity.amenityName}
          </Typography>
        </CardContent>
        <CardActions
          style={{ display: "flex", justifyContent: "space-evenly" }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setViewModalOpen(true);
            }}
          >
            View
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setEditModalOpen(true);
            }}
          >
            Edit
          </Button>
        </CardActions>
      </Card>
      <ViewEditAmenityModal
        open={viewModalOpen}
        amenity={amenity}
        onCloseModal={() => {
          setViewModalOpen(false);
        }}
        viewDetails
      />
      <ViewEditAmenityModal
        open={editModalOpen}
        amenity={amenity}
        onCloseModal={() => {
          setEditModalOpen(false);
        }}
        viewDetails={false}
        onEditSuccess={onEditSuccess}
      />
    </>
  );
};
