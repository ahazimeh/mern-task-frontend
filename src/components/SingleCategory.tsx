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
          <div onClick={handleShow.bind(null, index)}>edit</div>
          <div onClick={removeCategory.bind(null, cat._id)}>delete</div>
          <div>
            <Link to={`/items/${cat._id}`}>items</Link>
          </div>
        </div>
      </td>
    </>
  );
};
export default SingleCategory;
