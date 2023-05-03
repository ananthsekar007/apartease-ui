import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
} from "@mui/material";
import { Resident, ResidentChangeStatusType } from "../../types/ResidentTypes";
import { UIButton } from "../UIComponents/UIButton";
import { ResidentApiRoutes } from "../../routes/ApiRoutes";

const styles: any = {
  table: {
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    width: "48%",
  },
};

interface ActiveResidentsTableProps {
  residents: Resident[] | undefined;
  onUpdateSuccess: () => void;
}

export const ActiveResidentsTable = ({
  residents,
  onUpdateSuccess
}: ActiveResidentsTableProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedResidentId, setSelectedResidentId] = useState<number>();

  const onApproveClick = async (residentId: number) => {
    setSelectedResidentId(residentId);
    setLoading(true);

    const data: ResidentChangeStatusType = {
        residentId: residentId,
        status: true
    }

    const response = await fetch(`${ResidentApiRoutes.ChangeResidentStatus}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    setLoading(false);

    onUpdateSuccess();

  };

  return (
    <Card style={styles.table} elevation={6}>
      <CardHeader
        title="In-Active Residents"
        style={{
          textAlign: "center",
        }}
      />
      <CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Resident Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {residents && residents.length > 0 ? (
                residents.map((resident: Resident) => (
                  <TableRow key={resident.residentId}>
                    <TableCell>
                      {resident.firstName} {resident.lastName}
                    </TableCell>
                    <TableCell>{resident.email}</TableCell>
                    <TableCell>
                      <UIButton
                        variant="contained"
                        color="primary"
                        loading={
                          resident.residentId == selectedResidentId
                            ? loading
                            : false
                        }
                        onClick={() => {
                          onApproveClick(resident.residentId);
                        }}
                      >
                        Approve
                      </UIButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <Typography variant="h6" color={"grey"}>
                      No residents to display!
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
