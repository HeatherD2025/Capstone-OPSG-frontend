import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import OurServices from "./pages/OurServices";
import ContactForm from "./pages/ContactForm";

import Dashboard from "./components/profileComponents/Dashboard";
import EditProfile from "./components/profileComponents/EditProfile";
import UserInvoice from "./components/profileComponents/userProfileComponents/UserInvoice";

import AdminSearch from "./components/profileComponents/adminProfileComponents/AdminSearch";
import ProtectedRoute from "../src/routes/ProtectedRoute";
import AdminRoute from "../src/routes/AdminRoute";
import { BalanceProvider } from "./components/profileComponents/BalanceProvider";

const BalanceWrapper = ({ children }) => {
  return (
    <BalanceProvider id={userId}>
      {children}
    </BalanceProvider>
  );
};

function App() {
  return (
    <Routes>
      {/* Admin Routes (most specific first) */}
      <Route
        path="/admin/users/:userId"
        element={
          <AdminRoute>
            <BalanceWrapper>
              <EditProfile />
            </BalanceWrapper>
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
        path="/dashboard"
        element={
          <ProtectedRoute>
            <BalanceProvider>
              <Dashboard />
            </BalanceProvider>
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/me/updateUserProfile"
        element={
          <ProtectedRoute>
            <BalanceProvider>
              <EditProfile />
            </BalanceProvider>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile/invoices/:userId"
        element={
          <ProtectedRoute>
            <BalanceWrapper>
              <UserInvoice />
            </BalanceWrapper>
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
