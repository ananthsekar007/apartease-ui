import { UIModel } from "../../UIComponents/UIModal";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import "../../auth.css";
import { Vendor } from "../../../types/VendorTypes";
import { useState, useEffect } from "react";
import { VendorApiRoutes, WorkOrderApiRoutes } from "../../../routes/ApiRoutes";
import { showErrorMessage, showSuccessMessage } from "../../Toast";
import { UIButton } from "../../UIComponents/UIButton";
import { getResident, getResidentAuthToken } from "../../../constants/LocalStorage";

interface AddWorkOrderModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddWorkOrderModal = (props: AddWorkOrderModalProps) => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onAddWorkOrder = async (e: any) => {
    e.preventDefault();
    const formEntries = new FormData(e.target).entries();
    const addWorkOrderInput = Object.fromEntries(formEntries);

    let isError: boolean = false;

    Object.keys(addWorkOrderInput).forEach((input) => {
      if(addWorkOrderInput[input] == "" || addWorkOrderInput[input] == undefined) {
        showErrorMessage("Please fill all the fields!");
        isError = true;
        return;
      }
    });

    if(isError) return;

    const resident = getResident();

    const authToken = getResidentAuthToken();

    setLoading(true);

    const response = await fetch(WorkOrderApiRoutes.AddWorkOrder, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
      body: JSON.stringify({
        ...addWorkOrderInput,
        residentId: resident?.residentId,
      }),
    });

    setLoading(false);

    if (!response.ok) {
      const error = await response.text();
      showErrorMessage(error);
      return;
    }
    showSuccessMessage("Work Order Added Successfully!");

    props.onSuccess();
  };

  const getVendors = async () => {

    const authToken = getResidentAuthToken();

    const response = await fetch(VendorApiRoutes.GetVendors, {
      headers: {
        "Authorization": `Bearer ${authToken}`
      }
    });
    if (!response.ok) {
      const error = await response.text();
      showErrorMessage(error);
      return;
    }

    const vendorList = await response.json();

    setVendors(vendorList);
  };

  useEffect(() => {
    getVendors();
  }, []);

  return (
    <>
      <UIModel
        isOpen={props.open}
        onClose={props.onClose}
        title="Add Work Order"
        hideCancel
      >
        <form className="auth-form" onSubmit={onAddWorkOrder}>
          <TextField
            label="Title"
            name="workOrderTitle"
            fullWidth
            className="form-element"
          />
          <TextField
            label="Description"
            name="workOrderDescription"
            className="form-element"
            fullWidth
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="test-select-label">Select Vendor</InputLabel>
            <Select
              name="vendorId"
              fullWidth
              variant="outlined"
              labelId="test-select-label"
              label="Select Apartment"
              className="form-element"
            >
              <MenuItem value="" disabled>
                Select an option
              </MenuItem>
              {vendors &&
                vendors.length > 0 &&
                vendors.map((vendor) => (
                  <MenuItem value={vendor.vendorId}>
                    {`${vendor.firstName} ${vendor.lastName} (${vendor.company?.category?.categoryName})`}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <UIButton type="submit" loading={loading} fullWidth>
            Add Work Order
          </UIButton>
        </form>
      </UIModel>
    </>
  );
};
