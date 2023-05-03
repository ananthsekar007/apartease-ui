import React, { useState } from "react";
import { UIModel } from "../../UIComponents/UIModal";
import { TextField } from "@mui/material";
import "../../auth.css";
import { UIButton } from "../../UIComponents/UIButton";
import { ApartmentApiRoutes } from "../../../routes/ApiRoutes";
import { getManager, getManagerAuthToken } from "../../../constants/LocalStorage";

interface AddApartmentProps {
  onSuccess: () => void;
  isOpen: boolean;
  onCloseModal: () => void;
}

export const AddApartmentModal = (props: AddApartmentProps) => {

  const[loading, setLoading] = useState<boolean>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formEntries = new FormData(e.target).entries();
    const addApartmentInput = Object.fromEntries(formEntries);

    setLoading(true);

    const manager = getManager();

    const response = await fetch(ApartmentApiRoutes.AddApartment, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...addApartmentInput, managerId: manager?.managerId})
    })
    setLoading(false);
    props.onCloseModal();
    props.onSuccess();
    
  }

  return (
    <>
      <UIModel
        isOpen={props.isOpen}
        onClose={props.onCloseModal}
        title="Add Apartment"
        hideCancel
      >
        <form className="auth-form" onSubmit={handleSubmit}>
          <TextField
            label="Apartment Name"
            name="name"
            fullWidth
            className="form-element"
          />
          <TextField
            label="Street"
            name="street"
            fullWidth
            className="form-element"
          />
          <TextField
            label="City"
            name="city"
            fullWidth
            className="form-element"
          />
          <TextField
            label="State"
            name="state"
            fullWidth
            className="form-element"
          />
          <TextField
            label="Zip Code"
            name="zip"
            fullWidth
            className="form-element"
          />
          <UIButton
            className="form-element"
            loading={loading}
            fullWidth
            variant="contained"
            type="submit"
           >
            Add
          </UIButton>
        </form>
      </UIModel>
    </>
  );
};
