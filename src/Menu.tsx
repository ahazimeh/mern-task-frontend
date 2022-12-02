import { createRef, useRef } from "react";
import styles from "./Menu.module.css";
export function Menu() {
  const menu = {
    categories: [
      {
        name: "Platters1",
        image: "https://via.placeholder.com/150",
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
      {
        name: "Platters2",
        image: "https://via.placeholder.com/150",
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
      {
        name: "Platters3",
        image: "https://via.placeholder.com/150",
        items: [
          {
            name: "Chicken Platter",
            description:
              "4 chicken pieces with our special sauce served with bbq dip and wedges",
            price: 160000,
            image: "https://via.placeholder.com/150",
          },
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

  const elementsRef = useRef(
    menu.categories.map(() => createRef<HTMLDivElement>())
  );
  const executeScroll = (i: number) => {
    elementsRef?.current[i].current?.scrollIntoView({ behavior: "smooth" });
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
          {menu.categories.map((cat, index) => {
            console.log(cat);
            return (
              <>
                <a
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

        {menu.categories.map((cat, index) => {
          console.log(index);
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
                ref={elementsRef.current[index]}
                className={`${styles["w3-container"]} ${styles["w3-white"]} ${styles["w3-padding-32"]}`}
              >
                {cat.items.map((item, i) => {
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
