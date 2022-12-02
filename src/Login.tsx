import React, { useState } from "react";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import axios from "./api/axios";
import { useNavigate } from "react-router-dom";

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
      // data: formData,
    });
    localStorage.setItem("token", login.data.token);
    navigate("/categories");
  };
  return (
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
      {/* <MDBInput
        wrapperClass="mb-4"
        label="Email address"
        id="form1"
        type="email"
      />
      <MDBInput
        wrapperClass="mb-4"
        label="Password"
        id="form2"
        type="password"
      /> */}

      <div className="d-flex justify-content-between mx-3 mb-4">
        <MDBCheckbox
          name="flexCheck"
          value=""
          id="flexCheckDefault"
          label="Remember me"
        />
        {/* <a href="!#">Forgot password?</a> */}
      </div>
      <Button onClick={handleLogin} variant="primary">
        Login
      </Button>
      {/* <MDBBtn className="mb-4">Sign in</MDBBtn> */}

      {/* <div className="text-center">
        <p>
          Not a member? <a href="#!">Register</a>
        </p>
        <p>or sign up with:</p>

        <div
          className="d-flex justify-content-between mx-auto"
          style={{ width: "40%" }}
        >
          <MDBBtn
            tag="a"
            color="none"
            className="m-1"
            style={{ color: "#1266f1" }}
          >
            <MDBIcon fab icon="facebook-f" size="sm" />
          </MDBBtn>

          <MDBBtn
            tag="a"
            color="none"
            className="m-1"
            style={{ color: "#1266f1" }}
          >
            <MDBIcon fab icon="twitter" size="sm" />
          </MDBBtn>

          <MDBBtn
            tag="a"
            color="none"
            className="m-1"
            style={{ color: "#1266f1" }}
          >
            <MDBIcon fab icon="google" size="sm" />
          </MDBBtn>

          <MDBBtn
            tag="a"
            color="none"
            className="m-1"
            style={{ color: "#1266f1" }}
          >
            <MDBIcon fab icon="github" size="sm" />
          </MDBBtn>
        </div>
      </div> */}
    </MDBContainer>
  );
}
export default Login;
