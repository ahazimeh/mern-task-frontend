import React, { useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const myRef = useRef<HTMLDivElement>(null);
  const executeScroll = () =>
    myRef?.current?.scrollIntoView({ behavior: "smooth" });
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
        <div>
          <div>imagesdk jdskfj sdkfj sdkfhjsd hfsd</div>
          <div>title</div>
        </div>
        <div>
          <div>imagesdk jdskfj sdkfj sdkfhjsd hfsd</div>
          <div>title</div>
        </div>
        <div>
          <div>imagesdk jdskfj sdkfj sdkfhjsd hfsd</div>
          <div>title</div>
        </div>
        <div>
          <div>image jsdjfh sdjfsdj hfj sdhfs</div>
          <div>title</div>
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
      <div ref={myRef}>Element to scroll to</div>
    </div>
  );
}

export default App;
