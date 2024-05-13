import { useRef, useContext } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import axios from "../axios";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-hot-toast";

const Button = () => {
  const { token } = useContext(UserContext);
  const imageRef = useRef();

  const handleChange = async (e) => {
    e.preventDefault();

    try {
      const image = imageRef.current.files[0];
      console.log(image);

      const formData = new FormData();
      formData.append("image", image);

      console.log(formData);

      const { data } = await axios.post("/api/gallery", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.success);
        imageRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <label className="gallery-button" htmlFor="file_picker">
        <AiFillPlusCircle />
        <input
          hidden
          type="file"
          name="file_picker"
          id="file_picker"
          ref={imageRef}
          onChange={(e) => handleChange(e)}
        />
      </label>
    </>
  );
};

export default Button;
