import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { AuthCard } from "../components/AuthCard";
import { AuthCardDetails } from "../constants/AppConstants";
import logo from "../assets/logo.png";

export const LandingPage = () => {
  return (
    <>
      <AppBar position="static" variant="elevation" color="transparent" style={{
        maxHeight: 60
      }}>
        <Toolbar>
          <img src={logo} alt="Logo" style={{ height: 40, marginRight: 10, marginTop: 10 }} />
          <Typography fontStyle={"italic"} variant="h6">Apart Eaze</Typography>
        </Toolbar>
      </AppBar>
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
