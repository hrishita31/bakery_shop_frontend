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
import { IconTrash } from "@tabler/icons-react";
import { IconPencil } from "@tabler/icons-react";
import { Country, State } from "country-state-city";

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
        {
          headers,
        }
      );
      setAddress(response.data.result);
    } catch (error) {
      toast.error("Failed to fetch address: ", error.message);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  const handleDeleteAddress = async (id, close) => {
    try {
      await DeleteAddress(id);
      await fetchAddress();
      close();
    } catch (error) {
      toast.error("Failed to delete address.", error);
    }
  };

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
                      <div className="address__label">
                        {/* <label>Address: </label> */}

                        <div className="address__icons">
                          <div className="address__edit">
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                navigate(
                                  `/addEditAddress?_id=${addressItem._id}`
                                );
                              }}
                            >
                              <button className="member__edit__button">
                              <IconPencil color="black" />
                              </button>
                            </a>
                          </div>
                          <div className="address__delete">
                            <Popup
                              trigger={
                                <button className="member__status__button">
                                  <IconTrash color="black" />
                                </button>
                              }
                              modal
                              nested
                            >
                              {(close) => (
                                <>
                                  <div className="modal__member">
                                    <span>
                                      Are you sure you want to delete the
                                      address?
                                    </span>
                                    <div className="modal__status">
                                      <div className="modal__yes">
                                        <button
                                          className="modal__yes__button"
                                          onClick={() => {
                                            handleDeleteAddress(
                                              addressItem._id,
                                              close
                                            );
                                          }}
                                        >
                                          Yes
                                        </button>
                                      </div>
                                      <div className="modal__no">
                                      <button className="modal__no__button" onClick={close}>No</button>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </Popup>
                          </div>
                        </div>
                      </div>

                      <span>
                        <span>
                          {addressItem.addressLine1}, {addressItem.addressLine2}
                          ,
                        </span>
                        {addressItem.landmark ? (
                          <>
                            <span>{addressItem.landmark},</span>
                            <span>
                              {addressItem.city},{" "}
                              {
                                State.getStateByCodeAndCountry(
                                  addressItem.state,
                                  addressItem.country
                                ).name
                              }
                              ,{" "}
                              {
                                Country.getCountryByCode(addressItem.country)
                                  .name
                              }{" "}
                              - {addressItem.pincode}
                            </span>
                          </>
                        ) : (
                          <>
                            <span>
                              {addressItem.city},{" "}
                              {
                                State.getStateByCodeAndCountry(
                                  addressItem.state,
                                  addressItem.country
                                ).name
                              }
                              ,{" "}
                              {
                                Country.getCountryByCode(addressItem.country)
                                  .name
                              }{" "}
                              - {addressItem.pincode}
                            </span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="class__submit">
                <button
                  type="submit"
                  className="submit-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/addEditAddress");
                  }}
                >
                  Add new address
                </button>
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
