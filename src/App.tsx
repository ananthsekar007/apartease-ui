import { LandingPage } from './pages/LandingPage'
import { ManagerLanding } from "./pages/ManagerLanding";

import {
  createBrowserRouter
} from "react-router-dom";
import { ManagerHome } from './pages/manager/Home';
import { ManagerRoutes } from './routes/ManagerRoutes';

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
  }
]);

