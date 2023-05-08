import { LandingPage } from './pages/LandingPage'
import { ManagerLanding } from "./pages/ManagerLanding";

import {
  createBrowserRouter
} from "react-router-dom";
import { ManagerHome } from './pages/manager/Home';
import { ManagerRoutes } from './routes/ManagerRoutes';
import { ResidentRoutes } from './routes/ResidentRoutes';
import { ResidentLanding } from './pages/ResidentLanding';
import { ResidentHome } from './pages/resident/Home';
import { VendorRoutes } from './routes/VendorRoutes';
import { VendorLanding } from './pages/VendorLanding';
import { VendorHome } from './pages/vendor/Home';
import { ManageAmenities } from './pages/manager/Amenities';
import { ResidentBookings } from './pages/resident/Bookings';
import { ManagerBookings } from './pages/manager/Booking';
import { InActiveWorkOrders } from './pages/resident/InActiveWorkOrders';
import { OnGoingWorkOrders } from './pages/vendor/OnGoingWorkOrders';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: ManagerRoutes.Auth,
    element: <ManagerLanding />
  },
  {
    path: ManagerRoutes.Home,
    element: <ManagerHome />
  },
  {
    path: ResidentRoutes.Auth,
    element: <ResidentLanding />
  },
  {
    path: ResidentRoutes.Amenities,
    element: <ResidentHome />
  },
  {
    path: ResidentRoutes.Bookings,
    element: <ResidentBookings />
  },
  {
    path: VendorRoutes.Auth,
    element: <VendorLanding />
  },
  {
    path: VendorRoutes.Home,
    element: <VendorHome />
  },
  {
    path: ManagerRoutes.Amenities,
    element: <ManageAmenities />
  },
  {
    path: ManagerRoutes.Bookings,
    element: <ManagerBookings />
  },
  {
    path: ResidentRoutes.AddWorkOrders,
    element: <InActiveWorkOrders />
  },
  {
    path: VendorRoutes.WorkOrders,
    element: <OnGoingWorkOrders />
  }
]);

