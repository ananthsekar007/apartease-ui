import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { AuthCard } from "../components/AuthCard";
import { AuthCardDetails } from "../constants/AppConstants";
import logo from "../assets/logo.png";
import { LandingAppBar } from "../components/UIComponents/LandingAppBar";



export const LandingPage = () => {
  return (
    <>
      <LandingAppBar />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
          Welcome to ApartEaze
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
          {AuthCardDetails.map(
            ({ content, image, redirectPath, title }, index) => (
              <AuthCard
                content={content}
                image={image}
                redirectPath={redirectPath}
                title={title}
                key={index}
              />
            )
          )}
        </Box>
      </Container>
    </>
  );
};
