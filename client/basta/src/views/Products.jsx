import { useRef, useContext, useEffect } from "react";
import axios from "../axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../../context/UserContext";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const { user, token, loading } = useContext(UserContext);
  const nameRef = useRef();
  const priceRef = useRef();
  const quantityRef = useRef();
  const imageRef = useRef();

  useEffect(() => {
    if (!loading && user) {
      if (!token) {
        return navigate("/login");
      }
    }
  }, [user, loading]);

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      const image = imageRef.current.files[0];

      formData.append("image", image);

      const name = nameRef.current.value;
      const price = priceRef.current.value;
      const quantity = quantityRef.current.value;

      if (!name || !price || !quantity || !image) {
        return toast.error("All fields are required");
      }

      formData.append("name", name);
      formData.append("price", price);
      formData.append("quantity", quantity);

      const { data } = await axios.post("/api/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.message) {
        toast.error(data.message);
      } else if (data.success) {
        toast.success(data.success);
        nameRef.current.value = "";
        priceRef.current.value = "";
        quantityRef.current.value = "";
        imageRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product. Please try again later.");
    }
  };

  return (
    <>
      <div className="container mt-5 d-flex flex-column justify-content-center align-items-center mb-5">
        <h1 className="product-title mb-5">Products</h1>

        <div className="product-input-container">
          <form
            onSubmit={handleAddProduct}
            className="d-flex flex-row align-items-center justify-content-center"
            encType="multipart/form-data"
          >
            <input type="text" ref={nameRef} placeholder="Enter product name" />
            <input
              type="number"
              min={1}
              ref={priceRef}
              placeholder="Enter product price"
            />
            <input
              type="number"
              ref={quantityRef}
              placeholder="Enter product quantity"
            />
            <input type="file" ref={imageRef} />
            <button
              type="submit"
              className="submit-btn btn btn-outline-secondary"
            >
              Submit
            </button>
          </form>
        </div>

        <ProductCard />
      </div>
    </>
  );
};

export default Products;
