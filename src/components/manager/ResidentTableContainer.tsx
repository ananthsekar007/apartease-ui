import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  makeStyles,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { getManager, getManagerAuthToken } from "../../constants/LocalStorage";
import { ResidentApiRoutes } from "../../routes/ApiRoutes";
import { Resident } from "../../types/ResidentTypes";
import { ActiveResidentsTable } from "./ActiveResidentsTable";
import { InActiveResidentsTable } from "./InActiveResidentsTable";
import { showErrorMessage } from "../Toast";

const styles = {
  tableContainer: {
    display: "flex",
    margin: 20,
    justifyContent: "space-between",
  }
};

export const ResidentTableContainer = () => {
  const [activeResidents, setActiveResidents] = useState<Resident[]>();
  const [inActiveResidents, setInActiveResidents] = useState<Resident[]>();

  const getActiveResidents = async () => {
    const manager = getManager();
    const authToken = getManagerAuthToken();

    const response = await fetch(
      `${ResidentApiRoutes.GetActiveResidents}/${manager?.managerId}`,
      {
        headers: {
          "Authorization": `Bearer ${authToken}`
        }
      }
    );

    if(!response.ok) {
      const error = await response.text();
      showErrorMessage(error);
      return;
    }

    const activeResidents: Resident[] = await response.json();

    setActiveResidents(activeResidents);
  };

  const getInActiveResidents = async () => {
    const manager = getManager();
    const authToken = getManagerAuthToken();
    const response = await fetch(
      `${ResidentApiRoutes.GetInactiveResidents}/${manager?.managerId}`,
      {
        headers: {
          "Authorization": `Bearer ${authToken}`
        }
      }
    );

    if(!response.ok) {
      const error = await response.text();
      showErrorMessage(error);
      return;
    }

    const inActiveResidents: Resident[] = await response.json();

    setInActiveResidents(inActiveResidents);
  };

  const getResidents = async () => {
    await getActiveResidents();
    await getInActiveResidents();
  };

  useEffect(() => {
    getResidents();
  }, []);

  return (
    <div style={{ ...styles.tableContainer }}>
      <ActiveResidentsTable residents={inActiveResidents} onUpdateSuccess={getResidents} />
      <InActiveResidentsTable
        residents={activeResidents}
        onUpdateSuccess={getResidents}
      />
    </div>
  );
};
