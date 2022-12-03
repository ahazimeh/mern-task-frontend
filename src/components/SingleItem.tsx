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
    <tr key={item._id}>
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
          <div onClick={handleShow.bind(null, index)}>edit</div>
          <div onClick={removeCategory.bind(null, item._id)}>delete</div>
        </div>
      </td>
    </tr>
  );
};
export default SingleItem;
