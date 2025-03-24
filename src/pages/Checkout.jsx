import Breadcrumb from "./Breadcrumbs";
// import { useSelector } from "react-redux";
// import { loadStripe } from "@stripe/stripe-js";
// import Cookies from "js-cookie";
// import axios from "axios";
// import { toast } from "react-toastify";

function CheckoutPage() {
  // const cart = useSelector((state) => state.cart);
  // const url = import.meta.env.VITE_API_URL;
  // const token = Cookies.get("token");
  // const headers = { Authorization: `Bearer ${token}` };

  // const makePayment = async () => {
  //   const stripe = await loadStripe(
  //     import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  //   );

  //   const body = {
  //     products: cart,
  //   };

  //   const data = axios.post(
  //     `${url}/products/makePayment`,
  //     JSON.stringify(body),
  //     {
  //       headers,
  //     }
  //   );

  //   // if (data.statusText === "OK") {
  //   //   toast.success("Product added to cart");
  //   // } else {
  //   //   toast.error(data.message);
  //   // }
  //   const session = await data.json();

  //   const result = stripe.redirectToCheckout({
  //     sessionId : session.id
  //   })

  // };

  // async function handleCheckout() {
  //   const stripe = await getStripe();
  //   const { error } = await stripe.redirectToCheckout({
  //     lineItems: [
  //       {
  //         price: import.meta.env.VITE_STRIPE_PRODUCT_ID,
  //         quantity: 1,
  //       },
  //     ],
  //     mode: 'subscription',
  //     successUrl: `http://localhost:5000/success`,
  //     cancelUrl: `http://localhost:5000/cancel`,
  //     customerEmail: 'customer@email.com',
  //   });
  //   console.log(error.message);
  // }
  return (
    <>
      {/* Breadcrumb section */}
      <Breadcrumb title="Checkout"></Breadcrumb>
      {/* <button onClick={makePayment}>Checkout</button> */}
      {/* <section className="checkout spad">
        <div className="container">
          <div className="checkout__form">
            <form action="#">
              <div className="row">
                <div className="col-lg-8 col-md-6">
                  
                  <h6 className="checkout__title">Billing Details</h6>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="checkout__input">
                        <p>
                          First Name<span>*</span>
                        </p>
                        <input type="text" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="checkout__input">
                        <p>
                          Last Name<span>*</span>
                        </p>
                        <input type="text" />
                      </div>
                    </div>
                  </div>
                  <div className="checkout__input">
                    <p>
                      Country<span>*</span>
                    </p>
                    <input type="text" />
                  </div>
                  <div className="checkout__input">
                    <p>
                      Address<span>*</span>
                    </p>
                    <input
                      type="text"
                      placeholder="Street Address"
                      className="checkout__input__add"
                    />
                    <input
                      type="text"
                      placeholder="Apartment, suite, unite ect (optinal)"
                    />
                  </div>
                  <div className="checkout__input">
                    <p>
                      Town/City<span>*</span>
                    </p>
                    <input type="text" />
                  </div>
                  <div className="checkout__input">
                    <p>
                      Country/State<span>*</span>
                    </p>
                    <input type="text" />
                  </div>
                  <div className="checkout__input">
                    <p>
                      Postcode / ZIP<span>*</span>
                    </p>
                    <input type="text" />
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="checkout__input">
                        <p>
                          Phone<span>*</span>
                        </p>
                        <input type="text" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="checkout__input">
                        <p>
                          Email<span>*</span>
                        </p>
                        <input type="text" />
                      </div>
                    </div>
                  </div>
                  <div className="checkout__input__checkbox">
                    <label htmlFor="acc">
                      Create an account?
                      <input type="checkbox" id="acc" />
                      <span className="checkmark"></span>
                    </label>
                    <p>
                      Create an account by entering the information below. If
                      you are a returning customer please login at the top of
                      the page
                    </p>
                  </div>
                  <div className="checkout__input">
                    <p>
                      Account Password<span>*</span>
                    </p>
                    <input type="text" />
                  </div>
                  <div className="checkout__input__checkbox">
                    <label htmlFor="diff-acc">
                      Note about your order, e.g, special noe for delivery
                      <input type="checkbox" id="diff-acc" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="checkout__input">
                    <p>
                      Order notes<span>*</span>
                    </p>
                    <input
                      type="text"
                      placeholder="Notes about your order, e.g. special notes for delivery."
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="checkout__order">
                    <h6 className="order__title">Your order</h6>
                    <div className="checkout__order__products">
                      Product <span>Total</span>
                    </div>
                    <ul className="checkout__total__products">
                      <li>
                        <samp>01.</samp> Vanilla salted caramel{" "}
                        <span>$ 300.0</span>
                      </li>
                      <li>
                        <samp>02.</samp> German chocolate <span>$ 170.0</span>
                      </li>
                      <li>
                        <samp>03.</samp> Sweet autumn <span>$ 170.0</span>
                      </li>
                      <li>
                        <samp>04.</samp> Cluten free mini dozen{" "}
                        <span>$ 110.0</span>
                      </li>
                    </ul>
                    <ul className="checkout__total__all">
                      <li>
                        Subtotal <span>$750.99</span>
                      </li>
                      <li>
                        Total <span>$750.99</span>
                      </li>
                    </ul>
                    <div className="checkout__input__checkbox">
                      <label htmlFor="acc-or">
                        Create an account?
                        <input type="checkbox" id="acc-or" />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adip elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <div className="checkout__input__checkbox">
                      <label htmlFor="payment">
                        Check Payment
                        <input type="checkbox" id="payment" />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="checkout__input__checkbox">
                      <label htmlFor="paypal">
                        Paypal
                        <input type="checkbox" id="paypal" />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <button type="submit" className="site-btn">
                      PLACE ORDER
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section> */}
    </>
  );
}

export default CheckoutPage;
