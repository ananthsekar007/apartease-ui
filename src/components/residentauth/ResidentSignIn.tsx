import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "../auth.css";
import { ApartmentApiRoutes, ResidentApiRoutes } from "../../routes/ApiRoutes";
import React, { useEffect, useState } from "react";
import { UIButton } from "../UIComponents/UIButton";
import { setResident, setResidentAuthToken } from "../../constants/LocalStorage";
import { useNavigate } from "react-router-dom";
import { ManagerRoutes } from "../../routes/ManagerRoutes";
import { Apartment } from "../../types/ApartmentTypes";
import { ResidentRoutes } from "../../routes/ResidentRoutes";
import { showErrorMessage } from "../Toast";

export const ResidentSignIn = () => {
  const [loading, setLoading] = useState<boolean>();

  const [apartments, setApartments] = useState<Apartment[]>([]);

  const navigate = useNavigate();

  const getApartments = async () => {
    const response = await fetch(ApartmentApiRoutes.GetAllApartments);

    if(!response.ok) {
      const error = await response.text();
      showErrorMessage(error);
      return;
    }

    const apartmentList = await response.json();
    setApartments(apartmentList);
  };

  useEffect(() => {
    getApartments();
  }, []);

  const onResidentSignIn = async (e: any) => {
    e.preventDefault();


    const formEntries = new FormData(e.target).entries();
    const signInInput = Object.fromEntries(formEntries);

    setLoading(true);

    const response = await fetch(ResidentApiRoutes.SignIn, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...signInInput, apartmentId: Number(signInInput.apartmentId)}),
    });

    setLoading(false);

    if(!response.ok) {
      const error = await response.text();
      showErrorMessage(error);
      return;
    }

    const signInResponse = await response.json();
    setResident(signInResponse.resident);
    setResidentAuthToken(signInResponse.authToken);

    navigate(ResidentRoutes.Home);
  };

  return (
    <>
      <form
        onSubmit={onResidentSignIn}
        style={{
          textAlign: "center",
        }}
        className="auth-form"
      >
        <TextField
          label="Email"
          name="email"
          fullWidth
          className="form-element"
        />
        <TextField
          label="Password"
          type="password"
          className="form-element"
          name="password"
          fullWidth
        />
        <TextField
          label="First Name"
          name="firstName"
          fullWidth
          className="form-element"
        />
        <TextField
          label="Last Name"
          name="lastName"
          fullWidth
          className="form-element"
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
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
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="test-select-label">Select Apartment</InputLabel>
          <Select
            name="apartmentId"
            fullWidth
            variant="outlined"
            labelId="test-select-label"
            label="Select Apartment"
            className="form-element"
          >
            <MenuItem value="" disabled>
              Select an option
            </MenuItem>
            {apartments &&
              apartments.length > 0 &&
              apartments.map((apartment) => (
                <MenuItem value={apartment.apartmentId}>
                  {apartment.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <UIButton
          type="submit"
          fullWidth
          variant="contained"
          className="form-element"
          loading={loading}
        >
          Sign Up
        </UIButton>
      </form>
    </>
  );
};
