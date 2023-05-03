import { TextField } from "@mui/material";
import "../auth.css";
import { useState } from "react";
import { UIButton } from "../UIComponents/UIButton";
import { ResidentApiRoutes, VendorApiRoutes } from "../../routes/ApiRoutes";
import { setResident, setResidentAuthToken, setVendor, setVendorAuthToken } from "../../constants/LocalStorage";
import { useNavigate } from "react-router-dom";
import { ResidentRoutes } from "../../routes/ResidentRoutes";
import { VendorRoutes } from "../../routes/VendorRoutes";
import { showErrorMessage } from "../Toast";

export const VendorLogin = () => {

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const onResidentLogin = async (e: any) => {
    e.preventDefault();

    const formEntries = new FormData(e.target).entries();
    const loginInput = Object.fromEntries(formEntries);

    setLoading(true);

    const response = await fetch(VendorApiRoutes.Login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInput)
    })


    setLoading(false);

    if(!response.ok) {
      const error = await response.text();
      showErrorMessage(error);
      return;
    }

    const loginResponse = await response.json();
    setVendor(loginResponse.vendor);
    setVendorAuthToken(loginResponse.authToken);

    navigate(VendorRoutes.Home);
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
