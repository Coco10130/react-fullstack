import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "../axios";
import { toast } from "react-hot-toast";
import Loading from "../components/Loading";

const Profile = () => {
  const { user, loading, token, updateUserProfile } = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const imageRef = useRef();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!loading && user && token) {
          const response = await axios.get("/api/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setProfile(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [user, loading, token]);

  const handleChange = async (e) => {
    e.preventDefault();
    const id = profile._id;

    try {
      const formData = new FormData();

      const image = imageRef.current.files[0];
      formData.append("image", image);

      const { data } = await axios.put(`/api/profile/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.success);
        setProfile(data.data);
        updateUserProfile(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="profile-container d-flex align-items-center justify-content-center">
        <div className="profile-background">
          <div className="row">
            <div className="col">
              <h1 className="profile-title">Profile</h1>
            </div>
          </div>

          <div className="row">
            <div className="col-4 d-flex justify-content-center align-items-center profile-col">
              <label htmlFor="file_picker" className="profile-button">
                <img
                  src={
                    profile.image
                      ? `/images/${profile.image}`
                      : "/images/default-img.png"
                  }
                  alt="Profile"
                  className="image-btn"
                />

                <input
                  hidden
                  type="file"
                  id="file_picker"
                  name="file_picker"
                  ref={imageRef}
                  onChange={(e) => handleChange(e)}
                />
              </label>
            </div>
            <div className="col-8"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
