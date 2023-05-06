import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  CardMedia,
  Typography,
} from "@mui/material";
import { Amenity } from "../../types/AmenityTypes";
import { cardMediaStyles } from "../manager/ApartmentCard";
import AmenityImage from "../../assets/Amenity.jpg";
import { ViewAmenityModal } from "./modals/ViewAmenityModal";
import { BookAmenityModal } from "./modals/BookAmenityModal";

interface BookAmenityProps {
  amenity: Amenity;
}

export const BookAmenityCard = ({ amenity }: BookAmenityProps) => {
  const [viewAmenityModalOpen, setViewAmenityModalOpen] =
    useState<boolean>(false);
  const [bookAmenityModalOpen, setBookAmenityModalOpen] =
    useState<boolean>(false);

  return (
    <>
      <Card elevation={6}>
        <CardMedia style={cardMediaStyles.media} image={AmenityImage}>
          <div style={cardMediaStyles.fadeOverlay} />
        </CardMedia>
        <CardContent>
          <Typography variant="h5" fontWeight={400}>
            {amenity.amenityName}
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: "space-evenly" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setViewAmenityModalOpen(true);
            }}
          >
            View Details
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setBookAmenityModalOpen(true);
            }}
          >
            Book Now
          </Button>
        </CardActions>
      </Card>
      <ViewAmenityModal
        amenity={amenity}
        open={viewAmenityModalOpen}
        onClose={() => {
          setViewAmenityModalOpen(false);
        }}
      />
      <BookAmenityModal 
        amenity={amenity}
        open={bookAmenityModalOpen}
        onClose={() => {
          setBookAmenityModalOpen(false);
        }}
      />
    </>
  );
};
