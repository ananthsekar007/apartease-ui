import React, { useEffect, useState } from "react";
import { ManagerLayout } from "../../components/manager/ManagerLayout";
import { Button, Container, Typography, Grid } from "@mui/material";
import { AmenityApiRoutes, ApartmentApiRoutes } from "../../routes/ApiRoutes";
import { Apartment } from "../../types/ApartmentTypes";
import { getManager, getManagerAuthToken } from "../../constants/LocalStorage";
import AddIcon from "@mui/icons-material/Add";
import NoDataImage from "../../assets/NoData.jpg";
import { AddAmenityModal } from "../../components/manager/modals/AddAmenityModal";
import AmenityImage from "../../assets/Amenity.jpg";
import { AmenityCard } from "../../components/manager/AmenityCard";
import { Amenity } from "../../types/AmenityTypes";
import { showErrorMessage } from "../../components/Toast";
import { useNavigate } from "react-router-dom";
import { checkManagerValidRoute } from "../../constants/AppConstants";
import Image from "../../assets/NoData.jpg";

export const ManageAmenities = () => {
  const [apartment, setApartment] = useState<Apartment>();
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [addAmenityModalOpen, setAddAmenityModalOpen] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const getApartmentForManager = async () => {
    const manager = getManager();
    const authToken = getManagerAuthToken();
    const response = await fetch(
      `${ApartmentApiRoutes.GetApartmentForManager}/${manager?.managerId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
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
    const authToken = getManagerAuthToken();

    const response = await fetch(
      `${AmenityApiRoutes.GetAmenityForApartment}/${apartmentId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
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
    if (checkManagerValidRoute()) {
      getApartmentForManager();
    } else {
      navigate("/unauthorized");
    }
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
              <Container
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: 40,
                }}
              >
                <Typography variant="h6" fontStyle={"italic"}>
                  Add an Apartment to get started!
                </Typography>
                <img src={Image} height={400} width={500} />
              </Container>
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
