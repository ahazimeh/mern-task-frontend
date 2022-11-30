import axios from "axios";
import { useState } from "react";

const AddCategory = () => {
  const [image, setImage] = useState<Blob | string>("");
  const uploadImage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let formData = new FormData();
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
    const file = e.target.files![0];
    setImage(file || "");
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          uploadImage(e);
        }}
      >
        <input type="file" name="image" onChange={(e) => handleFile(e)} />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};
export default AddCategory;
