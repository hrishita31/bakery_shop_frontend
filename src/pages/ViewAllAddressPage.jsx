import Breadcrumb from "./Breadcrumbs";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import DeleteAddress from "./DeleteAddressPage";
import Popup from "reactjs-popup";
import { IconTrash, IconPencil } from "@tabler/icons-react";
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
      const response = await axios.get(`${url}/users/getUserAddress`, {
        params: { username },
        headers,
      });
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
      <Breadcrumb title="Saved addresses" />

      {address.length > 0 ? (
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
                      <div className="address__icons">
                        {/* Edit Button */}
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

                        {/* Delete Button */}
                        <div className="address__delete">
                          <Popup
                            className="popup__modal"
                            trigger={
                              <button className="member__status__button delete-btn">
                                <IconTrash color="black" />
                              </button>
                            }
                            modal
                            nested
                          >
                            {(close) => (
                              <div className="modal__member">
                                <span>
                                  Are you sure you want to delete the address?
                                </span>
                                <div className="modal__status">
                                  <button
                                    className="modal__yes__button"
                                    onClick={() =>
                                      handleDeleteAddress(
                                        addressItem._id,
                                        close
                                      )
                                    }
                                  >
                                    Yes
                                  </button>
                                  <button
                                    className="modal__no__button"
                                    onClick={close}
                                  >
                                    No
                                  </button>
                                </div>
                              </div>
                            )}
                          </Popup>
                        </div>
                      </div>
                    </div>

                    {/* Address Display */}
                    <span>
                      <div>{addressItem.addressLine1},</div> 
                      <div>{addressItem.addressLine2},</div>
                      <div>{addressItem.landmark && <>{addressItem.landmark},</>}</div>
                      <div>{addressItem.city},</div>
                      <div>{
                        State.getStateByCodeAndCountry(
                          addressItem.state,
                          addressItem.country
                        )?.name
                      },</div>
                      {Country.getCountryByCode(addressItem.country)?.name} -{" "}
                      {addressItem.pincode}
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
      ) : (
        <div>No address</div>
      )}
    </>
  );
}

export default ViewAllAddressPage;
