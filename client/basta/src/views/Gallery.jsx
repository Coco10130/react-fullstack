import GalleryCard from "../components/GalleryCard";
import Button from "../components/Button";

const Gallery = () => {
  return (
    <>
      <div className="gallery-container d-flex flex-column align-items-center justify-content-start">
        <h1 className="gallery-title mt-5 mb-5 text-center">Gallery</h1>

        <div className="cards-container d-flex align-items-center justify-content-center">
          <GalleryCard />
        </div>

        <Button />
      </div>
    </>
  );
};

export default Gallery;
