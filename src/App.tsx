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
  }
]);

