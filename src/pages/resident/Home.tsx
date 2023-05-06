import React, { useState, useEffect } from "react";
import { ResidentPending } from "../../components/resident/ResidentPending";
import { getResident } from "../../constants/LocalStorage";
import { ResidentApiRoutes } from "../../routes/ApiRoutes";
import { showErrorMessage } from "../../components/Toast";
import { ResidentAmenities } from "../../components/resident/ResidentAmenities";


export const ResidentHome = () => {
  const [isApproved, setApproved] = useState<boolean>(false);

  const getActivityStatus = async () => {
    const resident = getResident();

    console.log("The function gets called", { resident });

    const response = await fetch(
      `${ResidentApiRoutes.GetResidentActivityStatus}/${resident?.residentId}`
    );

    if (!response.ok) {
      const error = await response.text();
      showErrorMessage(error);
      return;
    }
    const isActive = await response.json();

    setApproved(isActive);
  };
  useEffect(() => {
    getActivityStatus();
  }, []);

  return <>{isApproved ? <ResidentAmenities /> : <ResidentPending />}</>;
};
