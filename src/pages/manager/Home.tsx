import React, { useEffect, useState } from "react";
import { ManagerLayout } from "../../components/manager/ManagerLayout";
import { Button, Container, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AddApartmentModal } from "../../components/manager/modals/AddApartmentModal";
import { getManager, getManagerAuthToken } from "../../constants/LocalStorage";
import { ApartmentApiRoutes } from "../../routes/ApiRoutes";
import { Apartment } from "../../types/ApartmentTypes";
import ApartmentCard from "../../components/manager/ApartmentCard";
import { ResidentTableContainer } from "../../components/manager/ResidentTableContainer";
import { showErrorMessage } from "../../components/Toast";
import { checkManagerValidRoute } from "../../constants/AppConstants";
import { useNavigate } from "react-router-dom";
import Image from "../../assets/NoData.jpg";

export const ManagerHome = () => {
  const [addApartmentOpen, setAddApartmentOpen] = useState<boolean>(false);
  const [apartment, setApartment] = useState<Apartment>();
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

  const onAddApartmentSuccess = () => {
    getApartmentForManager();
  };

  useEffect(() => {
    if (checkManagerValidRoute()) {
      getApartmentForManager();
    } else {
      navigate("/unauthorized");
    }
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
              <Container
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: 40,
                }}
              >
                <Typography variant="h6" fontStyle={"italic"}>
                  Add an apartment to get started!
                </Typography>
                <img src={Image} height={400} width={500} />
              </Container>
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
