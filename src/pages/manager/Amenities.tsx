import React, { useEffect, useState } from "react";
import { ManagerLayout } from "../../components/manager/ManagerLayout";
import { Button, Container, Typography, Grid } from "@mui/material";
import { AmenityApiRoutes, ApartmentApiRoutes } from "../../routes/ApiRoutes";
import { Apartment } from "../../types/ApartmentTypes";
import { getManager } from "../../constants/LocalStorage";
import AddIcon from "@mui/icons-material/Add";
import NoDataImage from "../../assets/NoData.jpg";
import { AddAmenityModal } from "../../components/manager/modals/AddAmenityModal";
import AmenityImage from "../../assets/Amenity.jpg";
import { AmenityCard } from "../../components/manager/AmenityCard";
import { Amenity } from "../../types/AmenityTypes";
import { showErrorMessage } from "../../components/Toast";

const items = [
  { id: 1, name: "Item 1", imageUrl: AmenityImage },
  { id: 2, name: "Item 2", imageUrl: AmenityImage },
  { id: 3, name: "Item 3", imageUrl: AmenityImage },
  { id: 4, name: "Item 4", imageUrl: AmenityImage },
  { id: 5, name: "Item 5", imageUrl: AmenityImage },
];

export const ManageAmenities = () => {
  const [apartment, setApartment] = useState<Apartment>();
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [addAmenityModalOpen, setAddAmenityModalOpen] =
    useState<boolean>(false);

  const getApartmentForManager = async () => {
    const manager = getManager();
    const response = await fetch(
      `${ApartmentApiRoutes.GetApartmentForManager}/${manager?.managerId}`
    );

    if (!response.ok) {
      const error = await response.text();
      showErrorMessage(error);
      return;
    }

    const apartmentData = await response.json();
    setApartment(apartmentData);
  };

  const getAmenitiesForApartment = async (apartmentId: number) => {
    const response = await fetch(
      `${AmenityApiRoutes.GetAmenityForApartment}/${apartmentId}`
    );
    if (!response.ok) {
      const error = await response.text();
      showErrorMessage(error);
      return;
    }
    const amenityData = await response.json();
    setAmenities(amenityData);
  };

  useEffect(() => {
    getApartmentForManager();
  }, []);

  useEffect(() => {
    if (apartment && apartment.apartmentId) {
      getAmenitiesForApartment(apartment.apartmentId);
    }
  }, [JSON.stringify(apartment)]);

  return (
    <>
      <ManagerLayout>
        <Container>
          {!apartment ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6">
                  Add an Apartment to get started!
                </Typography>
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    setAddAmenityModalOpen(true);
                  }}
                >
                  <AddIcon />
                  <Typography>Add Amenity</Typography>
                </Button>
              </div>
              {amenities && amenities.length > 0 ? (
                <>
                  <Grid container spacing={2} marginTop={2}>
                    {amenities &&
                      amenities.length > 0 &&
                      amenities.map((amenity: Amenity) => (
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          key={amenity.amenityId}
                        >
                          <AmenityCard
                            amenity={amenity}
                            onEditSuccess={() => {
                              getAmenitiesForApartment(amenity.apartmentId);
                            }}
                          />
                        </Grid>
                      ))}
                  </Grid>
                </>
              ) : (
                <>
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <img
                      src={NoDataImage}
                      alt="No Data"
                      style={{ height: "70vh", margin: "10px auto" }}
                    />
                  </div>
                </>
              )}
            </>
          )}
        </Container>
      </ManagerLayout>
      <AddAmenityModal
        onCloseModal={() => {
          setAddAmenityModalOpen(false);
        }}
        open={addAmenityModalOpen}
        onSuccess={(apartmentId: any) => {
          getAmenitiesForApartment(apartmentId);
        }}
        apartmentId={apartment?.apartmentId}
      />
    </>
  );
};
