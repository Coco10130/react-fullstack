import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "../axios";
import { toast } from "react-hot-toast";
import { MdEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";

const Profile = () => {
  const { user, loading, token, updateUserProfile } = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [editable, setEditable] = useState(false);
  const imageRef = useRef();
  const [name, setName] = useState();
  const [contact, setContact] = useState();
  const [birthdate, setBirthdate] = useState();

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

  const hanldeProfileChange = async (e) => {
    e.preventDefault();

    if (!editable) {
      console.log("Execute code");
      console.log(name);
      console.log(birthdate);
    } else {
      console.log("Don't execute code");
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
            {/* Left column */}
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

            {/* Right column */}
            <div className="col-8 d-flex align-items-center justify-content-center flex-column">
              <form onSubmit={hanldeProfileChange} className="w-100">
                <div className="row profile-user-name w-100">
                  <div className="col-6 text-end">
                    <p className="profile-tag">User Name: </p>
                  </div>
                  <div className="col-6 text-start">
                    {editable ? (
                      <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        className="profile-details-edit"
                        defaultValue={profile.userName}
                      />
                    ) : (
                      <p className="profile-details">{profile.userName}</p>
                    )}
                  </div>
                </div>

                <div className="row profile-email w-100">
                  <div className="col-6 text-end">
                    <p className="profile-tag">Email: </p>
                  </div>
                  <div className="col-6 text-start">
                    <p className="profile-details">{profile.email}</p>
                  </div>
                </div>

                <div className="row profile-email w-100">
                  <div className="col-6 text-end">
                    <p className="profile-tag">Contact Number: </p>
                  </div>
                  <div className="col-6 text-start">
                    {editable ? (
                      <input
                        type="number"
                        min={9}
                        onChange={(e) => setContact(e.targer.value)}
                        className="profile-details-edit"
                        defaultValue={profile.phoneNumber}
                      />
                    ) : (
                      <p className="profile-details">{profile.phoneNumber}</p>
                    )}
                  </div>
                </div>

                <div className="row profile-birthdate w-100">
                  <div className="col-6 text-end">
                    <p className="profile-tag">Birthdate: </p>
                  </div>
                  <div className="col-6 text-start">
                    {editable ? (
                      <input
                        type="text" // Change type to "text" for manual input
                        placeholder="YY/MM/DD" // Display placeholder format
                        onChange={(e) => {
                          // Format input to YYYY-MM-DD before setting state
                          const formattedDate = e.target.value
                            .padStart(8, "0")
                            .replace(/(\d{2})(\d{2})/, "$1/$2");
                          setBirthdate(formattedDate);
                        }}
                        className="profile-details-edit"
                        defaultValue={
                          profile.birthdate
                            ? profile.birthdate.slice(0, 10)
                            : ""
                        } // Extract YYYY-MM-DD from existing date
                      />
                    ) : (
                      <p className="profile-details">{profile.birthdate}</p>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-11 d-flex align-items-end justify-content-end">
                    {editable ? (
                      <button
                        type="submit"
                        onClick={() => setEditable(!editable)}
                        className="edit-profile-btn btn btn-outline-secondary"
                      >
                        <FaSave className="edit-icon" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditable(!editable)}
                        className="edit-profile-btn btn btn-outline-secondary"
                      >
                        <MdEdit className="edit-icon" />
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
