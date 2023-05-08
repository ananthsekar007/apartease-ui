import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { WorkOrder } from "../../../types/WorkOrderTypes";
import { UIModel } from "../../UIComponents/UIModal";
import { UIButton } from "../../UIComponents/UIButton";
import { useState } from "react";
import { WorkOrderApiRoutes } from "../../../routes/ApiRoutes";
import { showErrorMessage } from "../../Toast";
import { ResidentStatus } from "../../../constants/AppConstants";
import "../../auth.css";
import { getResidentAuthToken } from "../../../constants/LocalStorage";

interface UpdateWorkOrderStatusModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  workOrder: WorkOrder | undefined;
}

export const UpdateWorkOrderStatusModal = (
  props: UpdateWorkOrderStatusModalProps
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const onEdit = async (e: any) => {
    const { workOrder } = props;

    e.preventDefault();

    const formEntries = new FormData(e.target).entries();
    const updateWorkOrderInput = Object.fromEntries(formEntries);

    const body = {
      workOrderId: workOrder?.workOrderId,
      workOrderTitle: updateWorkOrderInput.workOrderTitle,
      workOrderDescription: updateWorkOrderInput.workOrderDescription,
      vendorId: workOrder?.vendorId,
      residentId: workOrder?.residentId,
      vendorStatus: workOrder?.vendorStatus,
      residentStatus: updateWorkOrderInput.residentStatus,
      acceptedByVendor: workOrder?.acceptedByVendor,
      cancelledByVendor: workOrder?.cancelledByVendor,
    };

    setLoading(true);

    const authToken = getResidentAuthToken();

    const response = await fetch(`${WorkOrderApiRoutes.UpdateWorkOrder}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
      body: JSON.stringify(body),
    });

    setLoading(false);

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
        title="Update Work Order"
        hideCancel
      >
        <form className="auth-form" onSubmit={onEdit} >
          <TextField
            label="Title"
            name="workOrderTitle"
            className="form-element"
            style={{
              marginTop: 20,
            }}
            fullWidth
            defaultValue={props.workOrder?.workOrderTitle}
          />
          <TextField
            label="description"
            name="workOrderDescription"
            className="form-element"
            fullWidth
            multiline
            defaultValue={props.workOrder?.workOrderDescription}
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="test-select-label">Select Status</InputLabel>
            <Select
              name="residentStatus"
              fullWidth
              variant="outlined"
              labelId="test-select-label"
              label="Select Status"
              className="form-element"
              defaultValue={props.workOrder?.residentStatus}
            >
              <MenuItem value="" disabled>
                Select an option
              </MenuItem>
              {Object.keys(ResidentStatus).map((status: string) => (
                <MenuItem value={ResidentStatus[status]}>{status}</MenuItem>
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
