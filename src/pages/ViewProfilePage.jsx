import Header from "../../public/js/components/Header";
import Footer from "../../public/js/components/Footer";
import Breadcrumb from "./Breadcrumbs";
import Cookies from "js-cookie";
import { IconUserPlus } from "@tabler/icons-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Popup from "reactjs-popup";
import axios from "axios";
import { useEffect, useState } from "react";

function ViewProfilePage() {
  const username = JSON.parse(Cookies.get("details")).usrname;
  const url = import.meta.env.VITE_API_URL;

  const [profilePic, setProfilePic] = useState("");
  const image_url = import.meta.env.VITE_IMAGE_URL;

  useEffect(() => {
    axios
      .get(`${url}/users/displayProfilePicture?username=${username}`)
      .then((res) => {
        setProfilePic(res.data.result);
      })
      .catch(() => toast.error("Failed to fetch profile"));
  }, []);

  useEffect(() => {
  }, [profilePic]);

  const handleUpload = async (event) => {
    if (!event.target.files[0]) {
      return;
    }

    let formData = new FormData();
    formData.append("image", event.target.files[0]);
    try {
      const response = await axios.patch(
        `${url}/users/addProfilePicture?username=${username}`,
        formData
      );
      if (response.status === 200) {
        window.location.reload();

        toast.success("Profile picture updated successfully!");
      } else {
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {/* Header section */}
      <Header />

      {/* Breadcrumb section */}
      <Breadcrumb title="Details" />

      {/* View details section */}
      <div className="details-container">
        <div className="profile-box">
          <div className="profile-container">
            <div className="image-container">
              <label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  hidden
                  onChange={handleUpload}
                />
                {profilePic.image ? (
                  <img
                    src={`${image_url}/images/user/${profilePic.image.filename}`}
                    alt="profile"
                  />
                ) : (
                  <IconUserPlus size={200} />
                )}
              </label>
            </div>
            <div className="details-info">
              <label>
                {JSON.parse(Cookies.get("details")).firstname}{" "}
                {JSON.parse(Cookies.get("details")).lastname}
              </label>

              <label>Username</label>
              <span>{JSON.parse(Cookies.get("details")).usrname}</span>

              <label>Email</label>
              <span>{JSON.parse(Cookies.get("details")).email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer section */}
      <Footer />
    </>
  );
}

export default ViewProfilePage;
