import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Home from "./layout/pages/Home";
import Login from "./layout/pages/Login";
import Registration from "./layout/pages/Registration";
import OurServices from "./layout/pages/OurServices";
import ContactForm from "./layout/Pages/ContactForm";
import UserPage from "./layout/pages/userDashboard/UserDashboard";
import Profile from "./layout/pages/Profile";
import UserInvoice from "./layout/Pages/userDashboard/UserInvoice";

import AdminDashboard from "./layout/pages/adminDashboard/AdminDashboard";
import AdminAllUsers from "./layout/pages/adminDashboard/AdminAllUsers";
import AdminUser from "./layout/pages/adminDashboard/AdminUser";
import AdminSearch from "./layout/pages/adminDashboard/AdminSearch";
// import { AuthProvider } from "./Features/Navigations/AuthContext";

import ProtectedRoute from "./components/routes/ProtectedRoute";
import AdminRoute from "./components/routes/AdminRoute";
// const AuthContext = React.createContext({ role: 'visitor'});

function App() {
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
        path="/admin/user"
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
        path="/profile/:userId"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/:userId"
        element={
          <ProtectedRoute>
            <UserPage />
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
