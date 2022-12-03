import { Fragment } from "react";
import { Category, Item } from "./types";
import styles from "./Menu.module.css";
type CategoryProps = {
  cat: Category;
  elements: React.RefObject<any>[];
  index: number;
};
const MenuItems: React.FC<CategoryProps> = ({ cat, elements, index }) => {
  console.log(cat.image);
  const executeScroll = (i: number) => {
    elements[i]?.current?.scrollIntoView({ behavior: "smooth" });
  };
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
        ref={elements[index]}
        className={`${styles["w3-container"]} ${styles["w3-white"]} ${styles["w3-padding-32"]}`}
      >
        {cat.items.map((item: Item) => {
          return (
            <Fragment key={item._id}>
              <h1>
                <b>{item.name}</b>{" "}
                {item.image && (
                  <img
                    height="30px"
                    src={`http://localhost:8000/${item.image}`}
                  />
                )}
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
};
export default MenuItems;
