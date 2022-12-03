import { createRef, useEffect, useRef, useState } from "react";
import styles from "./Menu.module.css";
import axios from "./api/axios";
import { create } from "domain";
export function Menu() {
  // const menu = {
  //   categories: [
  //     {
  //       name: "Platters1",
  //       image: "https://via.placeholder.com/150",
  //       items: [
  //         {
  //           name: "Chicken Platter",
  //           description:
  //             "4 chicken pieces with our special sauce served with bbq dip and wedges",
  //           price: 160000,
  //           image: "https://via.placeholder.com/150",
  //         },
  //       ],
  //     },
  //     {
  //       name: "Platters2",
  //       image: "https://via.placeholder.com/150",
  //       items: [
  //         {
  //           name: "Chicken Platter",
  //           description:
  //             "4 chicken pieces with our special sauce served with bbq dip and wedges",
  //           price: 160000,
  //           image: "https://via.placeholder.com/150",
  //         },
  //       ],
  //     },
  //     {
  //       name: "Platters3",
  //       image: "https://via.placeholder.com/150",
  //       items: [
  //         {
  //           name: "Chicken Platter",
  //           description:
  //             "4 chicken pieces with our special sauce served with bbq dip and wedges",
  //           price: 160000,
  //           image: "https://via.placeholder.com/150",
  //         },
  //         {
  //           name: "Chicken Platter",
  //           description:
  //             "4 chicken pieces with our special sauce served with bbq dip and wedges",
  //           price: 160000,
  //           image: "https://via.placeholder.com/150",
  //         },
  //       ],
  //     },
  //   ],
  // };

  const [menu, setMenu] = useState([]);
  // const elementsRef = useRef(menu.map(() => createRef<HTMLDivElement>()));
  let elementsRef = menu.map(() => createRef<any>());
  // console.log(elementsRef1);

  useEffect(() => {
    getAllCategories();
  }, []);
  const executeScroll = (i: number) => {
    console.log(elementsRef);

    elementsRef[i]?.current?.scrollIntoView({ behavior: "smooth" });
    // elementsRef?.current[i].current?.scrollIntoView({ behavior: "smooth" });
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
          {menu?.map((cat: any, index: any) => {
            return (
              <>
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
              </>
            );
          })}
        </div>

        {menu.map((cat: any, index: any) => {
          return (
            <>
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
                {cat.items.map((item: any, i: any) => {
                  return (
                    <>
                      <h1>
                        <b>{item.name}</b>{" "}
                        {item.image && <img height="30px" src={item.image} />}
                        {item.price && (
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
                    </>
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
