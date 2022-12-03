import { createRef, Fragment, useEffect, useRef, useState } from "react";
import styles from "./Menu.module.css";
import axios from "./api/axios";
import { create } from "domain";
import { Category, Item } from "./types";
export function Menu() {
  const [menu, setMenu] = useState([]);
  let elementsRef = menu.map(() => createRef<any>());

  useEffect(() => {
    getAllCategories();
  }, []);
  const executeScroll = (i: number) => {
    elementsRef[i]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getAllCategories = async () => {
    const categories = await axios.get("http://localhost:8000/categories", {
      params: {
        username: "john1904",
      },
    });
    setMenu(categories.data.menu);
  };
  return (
    <div>
      <div
        id="menu"
        className={`${styles["w3-container"]} ${styles["w3-black"]} ${styles["w3-xxlarge"]}  ${styles["w3-padding-64"]} `}
      >
        <h1
          className={`${styles["w3-center"]} ${styles["w3-jumbo"]} ${styles["w3-padding-32"]}`}
        >
          THE MENU
        </h1>
        <div
          className={`${styles["w3-row"]} ${styles["w3-center"]} ${styles["w3-border"]} ${styles["w3-border-dark-grey"]}`}
        >
          {menu?.map((cat: Category, index: number) => {
            return (
              <Fragment key={cat._id}>
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    executeScroll(index);
                  }}
                >
                  <div
                    className={`${styles["w3-third"]} ${
                      styles["w3-padding-large"]
                    } ${/*styles["w3-red"]*/ " "}`}
                  >
                    {cat.name}
                    <img height="30px" src={cat.image} />
                  </div>
                </a>
              </Fragment>
            );
          })}
        </div>

        {menu.map((cat: Category, index: number) => {
          return (
            <Fragment key={cat._id}>
              {!!index && (
                <h1
                  id="pasta"
                  className={`${styles["w3-center"]} ${styles["w3-jumbo"]} ${styles["w3-padding-32"]}`}
                >
                  {cat.name}
                </h1>
              )}
              <div
                ref={elementsRef[index]}
                className={`${styles["w3-container"]} ${styles["w3-white"]} ${styles["w3-padding-32"]}`}
              >
                {cat.items.map((item: Item) => {
                  return (
                    <Fragment key={item._id}>
                      <h1>
                        <b>{item.name}</b>{" "}
                        {item.image && <img height="30px" src={item.image} />}
                        {!!item.price && (
                          <span
                            className={`${styles["w3-right"]} ${styles["w3-tag"]} ${styles["w3-dark-grey"]} ${styles["w3-round"]}`}
                          >
                            {item.price}
                          </span>
                        )}
                      </h1>
                      {item.description && (
                        <p className={`${styles["w3-text-grey"]}`}>
                          {item.description}
                        </p>
                      )}

                      <hr />
                    </Fragment>
                  );
                })}
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
