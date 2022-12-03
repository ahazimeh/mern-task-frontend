import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import axios from "./api/axios";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import { Category } from "./types";

function Categories() {
  const [show, setShow] = useState(false);
  const [itemId, setItemId] = useState<number | string>(0);
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
    setCategory("");
  };

  const removeCategory = async (catId: string) => {
    await axios({
      url: `removeCategory/${catId}`,
      method: "delete",
    });
    getAllCategories();
  };

  const handleShow = (index: number) => {
    setImage("");
    if (index !== -1) {
      setCategory(menu[index]?.name);
      setItemId(menu[index]?._id || 0);
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
    setMenu(categories.data.menu);
  };
  const uploadImage = async () => {
    if (!category || (!image && !itemId)) {
      return;
    }
    // event.preventDefault();
    let formData = new FormData();
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
      <NavBar />
      <Button variant="primary" onClick={handleShow.bind(null, -1)}>
        Add Category
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
              value={category}
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
          {menu?.map((cat: Category, index: number) => {
            return (
              <tr key={cat._id}>
                <td>{cat._id}</td>
                <td>{cat.name}</td>
                <td>
                  <div style={{ display: "flex" }}>
                    <img
                      height="50px"
                      src={`http://localhost:8000/${cat.image}`}
                    />
                  </div>
                </td>
                <td>
                  <div style={{ display: "flex", gap: "20px" }}>
                    <div onClick={handleShow.bind(null, index)}>edit</div>
                    <div onClick={removeCategory.bind(null, cat._id)}>
                      delete
                    </div>
                    <div>
                      <Link to={`/items/${cat._id}`}>items</Link>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default Categories;
