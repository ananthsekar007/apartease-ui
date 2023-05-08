import React, {useState} from "react";
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
import { showErrorMessage } from "../Toast";
import { getManagerAuthToken } from "../../constants/LocalStorage";

const styles: any = {
  table: {
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    width: "48%",
  },
};

interface InActiveResidentsTableProps {
  residents: Resident[] | undefined;
  onUpdateSuccess: () => void;
}

export const InActiveResidentsTable = ({
  residents,
  onUpdateSuccess
}: InActiveResidentsTableProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedResidentId, setSelectedResidentId] = useState<number>();

    const onDeactivateClick = async (residentId: number) => {
        setSelectedResidentId(residentId);
        setLoading(true);
    
        const data: ResidentChangeStatusType = {
            residentId: residentId,
            status: false
        }
    
        const authToken = getManagerAuthToken();

        const response = await fetch(`${ResidentApiRoutes.ChangeResidentStatus}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
          },
          body: JSON.stringify(data),
        });
    
        setLoading(false);

        if(!response.ok) {
          const error = await response.text();
          showErrorMessage(error);
          return;
        }
    
        onUpdateSuccess();
    
      };
  return (
    <Card style={styles.table} elevation={4}>
      <CardHeader
        title="Active Residents"
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
                        color="secondary"
                        loading={resident.residentId == selectedResidentId ? loading : false}
                        onClick={() => {
                            onDeactivateClick(resident.residentId);
                          }}
                      >
                        Deactivate
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
