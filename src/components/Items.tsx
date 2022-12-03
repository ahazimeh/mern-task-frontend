import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { Item } from "../types";
import SingleItem from "./SingleItem";

function Items() {
  const [show, setShow] = useState(false);
  const [itemId, setItemId] = useState<number | string>(0);
  const [image, setImage] = useState<Blob | string>("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [menu, setMenu] = useState<any>();

  const { categoryId } = useParams();
  useEffect(() => {
    getAllCategories();
  }, []);

  const handleCloseAndSave = () => {
    setShow(false);
    uploadImage();
  };

  const handleClose = () => {
    setShow(false);
    setName("");
    setDescription("");
    setPrice("");
    // uploadImage();
  };

  const removeCategory = async (catId: string) => {
    await axios({
      url: `removeItem/${categoryId}/${catId}`,
      method: "delete",
    });
    getAllCategories();
  };

  const handleShow = (index: number) => {
    setImage("");
    if (index !== -1) {
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
    if (name) formData.append("itemName", name);
    if (description) formData.append("itemDescription", description);
    if (price) formData.append("itemPrice", price);
    else formData.append("itemPrice", "0");
    setName("");
    setImage("");
    setDescription("");
    setPrice("");
    if (!itemId) {
      await axios({
        url: `addItem/${categoryId}`,
        method: "post",
        data: formData,
      });
      getAllCategories();
      return;
    } else {
      await axios({
        url: `updateItem/${categoryId}/${itemId}`,
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
        Add Item
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
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Price"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Description"
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
          {menu?.items?.map((item: Item, index: number) => {
            console.log(item);
            return (
              <SingleItem
                cat={menu}
                item={item}
                key={item._id}
                index={index}
                handleShow={handleShow}
                removeCategory={removeCategory}
              />
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default Items;
