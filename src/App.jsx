import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeAuth } from "./slices/authSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import OurServices from "./pages/OurServices";
import ContactForm from "./pages/ContactForm";

import UserDashboard from "./pages/UserDashboard";
import EditProfile from "./components/profileComponents/userProfileComponents/EditProfile";
import UserInvoice from "./components/profileComponents/userProfileComponents/UserInvoice";

import AdminDashboard from "./pages/AdminDashboard";
import AdminViewUserProfile from "./components/profileComponents/adminProfileComponents/AdminViewUserProfile";
import AdminSearch from "./components/profileComponents/adminProfileComponents/AdminSearch";
// import { AuthProvider } from "./Features/Navigations/AuthContext";

import ProtectedRoute from "../src/routes/ProtectedRoute";
import AdminRoute from "../src/routes/AdminRoute";
// const AuthContext = React.createContext({ role: 'visitor'});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // rehydrate auth state from localStorage
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <Routes>
      {/* Admin Routes (most specific first) */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/users/:userId"
        element={
          <AdminRoute>
            <AdminViewUserProfile />
          </AdminRoute>
        }
      />

      {/* <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <AdminUser />
          </AdminRoute>
        }
      /> */}

      <Route
        path="/admin/search"
        element={
          <AdminRoute>
            <AdminSearch />
          </AdminRoute>
        }
      />

      {/* User Protected Routes */}
      <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/me/updateUserProfile"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />

      {/* <Route
        path="/user/me/password"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      /> */}

      <Route
        path="/profile/invoices/:userId"
        element={
          <ProtectedRoute>
            <UserInvoice />
          </ProtectedRoute>
        }
      />

      {/* Visitor Routes */}
      {/* <Route path="/contactform" element={<ContactForm />} /> */}
      <Route path="/contactform" element={<ContactForm />} />
      <Route path="/ourservices" element={<OurServices />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
