import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { Item } from "../types";
import SingleItem from "./SingleItem";
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
  Draggable,
} from "react-beautiful-dnd";

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
    setShow(true);
  };

  const getAllCategories = async () => {
    const categories = await axios.get(
      `http://localhost:8000/categories/${categoryId}`
    );
    setMenu(categories.data.menu);
  };
  const uploadImage = async () => {
    if (!name) {
      return;
    }
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
        method: "put",
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
        <DragDropContext
          onDragEnd={async (param) => {
            let srcI = param.source.index;
            let desI = param.destination?.index ?? -1;
            if (desI === -1 || srcI === desI) return;
            let sourceId = menu.items[srcI]._id;
            let destId = menu.items[desI]._id;
            menu.items.splice(desI, 0, menu.items.splice(srcI, 1)[0]);
            await axios({
              url: `orderItems/${menu._id}/${sourceId}/${destId}`,
              method: "post",
            });
            getAllCategories();
          }}
        >
          <Droppable droppableId="droppable-1">
            {(
              provided: DroppableProvided,
              snapshot: DroppableStateSnapshot
            ) => (
              <tbody ref={provided.innerRef} {...provided.droppableProps}>
                {menu?.items?.map((item: Item, index: number) => {
                  return (
                    <Draggable
                      key={item._id}
                      draggableId={`draggable-${item._id}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            boxShadow: snapshot.isDragging
                              ? "0 0 0.4rem #666"
                              : "none",
                          }}
                        >
                          <SingleItem
                            cat={menu}
                            item={item}
                            index={index}
                            handleShow={handleShow}
                            removeCategory={removeCategory}
                          />
                        </tr>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </DragDropContext>
      </Table>
    </>
  );
}

export default Items;
