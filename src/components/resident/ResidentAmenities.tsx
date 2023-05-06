import { ResidentLayout } from "./ResidentLayout";
import { Container, Button, Typography, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { Amenity } from "../../types/AmenityTypes";
import { getResident } from "../../constants/LocalStorage";
import { AmenityApiRoutes } from "../../routes/ApiRoutes";
import { showErrorMessage } from "../Toast";
import { BookAmenityCard } from "./BookAmenityCard";
import EmptyImage from "../../assets/Empty.png";

export const ResidentAmenities = () => {
  const [amenities, setAmenities] = useState<Amenity[]>([]);

  const getAmenities = async () => {
    const resident = getResident();
    const response = await fetch(
      `${AmenityApiRoutes.GetAmenityForApartment}/${resident?.apartmentId}`
    );
    if (!response.ok) {
      const error = await response.text();
      showErrorMessage(error);
    }

    const amenities = await response.json();

    console.log({ amenities });
    setAmenities(amenities);
  };

  useEffect(() => {
    getAmenities();
  }, []);

  return (
    <ResidentLayout>
      <Container>
        {amenities && amenities.length > 0 ? (
          <>
            <Grid container spacing={3}>
              {amenities.map((amenity, index) => (
                <Grid item xs={4} key={index}>
                  <BookAmenityCard amenity={amenity} key={index} />
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <>
            <Container
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 40,
              }}
            >
              <Typography variant="h6" fontStyle={"italic"}>
                No amenities to display!
              </Typography>
              <img src={EmptyImage} height={350} width={500} />
            </Container>
          </>
        )}
      </Container>
    </ResidentLayout>
  );
};
