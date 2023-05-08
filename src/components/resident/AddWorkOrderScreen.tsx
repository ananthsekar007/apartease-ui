import { ResidentLayout } from "./ResidentLayout";
import {
  Container,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { getResident } from "../../constants/LocalStorage";
import { WorkOrderApiRoutes } from "../../routes/ApiRoutes";
import { showErrorMessage } from "../Toast";
import { WorkOrder } from "../../types/WorkOrderTypes";
import { AddWorkOrderModal } from "./modals/AddWorkOrderModal";

export const AddWorkOrderScreen = () => {
  const [addWorkOrderModalOpen, setAddWorkOrderModalOpen] =
    useState<boolean>(false);

  const [inActiveWorkOrders, setInActiveWorkOrders] = useState<WorkOrder[]>([]);

  const getInActiveWorkOrders = async () => {
    const resident = getResident();
    const response = await fetch(
      `${WorkOrderApiRoutes.GetResidentInActiveWorkOrders}/${resident?.residentId}`
    );

    if (!response.ok) {
      const error = await response.text();
      showErrorMessage(error);
    }

    const inActiveOrders = await response.json();

    setInActiveWorkOrders(inActiveOrders);
  };

  useEffect(() => {
    getInActiveWorkOrders();
  }, []);

  return (
    <>
      <ResidentLayout>
        <Container>
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
                setAddWorkOrderModalOpen(true);
              }}
            >
              <AddIcon />
              <Typography>Add Work Order</Typography>
            </Button>
          </div>
          {inActiveWorkOrders && inActiveWorkOrders.length == 0 ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6">
                  Add Work order to get started!
                </Typography>
              </div>
            </>
          ) : (
            <>
              <TableContainer component={Paper} style={{
                marginTop: 20
              }} elevation={4}>
                <Typography
                  variant="h6"
                  textAlign={"center"}
                  style={{
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                >
                  Pending Work Orders
                </Typography>
                <Table aria-label="my table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Vendor Name</TableCell>
                      <TableCell>Vendor Company Name</TableCell>
                      <TableCell>Vendor Category</TableCell>
                      <TableCell>Acceptance Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {inActiveWorkOrders.map((workOrder) => (
                      <TableRow key={workOrder.workOrderId}>
                        <TableCell>{workOrder.workOrderTitle}</TableCell>
                        <TableCell>{workOrder.workOrderDescription}</TableCell>
                        <TableCell>{`${workOrder.vendor?.firstName} ${workOrder.vendor?.lastName}`}</TableCell>
                        <TableCell>
                          {workOrder.vendor?.company?.companyName}
                        </TableCell>
                        <TableCell>
                          {workOrder.vendor?.company?.category?.categoryName}
                        </TableCell>
                        <TableCell
                          style={{
                            color: "red",
                          }}
                        >
                          {"PENDING"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Container>
      </ResidentLayout>
      <AddWorkOrderModal
        open={addWorkOrderModalOpen}
        onClose={() => {
          setAddWorkOrderModalOpen(false);
        }}
        onSuccess={() => {
            setAddWorkOrderModalOpen(false);
            getInActiveWorkOrders();
        }}
      />
    </>
  );
};
