import { useEffect, useState } from "react";
import { VendorLayout } from "../../components/vendor/VendorLayout";
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
import { WorkOrder } from "../../types/WorkOrderTypes";
import { getVendor } from "../../constants/LocalStorage";
import { showErrorMessage } from "../../components/Toast";
import { WorkOrderApiRoutes } from "../../routes/ApiRoutes";
import { Resident } from "../../types/ResidentTypes";
import { StatusColours, checkVendorValidRoute } from "../../constants/AppConstants";
import { UpdateStatusModal } from "../../components/vendor/modals/UpdateStatusModal";
import { useNavigate } from "react-router-dom";

const getAddress = (resident: Resident | undefined): string => {
  if (!resident) return "";

  const { street, city, state, zip } = resident;
  return `${street}, ${city}, ${state} - ${zip}`;
};

export const OnGoingWorkOrders = () => {
  const [onGoingWorkOrders, setOnGoingWorkOrders] = useState<WorkOrder[]>([]);
  const [updateStatusModalOpen, setUpdateStatusModalOpen] =
    useState<boolean>(false);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder>();
  const navigate = useNavigate();

  const getOnGoingWorkOrders = async () => {
    const vendor = getVendor();
    const response = await fetch(
      `${WorkOrderApiRoutes.GetVendorActiveWorkOrders}/${vendor?.vendorId}`
    );

    if (!response.ok) {
      const error = await response.text();
      showErrorMessage(error);
    }

    const activeOrders = await response.json();

    setOnGoingWorkOrders(activeOrders);
  };

  useEffect(() => {
    if(checkVendorValidRoute()) {

        getOnGoingWorkOrders();
    }
    else {
        navigate("/unauthorized");
    }
  }, []);

  return (
    <>
      <VendorLayout>
        <Container>
          {onGoingWorkOrders && onGoingWorkOrders.length == 0 ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6">
                  No available work orders for now!
                </Typography>
              </div>
            </>
          ) : (
            <>
              <TableContainer component={Paper} elevation={4}>
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
                      <TableCell>Resident Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell>Work Order Title</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Resident Status</TableCell>
                      <TableCell>Vendor Status</TableCell>
                      <TableCell>Update</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {onGoingWorkOrders.map((workOrder) => (
                      <TableRow key={workOrder.workOrderId}>
                        <TableCell>{`${workOrder.resident?.firstName} ${workOrder.resident?.lastName}`}</TableCell>
                        <TableCell>{workOrder.resident?.email}</TableCell>
                        <TableCell>{getAddress(workOrder?.resident)}</TableCell>
                        <TableCell>{workOrder.workOrderTitle}</TableCell>
                        <TableCell>{workOrder.workOrderDescription}</TableCell>
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
                              setUpdateStatusModalOpen(true);
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
      </VendorLayout>
      <UpdateStatusModal
        onClose={() => {
          setUpdateStatusModalOpen(false);
        }}
        onSuccess={() => {
          setUpdateStatusModalOpen(false);
          getOnGoingWorkOrders();
        }}
        open={updateStatusModalOpen}
        workOrder={selectedWorkOrder}
      />
    </>
  );
};
