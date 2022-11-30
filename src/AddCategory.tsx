import axios from "axios";
import { useState } from "react";

const AddCategory = () => {
  const [image, setImage] = useState("");
  const uploadImage = (event: any) => {
    event.preventDefault();
    let formData = new FormData();
    console.log(image);
    formData.append("image", image, "image");
    axios({
      url: "http://localhost:8000/image",
      method: "post",
      data: formData,
    }).then((res) => {
      console.log(res);
    });
  };
  const handleFile = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  return (
    <div>
      <form onSubmit={uploadImage}>
        <input type="file" name="image" onChange={(e) => handleFile(e)} />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};
export default AddCategory;
