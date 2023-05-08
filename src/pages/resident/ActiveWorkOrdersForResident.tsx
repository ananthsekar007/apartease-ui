import { ResidentLayout } from "../../components/resident/ResidentLayout";
import { Container, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { WorkOrder } from "../../types/WorkOrderTypes";
import { getResident } from "../../constants/LocalStorage";
import { ResidentApiRoutes } from "../../routes/ApiRoutes";
import { showErrorMessage } from "../../components/Toast";
import { ResidentPending } from "../../components/resident/ResidentPending";
import { ActiveWorkOrderScreen } from "../../components/resident/ActiveWorkOrderScreen";
import { checkResidentValidRoute } from "../../constants/AppConstants";
import { useNavigate } from "react-router-dom";

export const ActiveWorkOrdersForResident = () => {
  const [isApproved, setApproved] = useState<boolean>(false);
  const navigate = useNavigate();

  const getActivityStatus = async () => {
    const resident = getResident();

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
    if (checkResidentValidRoute()) {
      getActivityStatus();
    } else {
      navigate("/unauthorized");
    }
  }, []);

  return <>{isApproved ? <ActiveWorkOrderScreen /> : <ResidentPending />}</>;
};
