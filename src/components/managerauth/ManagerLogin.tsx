import { TextField, Button } from "@mui/material";
import React from "react";
import "./auth.css";
import { FormEvent, useState } from "react";
import { UIButton } from "../UIComponents/UIButton";
import { ManagerApiRoutes } from "../../routes/ApiRoutes";
import { setManager, setManagerAuthToken } from "../../constants/LocalStorage";
import { useNavigate } from "react-router-dom";
import { ManagerRoutes } from "../../routes/ManagerRoutes";

export const ManagerLogin = () => {

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const onManagerLogin = async (e: any) => {
    e.preventDefault();

    const formEntries = new FormData(e.target).entries();
    const loginInput = Object.fromEntries(formEntries);

    setLoading(true);

    const response = await fetch(ManagerApiRoutes.Login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInput)
    })

    setLoading(false);
    const loginResponse = await response.json();
    setManager(loginResponse.manager);
    setManagerAuthToken(loginResponse.authToken);

    navigate(ManagerRoutes.Home);
  };

  return (
    <>
      <form
        onSubmit={onManagerLogin}
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
          name="password"
          className="form-element"
          fullWidth
        />
        <UIButton
          type="submit"
          fullWidth
          variant="contained"
          className="form-element"
          loading={loading}
        >
          Login
        </UIButton>
      </form>
    </>
  );
};
