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
import Listing from "./pages/Listing.jsx";
import UpdateListing from "./pages/UpdateListing.jsx";
import ListingPg from "./pages/ListingPg.jsx";
import Search from "./pages/Search.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import ForgotPass from "./pages/ForgotPass.jsx";
import ForgotPassPopUp from "./pages/ForgotPassPopUp.jsx";
import FavoritedLIsting from "./pages/FavoritedLIsting.jsx";
import Admin from "./pages/Admin.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AdminPrivateRoute from "../src/components/AdminPrivateRoute.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/api/v1/users/forgotPassword" element={<ForgotPass />} />
      <Route
        path="/reset-password/:userId/:token"
        element={<ForgotPassPopUp />}
      />
      <Route path="/api/v1/users/Signup" element={<SignUp />} />
      <Route path="/api/v1/users/SignIn" element={<SignIN />} />
      <Route path="/search?/" element={<Search />} />
      <Route path="/listing/:listingId" element={<ListingPg />} />

      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/Home" element={<App />} />
        <Route path="/change-password" element={<ChangePass />} />
        <Route path="/create-listing" element={<Listing />} />
        <Route path="/update-listing/:listingId" element={<UpdateListing />} />
        <Route
          path="/FavoritedListing/:userId"
          element={<FavoritedLIsting />}
        />
        <Route path="/admin" element={<Admin />} />
      </Route>
      <Route element={<AdminPrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
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
