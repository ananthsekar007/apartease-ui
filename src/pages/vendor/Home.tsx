import React, { useEffect, useState } from "react";
import { VendorLayout } from "../../components/vendor/VendorLayout";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { WorkOrder } from "../../types/WorkOrderTypes";
import { getVendor, getVendorAuthToken } from "../../constants/LocalStorage";
import { WorkOrderApiRoutes } from "../../routes/ApiRoutes";
import { showErrorMessage } from "../../components/Toast";
import CheckCircleOutlineIcon from "@mui/icons-material/Check";
import CancelOutlinedIcon from "@mui/icons-material/Cancel";
import { ResidentStatus, VendorStatus, checkVendorValidRoute } from "../../constants/AppConstants";
import { useNavigate } from "react-router-dom";

export const VendorHome = () => {
  const [inActiveWorkOrders, setInActiveWorkOrders] = useState<WorkOrder[]>([]);
  const navigate = useNavigate();

  const getInActiveWorkOrders = async () => {
    const vendor = getVendor();

    const authToken = getVendorAuthToken();

    const response = await fetch(
      `${WorkOrderApiRoutes.GetVendorInActiveWorkOrders}/${vendor?.vendorId}`,
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

    const inActiveOrders = await response.json();

    setInActiveWorkOrders(inActiveOrders);
  };

  const handleApprove = async (
    {
      residentId,
      vendorId,
      workOrderDescription,
      workOrderId,
      workOrderTitle,
    }: WorkOrder,
    isApprove: boolean
  ) => {
    const body = {
      acceptedByVendor: isApprove ? true : false,
      cancelledByVendor: isApprove ? false : true,
      residentId,
      vendorId,
      vendorStatus: isApprove ? VendorStatus.OnGoing: "",
      residentStatus: isApprove ? ResidentStatus.OnGoing: "",
      workOrderDescription,
      workOrderId,
      workOrderTitle,
    };

    const authToken = getVendorAuthToken();

    const response = await fetch(`${WorkOrderApiRoutes.UpdateWorkOrder}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      showErrorMessage(error);
      return;
    }

    getInActiveWorkOrders();
  };

  useEffect(() => {
    if(checkVendorValidRoute()) {
      getInActiveWorkOrders();
    }
    else {
      navigate("/unauthorized");
    }
  }, []);

  return (
    <>
      <VendorLayout>
        <Container>
          {inActiveWorkOrders.length == 0 ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6">
                  You'll have something to work on when the residents need your
                  help!
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
                    marginBottom: 20
                  }}
                >
                  Work Order Approval
                </Typography>
                <Table
                  sx={{ minWidth: 650 }}
                  aria-label="resident work orders table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Resident Name</TableCell>
                      <TableCell>Resident Email</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {inActiveWorkOrders &&
                      inActiveWorkOrders.length > 0 &&
                      inActiveWorkOrders.map((workOrder) => (
                        <TableRow key={workOrder.workOrderId}>
                          <TableCell>{`${workOrder.resident?.firstName} ${workOrder.resident?.lastName}`}</TableCell>
                          <TableCell>{`${workOrder.resident?.email}`}</TableCell>
                          <TableCell>{workOrder.workOrderTitle}</TableCell>
                          <TableCell>
                            {workOrder.workOrderDescription}
                          </TableCell>
                          <TableCell>
                            <>
                              <Button
                                variant="contained"
                                color="success"
                                style={{
                                  marginRight: 20,
                                }}
                                onClick={() => {
                                  handleApprove(workOrder, true);
                                }}
                              >
                                <CheckCircleOutlineIcon />
                              </Button>
                              <Button
                                variant="contained"
                                color="error"
                                onClick={() => {
                                  handleApprove(workOrder, false);
                                }}
                              >
                                <CancelOutlinedIcon />
                              </Button>
                            </>
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
    </>
  );
};
