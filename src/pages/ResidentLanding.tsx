import { useState } from "react";
import {
  Card,
  CardContent,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import { LandingAppBar } from "../components/UIComponents/LandingAppBar";
import { ResidentLogin } from "../components/residentauth/ResidentLogin";
import { ResidentSignIn } from "../components/residentauth/ResidentSignIn";

export const ResidentLanding = () => {
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
            <Tab label="Sign In" />
          </Tabs>
          <CardContent>
            {tabIndex === 1 && (
              <ResidentSignIn />
            )}
            {tabIndex === 0 && (
              <ResidentLogin />
            )}
          </CardContent>
        </Card>
      </Box>
    </>
  );
};