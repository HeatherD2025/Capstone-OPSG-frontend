import { createBrowserRouter, Router } from "react-router-dom";
import Home from "./Layout/Pages/Home";
import Profile from "./Layout/Pages/Profile";
import ProtectedRoutes from "./utils/ProtectedRoutes";

// protected routes are created as children under the root route
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        element: <ProtectedRoutes isAdmin="true" />,
        children: [
          {
            path: "/adminUser",
            element: <Admin />,
          },
        ],
      },
    ],
  }
]);

export default Router;

        // element: <ProtectedRoutes isLoggedIn="true" />,
        // children: [
        //   {
        //     path: "/user/:userid",
        //     element: <Profile />,
        //   },
          //paths to other protected routes
          // {
          //     path: "/profile",
          //     element: <Profile />
          // }
