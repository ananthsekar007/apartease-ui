import { useState } from "react";
import {
  Card,
  CardContent,
  Tabs,
  Tab,
  Box,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import logo from "../assets/logo.png";
import { ManagerSignIn } from "../components/managerauth/ManagerSignIn";
import { ManagerLogin } from "../components/managerauth/ManagerLogin";
import { LandingAppBar } from "../components/UIComponents/LandingAppBar";

export const ManagerLanding = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: any, newValue: any) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <LandingAppBar />
      <Box display="flex" justifyContent="center" marginTop={10} marginBottom={10}>
        <Card style={{ width: 450 }}>
          <Tabs value={tabIndex} onChange={handleTabChange} centered>
            <Tab label="Login" />
            <Tab label="Sign Up" />
          </Tabs>
          <CardContent>
            {tabIndex === 1 && (
              <ManagerSignIn />
            )}
            {tabIndex === 0 && (
              <ManagerLogin />
            )}
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
