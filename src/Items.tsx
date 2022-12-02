import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import axios from "./api/axios";
import { useParams } from "react-router-dom";

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

function Items() {
  const [show, setShow] = useState(false);
  const [itemId, setItemId] = useState<number | string>(0);
  const [image, setImage] = useState<Blob | string>("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [menu, setMenu] = useState<any>();

  const { categoryId } = useParams();
  console.log(categoryId);
  useEffect(() => {
    getAllCategories();
  }, []);
  const handleCloseAndSave = () => {
    setShow(false);
    uploadImage();
  };

  const handleClose = () => {
    setShow(false);
    // uploadImage();
  };

  const removeCategory = async (catId: number) => {
    await axios({
      url: `removeCategory/${catId}`,
      method: "delete",
    });
    getAllCategories();
  };

  const handleShow = (index: number) => {
    setImage("");
    if (index !== -1) {
      console.log("asdasdas", menu);
      setName(menu.items[index]?.name);
      setDescription(menu.items[index]?.description);
      setPrice(menu.items[index]?.price);
      setItemId(menu.items[index]?._id || 0);
    }
    // setItemId(id);
    setShow(true);
    // uploadImage();
  };

  const getAllCategories = async () => {
    const categories = await axios.get(
      `http://localhost:8000/categories/${categoryId}`,
      {
        params: {
          username: "john1904",
        },
      }
    );
    setMenu(categories.data.menu);
  };
  const uploadImage = async () => {
    if (!name) {
      return;
    }
    // event.preventDefault();
    let formData = new FormData();
    if (image) formData.append("image", image, "image");
    if (name) formData.append("name", name);
    if (description) formData.append("description", description);
    if (price) formData.append("price", price);
    setName("");
    setImage("");
    if (!itemId) {
      await axios({
        url: "addCategory",
        method: "post",
        data: formData,
      });
      getAllCategories();
      return;
    } else {
      await axios({
        url: `updateCategory/${itemId}`,
        method: "post",
        data: formData,
      });
      getAllCategories();
      return;
    }
  };
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImage(file || "");
  };

  return (
    <>
      {name}
      <Button variant="primary" onClick={handleShow.bind(null, -1)}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Woohoo, you're reading this text in a modal!</div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Category Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Category"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Category"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Category"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <input type="file" name="image" onChange={(e) => handleFile(e)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseAndSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>name</th>
            <th>description</th>
            <th>price</th>
            <th>image</th>
            <th>items</th>
          </tr>
        </thead>
        <tbody>
          {menu?.items?.map((item: any, index: any) => {
            return (
              <tr>
                <td>{item._id}</td>
                <td>{menu.name}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{menu.price}</td>
                <td>
                  <div style={{ display: "flex" }}>
                    <img
                      height="50px"
                      src={`http://localhost:8000/${item.image}`}
                    />
                    <div>{item.image}</div>
                  </div>
                </td>
                <td>
                  <div style={{ display: "flex", gap: "20px" }}>
                    <div onClick={handleShow.bind(null, index)}>edit</div>
                    <div onClick={removeCategory.bind(null, item._id)}>
                      delete
                    </div>
                    <div>items</div>
                  </div>
                </td>
              </tr>
            );
          })}
          {/* <tr>
          <td>1</td>
          <td>Mark</td>
          <td>@mdo</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>@fat</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Larry the Bird</td>
          <td>@twitter</td>
          <td>@twitter</td>
        </tr> */}
        </tbody>
      </Table>
    </>
  );
}

export default Items;
