import { TextField } from "@mui/material";
import "../auth.css";
import { useState } from "react";
import { UIButton } from "../UIComponents/UIButton";
import { ResidentApiRoutes } from "../../routes/ApiRoutes";
import { setResident, setResidentAuthToken } from "../../constants/LocalStorage";
import { useNavigate } from "react-router-dom";
import { ResidentRoutes } from "../../routes/ResidentRoutes";

export const VendorLogin = () => {

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const onResidentLogin = async (e: any) => {
    e.preventDefault();

    const formEntries = new FormData(e.target).entries();
    const loginInput = Object.fromEntries(formEntries);

    setLoading(true);

    const response = await fetch(ResidentApiRoutes.Login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInput)
    })

    setLoading(false);
    const loginResponse = await response.json();
    setResident(loginResponse.resident);
    setResidentAuthToken(loginResponse.authToken);

    navigate(ResidentRoutes.Home);
  };

  return (
    <>
      <form
        onSubmit={onResidentLogin}
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
