import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import axios from "./api/axios";

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

function Categories() {
  const [show, setShow] = useState(false);
  const [itemId, setItemId] = useState(0);
  const [image, setImage] = useState<Blob | string>("");
  const [category, setCategory] = useState("");
  const [menu, setMenu] = useState<any>();
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

  const handleShow = (index: number) => {
    setImage("");
    if (index !== -1) {
      setItemId(
        // +menu?.categories?[index]?.name ||
        0
      );
    }
    // setItemId(id);
    setShow(true);
    // uploadImage();
  };

  const getAllCategories = async () => {
    const categories = await axios.get("http://localhost:8000/categories", {
      params: {
        username: "john1904",
      },
    });
    console.log(categories);
    setMenu(categories.data.menu);
  };
  const uploadImage = async () => {
    if (!category || (!image && !itemId)) {
      return;
    }
    // event.preventDefault();
    let formData = new FormData();
    console.log("a", image);
    if (image) formData.append("image", image, "image");
    if (category) formData.append("name", category);
    setCategory("");
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
      axios({
        url: `updateCategory/${itemId}`,
        method: "post",
        data: formData,
      });
      getAllCategories();
      return;
    }
  };
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("asd");
    const file = e.target.files![0];
    console.log(file);
    setImage(file || "");
  };

  return (
    <>
      {category}
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
              onChange={(e) => setCategory(e.target.value)}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
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
            <th>image</th>
            <th>items</th>
          </tr>
        </thead>
        <tbody>
          {menu?.map((cat: any, index: any) => {
            console.log("Asdsa");
            return (
              <tr>
                <td>num</td>
                <td>{cat.name}</td>
                <td>{cat.image}</td>
                <td style={{ display: "flex", gap: "20px" }}>
                  <div onClick={handleShow.bind(null, index)}>edit</div>
                  <div>delete</div>
                  <div>items</div>
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

export default Categories;