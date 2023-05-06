import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Container,
} from "@mui/material";
import logo from "../../assets/logo.png";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PendingApprovalImage from "../../assets/PendingApproval.png";

export const ResidentPending = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
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
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Container style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 40
      }} >
        <Typography variant="h6" fontStyle={"italic"}>
          Hold tight! We're just waiting for your apartment manager to give us
          the green light before you can start using the app!
        </Typography>
        <img src={PendingApprovalImage} height={400} width={500} />
      </Container>
    </Box>
  );
};
