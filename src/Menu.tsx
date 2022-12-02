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
                <a href={`#cat-${index}`}>
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
                  PASTA1
                </h1>
              )}
              <div
                id="pizza"
                className={`${styles["w3-container"]} ${styles["w3-white"]} ${styles["w3-padding-32"]}`}
              >
                {cat.items.map((item, i) => {
                  return (
                    <>
                      <h1>
                        <b>Margherita</b>{" "}
                        <img
                          height="30px"
                          src="https://via.placeholder.com/150"
                        />
                        <span
                          className={`${styles["w3-right"]} ${styles["w3-tag"]} ${styles["w3-dark-grey"]} ${styles["w3-round"]}`}
                        >
                          $12.50
                        </span>
                      </h1>
                      <p className={`${styles["w3-text-grey"]}`}>
                        Fresh tomatoes, fresh mozzarella, fresh basil
                      </p>
                      <hr />
                    </>
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
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
          <a href="#pizza">
            <div
              className={`${styles["w3-third"]} ${styles["w3-padding-large"]} ${styles["w3-red"]}`}
            >
              Pizza
              <img height="30px" src="https://via.placeholder.com/150" />
            </div>
          </a>
          <a href="#pasta">
            <div
              className={`${styles["w3-third"]} ${styles["w3-padding-large"]} ${styles["w3-hover-red"]}`}
            >
              Pasta
            </div>
          </a>
          <a href="#starters">
            <div
              className={`${styles["w3-third"]} ${styles["w3-padding-large"]} ${styles["w3-hover-red"]}`}
            >
              Starters
            </div>
          </a>
        </div>

        <div
          id="pizza"
          className={`${styles["w3-container"]} ${styles["w3-white"]} ${styles["w3-padding-32"]}`}
        >
          <h1>
            <b>Margherita</b>{" "}
            <img height="30px" src="https://via.placeholder.com/150" />
            <span
              className={`${styles["w3-right"]} ${styles["w3-tag"]} ${styles["w3-dark-grey"]} ${styles["w3-round"]}`}
            >
              $12.50
            </span>
          </h1>
          <p className={`${styles["w3-text-grey"]}`}>
            Fresh tomatoes, fresh mozzarella, fresh basil
          </p>
          <hr />

          <h1>
            <b>Formaggio</b>{" "}
            <span
              className={`${styles["w3-right"]} ${styles["w3-tag"]} ${styles["w3-dark-grey"]} ${styles["w3-round"]}`}
            >
              $15.50
            </span>
          </h1>
          <p className={`${styles["w3-text-grey"]}`}>
            Four cheeses (mozzarella, parmesan, pecorino, jarlsberg)
          </p>
          <hr />

          <h1>
            <b>Meat Town</b>{" "}
            <span
              className={`${styles["w3-tag"]} ${styles["w3-red"]} ${styles["w3-round"]}`}
            >
              Hot!
            </span>
            <span
              className={`${styles["w3-right"]} ${styles["w3-tag"]} ${styles["w3-dark-grey"]} ${styles["w3-round"]}`}
            >
              $20.00
            </span>
          </h1>
          <p className={`${styles["w3-text-grey"]}`}>
            Fresh tomatoes, mozzarella, hot pepporoni, hot sausage, beef,
            chicken
          </p>
        </div>

        <h1
          id="pasta"
          className={`${styles["w3-center"]} ${styles["w3-jumbo"]} ${styles["w3-padding-32"]}`}
        >
          PASTA
        </h1>
        <div
          className={`${styles["w3-container"]} ${styles["w3-white"]} ${styles["w3-padding-32"]}`}
        >
          <h1>
            <b>Lasagna</b>{" "}
            <span
              className={`${styles["w3-tag"]} ${styles["w3-grey"]} ${styles["w3-round"]}`}
            >
              Popular
            </span>
            <span
              className={`${styles["w3-right"]} ${styles["w3-tag"]} ${styles["w3-dark-grey"]} ${styles["w3-round"]}`}
            >
              $13.50
            </span>
          </h1>
          <p className={`${styles["w3-text-grey"]}`}>
            Special sauce, mozzarella, parmesan, ground beef
          </p>
          <hr />

          <h1>
            <b>Ravioli</b>{" "}
            <span
              className={`${styles["w3-right"]} ${styles["w3-tag"]} ${styles["w3-dark-grey"]} ${styles["w3-round"]}`}
            >
              $14.50
            </span>
          </h1>
          <p className={`${styles["w3-text-grey"]}`}>
            Ravioli filled with cheese
          </p>
          <hr />

          <h1>
            <b>Spaghetti Classica</b>{" "}
            <span
              className={`${["w3-right"]} ${styles["w3-tag"]} ${
                styles["w3-dark-grey"]
              } ${styles["w3-round"]}`}
            >
              $11.00
            </span>
          </h1>
          <p className={`${styles["w3-text-grey"]}`}>
            Fresh tomatoes, onions, ground beef
          </p>
        </div>

        <h1
          id="starters"
          className={`${styles["w3-center"]} ${styles["w3-jumbo"]} ${styles["w3-padding-32"]}`}
        >
          STARTERS
        </h1>
        <div
          className={`${styles["w3-container"]} ${styles["w3-white"]} ${styles["w3-padding-32"]}`}
        >
          <h1>
            <b>Today's Soup</b>{" "}
            <span
              className={`${styles["w3-tag"]} ${styles["w3-grey"]} ${styles["w3-round"]}`}
            >
              Seasonal
            </span>
            <span
              className={`${styles["w3-right"]} ${styles["w3-tag"]} ${styles["w3-dark-grey"]} ${styles["w3-round"]}`}
            >
              $5.50
            </span>
          </h1>
          <p className={`${["w3-text-grey"]}`}>Ask the waiter</p>
          <hr />

          <h1>
            <b>Bruschetta</b>{" "}
            <span
              className={`${styles["w3-right"]} ${styles["w3-tag"]} ${styles["w3-dark-grey"]} ${styles["w3-round"]}`}
            >
              $8.50
            </span>
          </h1>
          <p className={`${styles["w3-text-grey"]}`}>
            Bread with pesto, tomatoes, onion, garlic
          </p>
          <hr />

          <h1>
            <b>Garlic bread</b>{" "}
            <span
              className={`${styles["w3-right"]} ${styles["w3-tag"]} ${styles["w3-dark-grey"]} ${styles["w3-round"]}`}
            >
              $9.50
            </span>
          </h1>
          <p className={`${styles["w3-text-grey"]}`}>
            Grilled ciabatta, garlic butter, onions
          </p>
        </div>
      </div>
    </div>
  );
}
