import { Fragment } from "react";
import { Category } from "./types";
import styles from "./Menu.module.css";
type CategoryProps = {
  cat: Category;
  elements: React.RefObject<any>[];
  index: number;
};
const MenuCategories: React.FC<CategoryProps> = ({ cat, elements, index }) => {
  const executeScroll = (i: number) => {
    elements[i]?.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <Fragment>
      <a
        style={{ cursor: "pointer" }}
        onClick={() => {
          executeScroll(index);
        }}
      >
        <div
          className={`${styles["w3-third"]} ${styles["w3-padding-large"]} ${
            /*styles["w3-red"]*/ " "
          }`}
        >
          {cat.name}
          <img height="30px" src={cat.image} />
        </div>
      </a>
    </Fragment>
  );
};
export default MenuCategories;
