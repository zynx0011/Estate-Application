import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import SignIN from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store.js";
import Home from "./components/Home/Home.jsx";
import App from "./App.jsx";
import { PersistGate } from "redux-persist/integration/react";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Profile from "./pages/Profile.jsx";
import ChangePass from "./pages/ChangePass.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/api/v1/users/Signup" element={<SignUp />} />
      <Route path="/api/v1/users/SignIn" element={<SignIN />} />
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/Home" element={<App />} />
        <Route path="/change-password" element={<ChangePass />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
