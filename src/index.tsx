import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import RequireAuth from "./RequireAuth";
import Items from "./components/Items";
import Login from "./components/Login";
import Categories from "./components/Categories";
import { Menu } from "./components/Menu";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />}></Route> */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/categories" element={<Categories />}></Route>
        <Route path="/items/:categoryId" element={<Items />}></Route>
        <Route path="/" element={<Menu />}></Route>

        <Route element={<RequireAuth />}></Route>
      </Routes>
      {/* <App /> */}
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
