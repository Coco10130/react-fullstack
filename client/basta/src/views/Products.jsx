import { useState, useEffect } from "react";
import axios from "../axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    quantity: 0,
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error(`Error fetching: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, []);

  const handleDelete = async (id) => {
    const productId = id;
    try {
      await axios.delete(`/api/products/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    console.log("product added");
    try {
      const response = await axios.post("/api/products", newProduct);
      setProducts([...products, response.data]);
      setNewProduct({
        name: "",
        price: 0,
        quantity: 0,
      });
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  return (
    <>
      <div className="container mt-5 d-flex flex-column justify-content-center align-items-center mb-5">
        <h2 className="mb-5 title">Products</h2>

        <div className="product-input-container">
          <form
            onSubmit={handleAddProduct}
            className="d-flex flex-row align-items-center justify-content-center"
          >
            <input
              type="text"
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              placeholder="Enter product name"
            />
            <input
              type="number"
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              placeholder="Enter product price"
            />
            <input
              type="number"
              onChange={(e) =>
                setNewProduct({ ...newProduct, quantity: e.target.value })
              }
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

        <ul className="list-container mt-5">
          {isLoading ? (
            <div className="loader-container">
              <div className="loader"></div>
              <div className="loader-text">Loading...</div>
            </div>
          ) : products.length === 0 ? (
            <p className="card-is-empty">product list is empty</p>
          ) : (
            products.map((product, index) => (
              <li key={index} className="lists mb-2">
                <div className="row">
                  <div className="col-3 text-center mb-2">
                    <p className="product-title mb-3">Name</p>
                    <span className="text">{product.name}</span>
                  </div>
                  <div className="col-3 text-center mb-2">
                    <p className="product-title mb-3">Price</p>
                    <span className="text">{product.price}</span>
                  </div>
                  <div className="col-3 text-center mb-2">
                    <p className="product-title mb-3">Quantity</p>
                    <span className="text">{product.quantity}</span>
                  </div>
                  <div className="col-3 d-flex justify-content-end align-items-center">
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="delete-btn btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
};

export default Products;
