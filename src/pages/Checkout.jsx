import Breadcrumb from "./Breadcrumbs";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
// import ViewAllAddressPage from "./ViewAllAddressPage";
import { useEffect, useState } from "react";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const cart = useSelector((state) => state.cart);
  const url = import.meta.env.VITE_API_URL;
  const token = Cookies.get("token");
  const headers = { Authorization: `Bearer ${token}` };
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const username = JSON.parse(Cookies.get("details")).usrname;

  const fetchAddress = async () => {
    try {
      const response = await axios.get(`${url}/users/getUserAddress`, {
        params: { username },
        headers,
      });
      setAddresses(response.data.result);
      if (response.data.result.length > 0) {
        setSelectedAddress(response.data.result[0]._id);
      }
    } catch (error) {
      toast.error("Failed to fetch addresses.", error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  const handleAddressSelect = (addressId) => {
    setSelectedAddress(addressId);
  };

  const totalCartPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  console.log(cart, 890);

  const makePayment = async () => {
    const stripe = await loadStripe(
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    );

    const data = axios.post(
      `${url}/products/makePayment`,
      { products: cart, addressId: selectedAddress },
      {
        headers,
      }
    );

    console.log(data, 790);

    if (data.statusText === "OK") {
      toast.success("Product added to cart");
    } else {
      toast.error(data.message);
    }
    const session = await data;

    console.log(session, 7877);

    const result = stripe.redirectToCheckout({
      sessionId: session.data.result.id,
    });
  };

  return (
    <>
      {/* Breadcrumb section */}
      <Breadcrumb title="Checkout"></Breadcrumb>
      {/* <button onClick={makePayment}>Checkout</button> */}

      <section className="checkout spad">
        <div className="container">
          <div className="checkout__form">
            <form action="#">
              <div className="row">
                <div className="col-lg-8 col-md-6">
                  <h6 className="checkout__title">Select Address</h6>
                  {/* <ViewAllAddressPage /> */}
                  {addresses.length > 0 ? (
                    <div className="address-selection">
                      {addresses.map((address) => (
                        <div key={address._id} className="address-option">
                          <div className="payment-address-container">
                            <div className="payment__address__label">
                              <input
                              className="address__selection"
                                type="radio"
                                name="selectedAddress"
                                value={address._id}
                                checked={selectedAddress === address._id}
                                onChange={() =>
                                  handleAddressSelect(address._id)
                                }
                              />
                              <span>
                                <label>
                                  {address.addressLine1}, {address.addressLine2},
                                </label>
                                {address.landmark ? (
                                  <>
                                   <label>
                                    <span>{address.landmark},</span>
                                    </label>
                                    <span>
                                      {" "},{address.city},{" "}
                                      {
                                        State.getStateByCodeAndCountry(
                                          address.state,
                                          address.country
                                        ).name
                                      }
                                      ,{" "}
                                      {
                                        Country.getCountryByCode(
                                          address.country
                                        ).name
                                      }{" "}
                                      - {address.pincode}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span>
                                      {address.city},{" "}
                                      {
                                        State.getStateByCodeAndCountry(
                                          address.state,
                                          address.country
                                        ).name
                                      }
                                      ,{" "}
                                      {
                                        Country.getCountryByCode(
                                          address.country
                                        ).name
                                      }{" "}
                                      - {address.pincode}
                                    </span>
                                  </>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No addresses found. Please add one.</p>
                  )}
                  <button
                  type="submit"
                  className="address-submit-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/addEditAddress");
                  }}
                >
                  Add new address
                </button>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="checkout__order">
                    <h6 className="order__title">Your order</h6>
                    <div className="checkout__order__products">
                      Product <span>Total</span>
                    </div>
                    {cart.map((item) => (
                      <div
                        key={item.productId}
                        className="checkout__table__body"
                      >
                        <ul className="checkout__total__products">
                          <li>
                            <samp>{item.productDetails[0].dessertName}</samp>
                            <span>{item.price * item.quantity}</span>
                          </li>
                        </ul>
                      </div>
                    ))}

                    <ul className="checkout__total__all">
                      <li>
                        Total <span>Rs. {totalCartPrice}</span>
                      </li>
                    </ul>
                    <button
                      type="submit"
                      className="site-btn"
                      onClick={
                        // e.preventDefault();
                        makePayment
                      }
                    >
                      PLACE ORDER
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default CheckoutPage;
