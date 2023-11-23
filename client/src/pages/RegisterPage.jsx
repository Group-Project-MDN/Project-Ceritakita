import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import {
  setName,
  setEmail,
  setPassword1,
  setPassword2,
} from "../features/credentials-regist/credential-regist";
const RegisterPage = () => {
  const { handleUserRegister } = useAuth();
  const dispatch = useDispatch();
  // const [credentials, setCredentials] = useState({
  //     name: '',
  //     email: '',
  //     password1: '',
  //     password2: ''
  // })
  const regist = useSelector((state) => {
    return state.regist;
  });

  const inputRegist = {
    name: regist.name.payload,
    email: regist.email.payload,
    password1: regist.password1.payload,
    password2: regist.password2.payload,
  };

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    // setCredentials({ ...credentials, [name]: value });
    if (name === "name") {
      dispatch(setName(value));
    }
    if (name === "email") {
      dispatch(setEmail(value));
    }
    if (name === "password1") {
      dispatch(setPassword1(value));
    }
    if (name === "password2") {
      dispatch(setPassword2(value));
    }
  };
  return (
    <div className="auth--container">
      <div className="form--wrapper">
        <form
          onSubmit={(e) => {
            handleUserRegister(e, inputRegist);
          }}
        >
          <div className="field--wrapper">
            <label>Name:</label>
            <input
              type="text"
              required
              name="name"
              placeholder="Enter your name..."
              onChange={handleInputChange}
            />
          </div>

          <div className="field--wrapper">
            <label>Email:</label>
            <input
              type="email"
              required
              name="email"
              placeholder="Enter your email..."
              onChange={handleInputChange}
            />
          </div>

          <div className="field--wrapper">
            <label>Password:</label>
            <input
              type="password"
              required
              name="password1"
              placeholder="Enter password..."
              onChange={handleInputChange}
            />
          </div>

          <div className="field--wrapper">
            <label>Confirm Password:</label>
            <input
              type="password"
              required
              name="password2"
              placeholder="Confir your password..."
              onChange={handleInputChange}
            />
          </div>

          <div className="field--wrapper">
            <input
              className="btn btn--lg btn--main"
              type="submit"
              value="Register"
            />
          </div>
        </form>
        <p>
          Already have an account? Register <Link to="/login">here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
