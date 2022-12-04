import React, { useState } from "react";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    const login = await axios({
      url: "signin",
      method: "post",
      data: {
        email,
        password,
      },
    });
    localStorage.setItem("token", login.data.token);
    navigate("/categories");
  };
  return (
    <>
      <NavBar />
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <br />
        <Button onClick={handleLogin} variant="primary">
          Login
        </Button>
      </MDBContainer>
    </>
  );
}
export default Login;
