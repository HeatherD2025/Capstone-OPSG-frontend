import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { HashRouter as Router } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import store from "./store/store.js";
import ContextProvider from "./components/navigation/ContextProvider.jsx";
import { initializeAuth } from "./slices/authSlice.js";
import ScrollToTop from "../src/components/ScrollToTop.jsx";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BalanceProvider } from "./components/profileComponents/BalanceProvider.jsx";

function Root() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth()); // restores login from localStorage/token
  }, [dispatch]);

  return <App />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <BalanceProvider>
          <Router>
            <ScrollToTop />
            <Root />
          </Router>
        </BalanceProvider>
      </ContextProvider>
    </Provider>
  </StrictMode>
);
