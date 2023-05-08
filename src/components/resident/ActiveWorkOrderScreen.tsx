import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ResidentLayout } from "./ResidentLayout";
import { useEffect, useState } from "react";
import { WorkOrder } from "../../types/WorkOrderTypes";
import { getResident, getResidentAuthToken } from "../../constants/LocalStorage";
import { WorkOrderApiRoutes } from "../../routes/ApiRoutes";
import { showErrorMessage } from "../Toast";
import { StatusColours } from "../../constants/AppConstants";
import { UpdateWorkOrderStatusModal } from "./modals/UpdateWorkOrderStatusModal";
import Image from "../../assets/NoData.jpg";

export const ActiveWorkOrderScreen = () => {
  const [activeWorkOrders, setActiveWorkOrders] = useState<WorkOrder[]>([]);
  const [updateStatusOpen, setUpdateStatusOpen] = useState<boolean>(false);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder>();

  const getActiveWorkOrders = async () => {
    const resident = getResident();
    const authToken = getResidentAuthToken();
    const response = await fetch(
      `${WorkOrderApiRoutes.GetResidentActiveWorkOrders}/${resident?.residentId}`,
      {
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
      }
    );

    if (!response.ok) {
      const error = await response.text();
      showErrorMessage(error);
    }

    const activeOrders = await response.json();

    setActiveWorkOrders(activeOrders);
  };

  useEffect(() => {
    getActiveWorkOrders();
  }, []);

  return (
    <>
      <ResidentLayout>
        <Container>
          {activeWorkOrders && activeWorkOrders.length == 0 ? (
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
            No Active work orders for you!
          </Typography>
          <img src={Image} height={400} width={500} />
        </Container>
            </>
          ) : (
            <>
              <TableContainer component={Paper}>
                <Typography
                  variant="h6"
                  textAlign={"center"}
                  style={{
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                >
                  On-Going Work Orders
                </Typography>
                <Table
                  sx={{ minWidth: 650 }}
                  aria-label="resident work orders table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Vendor Name</TableCell>
                      <TableCell>Vendor Email</TableCell>
                      <TableCell>Vendor Category</TableCell>
                      <TableCell>Resident Status</TableCell>
                      <TableCell>Vendor Status</TableCell>
                      <TableCell>Update</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {activeWorkOrders.map((workOrder) => (
                      <TableRow key={workOrder.workOrderId}>
                        <TableCell>{workOrder.workOrderTitle}</TableCell>
                        <TableCell width={200}>
                          {workOrder.workOrderDescription}
                        </TableCell>
                        <TableCell>{`${workOrder.vendor?.firstName} ${workOrder.vendor?.lastName}`}</TableCell>
                        <TableCell>{workOrder.vendor?.email}</TableCell>
                        <TableCell>
                          {workOrder.vendor?.company?.category?.categoryName}
                        </TableCell>
                        <TableCell>
                          <Typography
                            color={StatusColours[workOrder.residentStatus]}
                          >
                            {workOrder.residentStatus}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            color={StatusColours[workOrder.vendorStatus]}
                          >
                            {workOrder.vendorStatus}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="warning"
                            onClick={() => {
                              setSelectedWorkOrder(workOrder);
                              setUpdateStatusOpen(true);
                            }}
                          >
                            Update
                          </Button>
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
      <UpdateWorkOrderStatusModal
        open={updateStatusOpen}
        onClose={() => {
          setUpdateStatusOpen(false);
        }}
        onSuccess={() => {
          setUpdateStatusOpen(false);
          getActiveWorkOrders();
        }}
        workOrder={selectedWorkOrder}
      />
    </>
  );
};
