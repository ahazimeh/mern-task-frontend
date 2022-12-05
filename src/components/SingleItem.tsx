import { faPen, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Category, Item } from "../types";

type CategoryProps = {
  item: Item;
  index: number;
  cat: Category;
  handleShow: (index: number) => void;
  removeCategory: (catId: string) => Promise<void>;
};
const SingleItem: React.FC<CategoryProps> = ({
  cat,
  item,
  index,
  handleShow,
  removeCategory,
}) => {
  return (
    <>
      <td>{item._id}</td>
      <td>{cat.name}</td>
      <td>{item.name}</td>
      <td>{item.description}</td>
      <td>{item.price}</td>
      <td>
        <div style={{ display: "flex" }}>
          {item.image && (
            <img height="50px" src={`http://localhost:8000/${item.image}`} />
          )}
        </div>
      </td>
      <td>
        <div style={{ display: "flex", gap: "20px" }}>
          <div onClick={handleShow.bind(null, index)}>
            <FontAwesomeIcon style={{ color: "blue" }} icon={faPencil} />
          </div>
          <div onClick={removeCategory.bind(null, item._id)}>
            <FontAwesomeIcon style={{ color: "red" }} icon={faTrash} />
          </div>
        </div>
      </td>
    </>
  );
};
export default SingleItem;
