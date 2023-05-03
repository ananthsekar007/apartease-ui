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
    path: ResidentRoutes.Home,
    element: <ResidentHome />
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
  }
]);

