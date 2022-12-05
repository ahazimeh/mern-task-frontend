import {
  faListAlt,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Category, Item } from "../types";

type CategoryProps = {
  // item: Item;
  index: number;
  cat: Category;
  handleShow: (index: number) => void;
  removeCategory: (catId: string) => Promise<void>;
};
const SingleCategory: React.FC<CategoryProps> = ({
  cat,
  index,
  handleShow,
  removeCategory,
}) => {
  return (
    <>
      <td>{cat._id}</td>
      <td>{cat.name}</td>
      <td>
        <div style={{ display: "flex" }}>
          <img height="50px" src={`http://localhost:8000/${cat.image}`} />
        </div>
      </td>
      <td>
        <div style={{ display: "flex", gap: "20px" }}>
          <div onClick={handleShow.bind(null, index)}>
            <FontAwesomeIcon style={{ color: "blue" }} icon={faPencil} />
          </div>
          <div onClick={removeCategory.bind(null, cat._id)}>
            <FontAwesomeIcon style={{ color: "red" }} icon={faTrash} />
          </div>
          <div>
            <Link to={`/items/${cat._id}`}>
              <FontAwesomeIcon style={{ color: "darkblue" }} icon={faListAlt} />
            </Link>
          </div>
        </div>
      </td>
    </>
  );
};
export default SingleCategory;
