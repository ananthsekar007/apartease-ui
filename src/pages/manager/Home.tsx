import React, { useEffect, useState } from "react";
import { ManagerLayout } from "../../components/manager/ManagerLayout";
import { Button, Container, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AddApartmentModal } from "../../components/manager/modals/AddApartmentModal";
import { getManager } from "../../constants/LocalStorage";
import { ApartmentApiRoutes } from "../../routes/ApiRoutes";
import { Apartment } from "../../types/ApartmentTypes";
import ApartmentCard from "../../components/manager/ApartmentCard";
import { ResidentTableContainer } from "../../components/manager/ResidentTableContainer";
import { showErrorMessage } from "../../components/Toast";

export const ManagerHome = () => {
  const [addApartmentOpen, setAddApartmentOpen] = useState<boolean>(false);
  const [apartment, setApartment] = useState<Apartment>();

  const getApartmentForManager = async () => {
    const manager = getManager();
    const response = await fetch(
      `${ApartmentApiRoutes.GetApartmentForManager}/${manager?.managerId}`
    );

    if(!response.ok) {
      const error = await response.text();
      showErrorMessage(error);
      return;
    }

    const apartmentData = await response.json();
    setApartment(apartmentData);
  };

  const onAddApartmentSuccess = () => {
    getApartmentForManager();
  };

  useEffect(() => {
    getApartmentForManager();
  }, []);


  return (
    <>
      <ManagerLayout>
        <Container>
          {!apartment && (
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
                    setAddApartmentOpen(true);
                  }}
                >
                  <AddIcon />
                  <Typography>Add Apartment</Typography>
                </Button>
              </div>
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
          )}

          {apartment && (
            <>
              <ApartmentCard apartment={apartment} />
              <ResidentTableContainer />
            </>
          )}

          <AddApartmentModal
            isOpen={addApartmentOpen}
            onCloseModal={() => {
              setAddApartmentOpen(false);
            }}
            onSuccess={onAddApartmentSuccess}
          />
        </Container>
      </ManagerLayout>
    </>
  );
};
