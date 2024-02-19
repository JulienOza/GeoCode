import React from "react";
import ReactDOM from "react-dom/client";
import PropTypes from "prop-types";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import useStore, { AuthProvider } from "./store/AuthProvider";

import Home from "./pages/Home/Home";
import Map from "./pages/Map/Map";
import Connection from "./pages/Connection/Connection";
import Subscribe from "./pages/Subscribe/Subscribe";
import UserInformations from "./pages/UserInformations/UserInformations";
import EditProfile from "./pages/EditProfile/EditProfile";
import Profile from "./pages/Profile/Profile";
import Car from "./pages/Car/Car";
import MyBookingPage from "./pages/MyBookingPage/MyBookingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/map",
    element: <Map />,
    loader: async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/chargepoint`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response;
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    },
  },
  {
    path: "/connection",
    element: (
      <PublicRoute>
        <Connection />
      </PublicRoute>
    ),
  },
  {
    path: "/subscribe",
    element: (
      <PublicRoute>
        <Subscribe />
      </PublicRoute>
    ),
  },
  {
    path: "/mybookings",
    element: (
      <PrivateRoute>
        <MyBookingPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/editprofile",
    element: (
      <PrivateRoute>
        <EditProfile />
      </PrivateRoute>
    ),
    loader: async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/connecteduserinfo`,
          { method: "get", credentials: "include" }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response;
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    },
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/car",
    element: <Car />,
    loader: async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/car`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response;
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    },
  },
  {
    path: "/userinformations",
    element: (
      <PrivateRoute>
        <UserInformations />
      </PrivateRoute>
    ),
    loader: async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/connecteduserinfo`,
          { method: "get", credentials: "include" }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response;
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    },
  },
]);

function PrivateRoute({ children }) {
  const { auth } = useStore();

  if (auth.user.status === "user") {
    return children;
  }
  return <Navigate to="/connection" />;
}

function PublicRoute({ children }) {
  const { auth } = useStore();
  if (auth.user.status === "user") {
    return <Navigate to="/map" />;
  }
  return children;
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.shape({ status: PropTypes.string.isRequired }).isRequired,
};
PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
