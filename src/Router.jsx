import { createBrowserRouter } from "react-router-dom";
import Home from "../src/layout/pages/Home.jsx";
import Profile from "./layout/pages/Profile";

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

export default router;

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
