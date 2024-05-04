import { useState, useEffect, useRef, useContext } from "react";
import axios from "../axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../../context/UserContext";

const Products = () => {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editableProductId, setEditableProductId] = useState(null);
  const nameRef = useRef();
  const priceRef = useRef();
  const quantityRef = useRef();
  const updatePrice = useRef();
  const updateQuantity = useRef();

  useEffect(() => {
    if (!user) {
      return;
    } else {
      console.log("Logged in");
    }

    const fetchTask = async () => {
      try {
        const response = await axios.get("/api/products", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error(`Error fetching: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [user]);

  const handleDelete = async (id) => {
    const productId = id;
    try {
      const { data } = await axios.delete(`/api/products/${productId}`);
      if (data.success) {
        toast.success(data.success);
        setProducts(products.filter((product) => product._id !== productId));
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: nameRef.current.value,
        price: priceRef.current.value,
        quantity: quantityRef.current.value,
      };

      const { data } = await axios.post("/api/products", payload);

      if (data.message) {
        toast.error(data.message);
      } else if (data.success) {
        toast.success(data.success);
        setProducts((products) => [...products, data.data]);
        nameRef.current.value = "";
        priceRef.current.value = "";
        quantityRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id) => {
    setEditableProductId(id);
  };

  const handleSaveUpdate = async (id) => {
    const updatedProduct = {
      price: parseFloat(updatePrice.current.value),
      quantity: parseFloat(updateQuantity.current.value),
    };

    try {
      const { data } = await axios.put(`/api/products/${id}`, updatedProduct);

      if (data.success) {
        toast.success(data.success);

        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === id ? { ...product, ...updatedProduct } : product
          )
        );

        setEditableProductId(null);
      } else {
        toast.error(data.message);
        setEditableProductId(null);
      }
    } catch (error) {
      console.error(error);
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
            <input type="text" ref={nameRef} placeholder="Enter product name" />
            <input
              type="number"
              ref={priceRef}
              placeholder="Enter product price"
            />
            <input
              type="number"
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
                    {editableProductId === product._id ? (
                      <input
                        type="number"
                        defaultValue={product.price}
                        ref={updatePrice}
                        className="update-price"
                      />
                    ) : (
                      <span className="text">{product.price}</span>
                    )}
                  </div>

                  <div className="col-3 text-center mb-2">
                    <p className="product-title mb-3">Quantity</p>
                    {editableProductId === product._id ? (
                      <input
                        type="number"
                        defaultValue={product.quantity}
                        ref={updateQuantity}
                        className="update-quantity"
                      />
                    ) : (
                      <span className="text">{product.quantity}</span>
                    )}
                  </div>

                  <div className="col-3 d-flex justify-content-end align-items-center">
                    {editableProductId === product._id ? (
                      <button
                        onClick={() => handleSaveUpdate(product._id)}
                        className="update-btn btn btn-secondary"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpdate(product._id)}
                        className="update-btn btn btn-secondary"
                      >
                        Update
                      </button>
                    )}

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
