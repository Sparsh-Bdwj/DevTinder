import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import api from "../api/axios";

const Login = () => {
  const [email, setEmail] = useState("amit@gmail.com");
  const [password, setPassword] = useState("Amit@2611");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post(
        "/auth/login",
        { email, password },
        { withCredentials: true },
      );

      dispatch(addUser(response.data));
      navigate("/");
    } catch (error) {
      // handle error
      console.error(error.message);
    }
  };
  return (
    <div className="flex justify-center mt-4">
      <div className="card bg-gray-950 w-96 shadow-sm">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Login</h2>
          <div className="flex flex-col">
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-left">Email Id:</legend>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset mt-2">
              <legend className="fieldset-legend text-left">Password:</legend>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="Type here"
              />
            </fieldset>
          </div>
          <button className="btn btn-primary mt-4" onClick={handleSubmit}>
            Login{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
