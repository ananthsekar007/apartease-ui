import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import WorkIcon from '@mui/icons-material/Work';
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Toolbar,
  Box,
  AppBar,
} from "@mui/material";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import BookIcon from '@mui/icons-material/Book';
import PoolIcon from '@mui/icons-material/Pool';
import { ResidentRoutes } from "../../routes/ResidentRoutes";
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { residentLogout } from "../../constants/LocalStorage";

interface ResidentLayoutProps {
  children: any;
}

interface DrawerItemProps {
    text: string;
    navigateRoute: string;
    icon: any
}

const drawerItems: DrawerItemProps[] = [
    {
      text: "Amenities",
      navigateRoute: ResidentRoutes.Amenities,
      icon: PoolIcon
    },
    {
      text: "My Bookings",
      navigateRoute: ResidentRoutes.Bookings,
      icon: BookIcon
    },
    {
      text: "Add Work Order",
      navigateRoute: ResidentRoutes.AddWorkOrders,
      icon: WorkHistoryIcon
    },
    {
      text: "View Work Orders",
      navigateRoute: ResidentRoutes.ListWorkOrders,
      icon: WorkIcon
    }
]

export const ResidentLayout = ({ children }: ResidentLayoutProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    residentLogout();
    navigate("/");
  }

  const handleNavigate = (route: string) => {
    navigate(route);
  }

  const DrawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={handleDrawerClose}
      onKeyDown={handleDrawerClose}
    >
      <div style={{
        display: "flex"
      }}>
        <img src={logo} alt="Logo" style={{ height: 100, margin: "10px auto", }} />
      </div>
      <Divider />
      <List>
        {drawerItems.map((item: DrawerItemProps, index: number) => (
          <ListItem key={index} disablePadding onClick={() => {
            handleNavigate(item.navigateRoute);
          }}>
            <ListItemButton>
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              setDrawerOpen(true);
            }}
          >
            <MenuIcon />
          </IconButton>
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
      <Box component="main" sx={{ p: 3 }}>
        {children}
      </Box>
      <Drawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
        }}
      >
        <DrawerList />
      </Drawer>
    </Box>
  );
};
