import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
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

// const AuthContext = React.createContext({ role: 'visitor'});

function App() {
  return (
    <Routes>
      {/* Admin Routes (most specific first) */}
      <Route exact path="/admin/user/user/:userId" element={<AdminUser />} />
      <Route exact path="/admin/user" element={<AdminAllUsers />} />
      <Route exact path="/admin/search" element={<AdminSearch />} />
      <Route exact path="/admin/dashboard" element={<AdminDashboard />} />

      {/* User Protected Routes */}
      <Route exact path="/profile/invoices/:userId" element={<UserInvoice />} />
      <Route exact path="/profile/:userId" element={<Profile />} />
      <Route exact path="/user/:userId" element={<UserPage />} />

      {/* Visitor Routes */}
      <Route exact path="/contactform" element={<ContactForm />} />
      <Route exact path="/ourservices" element={<OurServices />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Registration />} />
      <Route exact path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
