import Header from "../../public/js/components/Header";
import Footer from "../../public/js/components/Footer";
import Breadcrumb from "./Breadcrumbs";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import DeleteAddress from "./DeleteAddressPage";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { IconTrash } from "@tabler/icons-react";
import { IconPencil } from "@tabler/icons-react";

function ViewAllAddressPage() {
  const navigate = useNavigate();
  const [address, setAddress] = useState([]);

  const url = import.meta.env.VITE_API_URL;
  const token = Cookies.get("token");
  const headers = { Authorization: `Bearer ${token}` };

  const username = JSON.parse(Cookies.get("details")).usrname;

  const fetchAddress = async () => {
    try {
      let response = await axios.get(
        `${url}/users/getUserAddress`,
        {
          params: { username },
          headers,
        },
        // {
        //   headers,
        // }
      );
      console.log("saved address: ", response);
      setAddress(response.data.result);
    } catch (error) {
      toast.error("Failed to fetch address: ", error.message);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  return (
    <>
      {/* Header section */}
      <Header />

      {/* Breadcrumbs section */}
      <Breadcrumb title="Saved addresses" />

      {/* View all Address section */}
      {address ? (
        <>
          <div className="details-container">
            <div className="profile-box">
              <div className="details-info">
                {address.map((addressItem) => (
                  <div
                    key={addressItem._id}
                    className="col-lg-3 col-md-6 col-sm-6"
                  >
                    <div className="address-container">
                      <div>
                        <label>Address:</label>

                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/addEditAddress?_id=${addressItem._id}`);
                          }}
                        >
                          <IconPencil color="black" />
                        </a>

                        <Popup
                          trigger={
                            <button>
                              <IconTrash />
                            </button>
                          }
                          modal
                          nested
                        >
                          {(close) => (
                            <>
                              <h4>
                                Are you sure you want to delete the address?
                              </h4>
                              <button
                                onClick={() => {
                                  DeleteAddress(addressItem._id);
                                  close();
                                  fetchAddress();
                                }}
                              >
                                Yes
                              </button>
                              <button onClick={() => close()}>No</button>
                            </>
                          )}
                        </Popup>
                      </div>

                      <span>
                        {addressItem.addressLine1}, {addressItem.addressLine2},{" "}
                        {addressItem.landmark}, {addressItem.city},{" "}
                        {addressItem.state}, {addressItem.country},{" "}
                        {addressItem.pincode}
                        <div></div>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>No address</div>
      )}

      {/* Footer section */}
      <Footer />
    </>
  );
}

export default ViewAllAddressPage;
