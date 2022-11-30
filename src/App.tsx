import React, { createRef, useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const menu = {
    categories: [
      {
        name: "Platters",
        items: [
          {
            name: "Chicken Platter",
            description:
              "4 chicken pieces with our special sauce served with bbq dip and wedges",
            price: 160000,
            image: "https://via.placeholder.com/150",
          },
        ],
      },
    ],
  };
  useEffect(() => {
    axios
      .get("http://localhost:8000/categories", {
        params: {
          username: "john1904",
        },
      })
      .then(function (response) {
        console.log(response);
      });
  });
  const myRef = useRef<HTMLDivElement>(null);
  const elementsRef: any = useRef(menu.categories.map(() => createRef()));
  const executeScroll = () => {
    console.log(elementsRef);
    console.log("aa");
    elementsRef?.current[0].current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <div onClick={executeScroll}>menu</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div>
            <img src="/burger.jpeg" />
          </div>
          <div>Burger</div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div>
            <img src="/burger.jpeg" />
          </div>
          <div>Burger</div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div>
            <img src="/burger.jpeg" />
          </div>
          <div>Burger</div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div ref={elementsRef.current[0]}>Element to scroll to</div>
    </div>
  );
}

export default App;
