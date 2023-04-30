import { useState } from "react";
import {
  Card,
  CardContent,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import { LandingAppBar } from "../components/UIComponents/LandingAppBar";
import { VendorLogin } from "../components/vendorauth/VendorLogin";
import { VendorSignIn } from "../components/vendorauth/VendorSignin";

export const VendorLanding = () => {
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
              <VendorSignIn />
            )}
            {tabIndex === 0 && (
              <VendorLogin />
            )}
          </CardContent>
        </Card>
      </Box>
    </>
  );
};