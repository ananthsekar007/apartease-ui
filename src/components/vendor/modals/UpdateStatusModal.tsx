import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { WorkOrder } from "../../../types/WorkOrderTypes";
import { UIModel } from "../../UIComponents/UIModal";
import { VendorStatus } from "../../../constants/AppConstants";
import "../../auth.css";
import { UIButton } from "../../UIComponents/UIButton";
import { useState } from "react";
import { WorkOrderApiRoutes } from "../../../routes/ApiRoutes";
import { showErrorMessage } from "../../Toast";

interface UpdateStatusModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  workOrder: WorkOrder | undefined;
}

export const UpdateStatusModal = (props: UpdateStatusModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onEdit = async (e: any) => {
    const { workOrder } = props;

    e.preventDefault();

    const formEntries = new FormData(e.target).entries();
    const updateStatusInput = Object.fromEntries(formEntries);

    const body = {
      workOrderId: workOrder?.workOrderId,
      workOrderTitle: workOrder?.workOrderTitle,
      workOrderDescription: workOrder?.workOrderDescription,
      vendorId: workOrder?.vendorId,
      residentId: workOrder?.residentId,
      vendorStatus: updateStatusInput.vendorStatus,
      residentStatus: workOrder?.residentStatus,
      acceptedByVendor: workOrder?.acceptedByVendor,
      cancelledByVendor: workOrder?.cancelledByVendor,
    };

    const response = await fetch(`${WorkOrderApiRoutes.UpdateWorkOrder}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      showErrorMessage(error);
      return;
    }

    props.onSuccess();
  };

  return (
    <>
      <UIModel
        isOpen={props.open}
        onClose={props.onClose}
        title="Update Work Order Status"
        hideCancel
      >
        <form className="auth-form" onSubmit={onEdit}>
          <FormControl
            variant="outlined"
            fullWidth
            style={{
              marginTop: 20,
            }}
          >
            <InputLabel id="test-select-label">Select Status</InputLabel>
            <Select
              name="vendorStatus"
              fullWidth
              variant="outlined"
              labelId="test-select-label"
              label="Select Status"
              className="form-element"
              defaultValue={props.workOrder?.vendorStatus}
            >
              <MenuItem value="" disabled>
                Select an option
              </MenuItem>
              {Object.keys(VendorStatus).map((status: string) => (
                <MenuItem value={VendorStatus[status]}>{status}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <UIButton
            loading={loading}
            fullWidth
            style={{
              marginTop: 20,
            }}
            type="submit"
          >
            Update
          </UIButton>
        </form>
      </UIModel>
    </>
  );
};
