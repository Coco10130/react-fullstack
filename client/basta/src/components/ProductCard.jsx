import axios from "../axios.js";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading.jsx";

const ProductCard = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const { user, loading, token } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!loading && user && token) {
          const response = await axios.get("/api/products", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setCards(response.data);
        } else if (!loading && !user) {
          toast.error("Not authenticated");
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [user, loading, cards]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {isLoading ? (
            <Loading />
          ) : cards.length === 0 ? (
            <p className="card-is-empty text-center mt-5">
              product list is empty
            </p>
          ) : (
            cards.map((card, index) => (
              <div className="col-4 mt-5" key={index}>
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    src={`/images/${card.image}`}
                    className="card-img-top"
                    alt="Basta Image"
                  />
                  <div className="card-body">
                    <h5 className="card-name">{card.name}</h5>
                    <p className="card-price">₱ {card.price}</p>
                    <div className="row d-flex align-items-center justify-content-center">
                      <div className="col-4">
                        <button className="buy-btn btn btn-outline-secondary">
                          Buy
                        </button>
                      </div>

                      <div className="col-8 card-quantity text-center">
                        Quantity: <span>{card.quantity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
