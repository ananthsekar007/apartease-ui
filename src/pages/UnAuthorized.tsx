import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import logo from "../assets/logo.png";
import UnAuthorizedImage from "../assets/UnAuthorized.png";
import { useNavigate } from "react-router-dom";

export const UnAuthorizedRoute = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent">
          <Toolbar>
            {/* <div> */}
              <img
                src={logo}
                alt="Logo"
                onClick={() => {
                  navigate("/");
                }}
                style={{
                  height: 40,
                  marginRight: 10,
                  marginTop: 10,
                  cursor: "pointer",
                }}
              />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                ApartEaze
              </Typography>
            {/* </div> */}
          </Toolbar>
        </AppBar>
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <Typography variant="h6" fontStyle={"italic"}>
            Un Authorized Route!! please login or sign up!!!
          </Typography>
          <img src={UnAuthorizedImage} height={400} width={500} />
        </Container>
      </Box>
    </>
  );
};
