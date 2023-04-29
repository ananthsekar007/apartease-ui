import { TextField, Button } from "@mui/material";
import "./auth.css";
import { ManagerApiRoutes } from "../../routes/ApiRoutes";
import React , { useState } from "react";
import { UIButton } from "../UIComponents/UIButton";
import { setManager, setManagerAuthToken } from "../../constants/LocalStorage";
import { useNavigate } from "react-router-dom";
import { ManagerRoutes } from "../../routes/ManagerRoutes";

export const ManagerSignIn = () => {

  const [loading, setLoading] = useState<boolean>();

  const navigate = useNavigate();

  const onManagerSignIn = async (e: any) => {
    e.preventDefault();

    const formEntries = new FormData(e.target).entries();
    const signInInput = Object.fromEntries(formEntries);

    setLoading(true);

    const response = await fetch(ManagerApiRoutes.SignIn, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signInInput)
    })

    setLoading(false);
    const signInResponse = await response.json();
    setManager(signInResponse.manager);
    setManagerAuthToken(signInResponse.authToken);

    navigate(ManagerRoutes.Home);
  };

  return (
    <>
      <form
        onSubmit={onManagerSignIn}
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
          type="submit"
          fullWidth
          variant="contained"
          className="form-element"
          loading={loading}
        >
          Sign In
        </UIButton>
      </form>
    </>
  );
};
