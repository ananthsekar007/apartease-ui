import { AppBar, Toolbar, Typography } from "@mui/material";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

export const LandingAppBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <AppBar
        position="static"
        variant="elevation"
        color="transparent"
        style={{
          maxHeight: 60,
        }}
      >
        <Toolbar>
            <img
              src={logo}
              alt="Logo"
              onClick={() => {
                navigate("/");
              }}
              style={{ height: 40, marginRight: 10, marginTop: 10, cursor: "pointer" }}
            />
            <Typography fontStyle={"italic"} variant="h6">
              Apart Eaze
            </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};
