import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeAuth } from "./slices/authSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

import Home from "./layout/pages/Home";
import Login from "./layout/pages/Login";
import Registration from "./layout/pages/Registration";
import OurServices from "./layout/pages/OurServices";
import ContactForm from "./layout/pages/ContactForm";

import UserDashboard from "./layout/pages/userDashboard/UserDashboard";
import EditProfile from "./layout/pages/EditProfile";
import UserInvoice from "./layout/pages/userDashboard/UserInvoice";

import AdminDashboard from "./layout/pages/adminDashboard/AdminDashboard";
// import AdminAllUsers from "./layout/pages/adminDashboard/AdminAllUsers";
import AdminUser from "./layout/pages/adminDashboard/AdminUser";
import AdminSearch from "./layout/pages/adminDashboard/AdminSearch";
// import { AuthProvider } from "./Features/Navigations/AuthContext";

import ProtectedRoute from "./components/routes/ProtectedRoute";
import AdminRoute from "./components/routes/AdminRoute";
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
        path="/admin/user/user/:userId"
        element={
          <AdminRoute>
            <AdminUser />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <AdminAllUsers />
          </AdminRoute>
        }
      />

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
        path="/updateUserProfile/:userId"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/:userId"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile/invoices/:userId"
        element={
          <ProtectedRoute>
            <UserInvoice />
          </ProtectedRoute>
        }
      />

      {/* Visitor Routes */}
      <Route path="/contactform" element={<ContactForm />} />
      <Route path="/ourservices" element={<OurServices />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
