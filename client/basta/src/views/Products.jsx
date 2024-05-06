import { useRef, useContext } from "react";
import axios from "../axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../../context/UserContext";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const { user, loading } = useContext(UserContext);
  const nameRef = useRef();
  const priceRef = useRef();
  const quantityRef = useRef();

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: nameRef.current.value,
        price: priceRef.current.value,
        quantity: quantityRef.current.value,
      };

      const { data } = await axios.post("/api/products", payload, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (data.message) {
        toast.error(data.message);
      } else if (data.success) {
        toast.success(data.success);
        nameRef.current.value = "";
        priceRef.current.value = "";
        quantityRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container mt-5 d-flex flex-column justify-content-center align-items-center mb-5">
        <h1 className="mb-5 title">Products</h1>

        <div className="product-input-container">
          <form
            onSubmit={handleAddProduct}
            className="d-flex flex-row align-items-center justify-content-center"
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
              min={0.1}
              ref={quantityRef}
              placeholder="Enter product quantity"
            />
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
