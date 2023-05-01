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
import { getManager } from "../../constants/LocalStorage";
import { ResidentApiRoutes } from "../../routes/ApiRoutes";
import { Resident } from "../../types/ResidentTypes";
import { ActiveResidentsTable } from "./ActiveResidentsTable";
import { InActiveResidentsTable } from "./InActiveResidentsTable";

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

  const handleApprove = (id: any) => {
    console.log(`Approving resident with id ${id}`);
  };

  const handleDeactivate = (id: any) => {
    console.log(`Deactivating resident with id ${id}`);
  };

  const getActiveResidents = async () => {
    const manager = getManager();
    const response = await fetch(
      `${ResidentApiRoutes.GetActiveResidents}/${manager?.managerId}`
    );

    const activeResidents: Resident[] = await response.json();

    setActiveResidents(activeResidents);
  };

  const getInActiveResidents = async () => {
    const manager = getManager();
    const response = await fetch(
      `${ResidentApiRoutes.GetInactiveResidents}/${manager?.managerId}`
    );

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
      <ActiveResidentsTable residents={activeResidents} onUpdateSuccess={getResidents} />
      <InActiveResidentsTable
        residents={inActiveResidents}
        onUpdateSuccess={getResidents}
      />
    </div>
  );
};
