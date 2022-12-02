import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AddCategory from "./AddCategory";
import RequireAuth from "./RequireAuth";
import Login from "./Login";
import ReusableTable from "./Table";
import { Menu } from "./Menu";
import Categories from "./Categories";
import Items from "./Items";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/table" element={<ReusableTable />}></Route>
        <Route path="/categories" element={<Categories />}></Route>
        <Route path="/items/:categoryId" element={<Items />}></Route>
        <Route path="/menu" element={<Menu />}></Route>

        <Route element={<RequireAuth />}>
          <Route path="/addCategory" element={<AddCategory />}></Route>
        </Route>
      </Routes>
      {/* <App /> */}
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
