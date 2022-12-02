import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import axios from "./api/axios";

const menu = {
  categories: [
    {
      name: "Platters1",
      image: "https://via.placeholder.com/150",
      items: [
        {
          name: "Chicken Platter",
          description:
            "4 chicken pieces with our special sauce served with bbq dip and wedges",
          price: 160000,
          image: "https://via.placeholder.com/150",
        },
      ],
    },
    {
      name: "Platters2",
      image: "https://via.placeholder.com/150",
      items: [
        {
          name: "Chicken Platter",
          description:
            "4 chicken pieces with our special sauce served with bbq dip and wedges",
          price: 160000,
          image: "https://via.placeholder.com/150",
        },
      ],
    },
    {
      name: "Platters3",
      image: "https://via.placeholder.com/150",
      items: [
        {
          name: "Chicken Platter",
          description:
            "4 chicken pieces with our special sauce served with bbq dip and wedges",
          price: 160000,
          image: "https://via.placeholder.com/150",
        },
        {
          name: "Chicken Platter",
          description:
            "4 chicken pieces with our special sauce served with bbq dip and wedges",
          price: 160000,
          image: "https://via.placeholder.com/150",
        },
      ],
    },
  ],
};

function Categories() {
  const [show, setShow] = useState(false);
  const [itemId, setItemId] = useState(0);
  const [image, setImage] = useState<Blob | string>("");

  const handleClose = () => {
    setShow(false);
    uploadImage();
  };
  const handleShow = (id: number) => {
    setImage("");
    setItemId(id);
    setShow(true);
    // uploadImage();
  };

  const uploadImage = () => {
    // event.preventDefault();
    let formData = new FormData();
    console.log("a", image);
    formData.append("image", image, "image");
    axios({
      url: "image",
      method: "post",
      data: formData,
    }).then((res) => {
      console.log(res);
    });
  };
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("asd");
    const file = e.target.files![0];
    console.log(file);
    setImage(file || "");
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow.bind(null, 0)}>
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
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
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
          <Button variant="primary" onClick={handleClose}>
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
          {menu.categories.map((cat, index) => {
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
