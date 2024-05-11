import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { signInSuccess } from "./store/authSlice";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/users/current-user");
        // console.log(res);
        if (res.status !== 200) {
          Navigate("/api/v1/users/Signup");
        }
      } catch (error) {
        // console.log(error);
        dispatch(signInSuccess(null));
        Navigate("/api/v1/users/Signup");
      }
    })();
  }, []);
};

export default App;
