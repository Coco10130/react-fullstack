import axios from "../axios";
import { UserContext } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import Loading from "./Loading";

const GalleryCard = () => {
  const { user, token, loading } = useContext(UserContext);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        if (!loading && user && token) {
          const response = await axios.get("/api/gallery", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setCards(response.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [user, loading, cards]);

  return (
    <>
      <div className="row">
        {isLoading ? (
          <Loading />
        ) : cards.length === 0 ? (
          <p className="card-is-empty text-center mt-5">gallery is empty</p>
        ) : (
          cards.map((card, index) => (
            <div className="col-4 mt-5 mb-3" key={index}>
              <div className="gallery-card">
                <a href={`/images/${card.image}`}>
                  <img src={`/images/${card.image}`} alt="image" />
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default GalleryCard;
