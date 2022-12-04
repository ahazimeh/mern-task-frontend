import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import NavBar from "./NavBar";
import { Category } from "../types";
import SingleCategory from "./SingleCategory";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";

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
    setShow(true);
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
        <DragDropContext
          onDragEnd={async (param) => {
            let srcI = param.source.index;
            let desI = param.destination?.index ?? -1;
            if (desI === -1 || srcI === desI) return;
            let sourceId = menu[srcI]._id;
            let destId = menu[desI]._id;
            menu.splice(desI, 0, menu.splice(srcI, 1)[0]);
            await axios({
              url: `orderCategories/${sourceId}/${destId}`,
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
                {menu?.map((cat: Category, index: number) => {
                  return (
                    <Draggable
                      key={cat._id}
                      draggableId={`draggable-${cat._id}`}
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
                          <SingleCategory
                            handleShow={handleShow}
                            removeCategory={removeCategory}
                            index={index}
                            cat={cat}
                            key={cat._id}
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

export default Categories;
