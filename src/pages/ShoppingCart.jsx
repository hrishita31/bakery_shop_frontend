import Header from "../../public/js/components/Header";
import Footer from "../../public/js/components/Footer";
import Breadcrumb from "./Breadcrumbs";
import { useNavigate } from "react-router-dom";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { IconPlus } from "@tabler/icons-react";
import { IconMinus } from "@tabler/icons-react";
import {
  checkoutCart,
  decrementQuantity,
  // fetchCartData,
  incrementQuantity,
  removeItem,
} from "../react-redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { deleteFromCart } from "./DeleteFromCart";
import { reduceCount } from "./updateCartQuantity";

function ShoppingCartPage() {
  const image_url = import.meta.env.VITE_IMAGE_URL;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const username = JSON.parse(Cookies.get("details")).usrname;

  // useEffect(()=>{
  //   if(token){
  //      dispatch(fetchCartData(username));
  //   }
  // },[token, username, dispatch])

  const handleCheckout = async () => {
    console.log(cart, "checkout cart");
    dispatch(checkoutCart(cart));
    // dispatch(fetchCartData(username));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const decrementFromCart = (productId) => {
    dispatch(
      decrementQuantity({
        productId,
      })
    );
  };

  const incrementToCart = (productId) => {
    dispatch(
      incrementQuantity({
        productId,
      })
    );
  };

  const removeFromCart = (productId) => {
    dispatch(
      removeItem({
        productId,
      })
    );
  };

  useEffect(() => {
    console.log(cart, "cart");
  }, [cart]);

  useEffect(() => {
    console.log(cart, "cart");
    if (cart.length === 0) {
     // dispatch(fetchCartData(username));
    }
  }, [cart.length, username, dispatch]);

  return (
    <>
      {/* header section */}
      <Header />

      {/* breadcrumb section */}
      <Breadcrumb title="Shopping Cart"></Breadcrumb>

      {/* shopping cart section */}
      <section className="shopping-cart spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="shopping__cart__table">
                <table>
                  <div className="shopping__cart__table__headers">
                    <thead>
                      <tr>
                        <div className="table__contents">
                        <div className="product__table"><th>Product</th></div>
                        <div className="quantity__table"><th>Quantity</th></div>
                        <div className="total_table"><th>Total</th></div>
                        </div>
                      </tr>
                    </thead>
                  </div>
                  <tbody>
                    <tr>
                      {cart &&
                        cart.map((item) => (
                          <div
                            key={item.productId}
                            className="shopping__cart__table__body"
                          >
                            <td className="product__cart__item">
                              <div className="product__item__details">
                              <div className="product__cart__item__pic">
                                <img
                                  src={`${image_url}/images/product/${item.image}`}
                                  // src={`${image_url}/images/product/${item?.productDetails[0]?.image?.filename}`}
                                  // alt={item.dessertName}
                                  alt={item?.productDetails[0]?.dessertName}
                                />
                              </div>
                              <div className="product__cart__item__text">
                                <h6>{item.dessertName}</h6>
                                {/* <h6>{item?.productDetails[0]?.dessertName}</h6> */}
                              </div>
                              </div>
                            </td>
                            <td className="quantity__item">
                              <div className="quantity">
                                <div className="decrease__quantity">
                                  <a
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      console.log(item.productId, "product id");
                                      {
                                        item.quantity === 1
                                          ? reduceCount(item.productId)
                                          : null;
                                      }
                                      decrementFromCart(item.productId);
                                    }}
                                  >
                                    <IconMinus color="black" />
                                  </a>
                                </div>
                                <div className="pro-qty">{item.quantity}</div>
                                <div className="increase__quantity">
                                  <a
                                    href="#"
                                    onClick={(e) => {
                                      console.log(item, 7907);
                                      e.preventDefault();
                                      console.log(item, 770707);
                                      incrementToCart(item.productId);
                                    }}
                                  >
                                    <IconPlus color="black" />
                                  </a>
                                </div>
                              </div>
                            </td>
                            <td className="cart__price">
                              Rs. {item.price * item.quantity}
                            </td>
                            
                            <td className="cart__close">
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  deleteFromCart(item.productId);
                                  removeFromCart(item.productId);
                                }}
                              >
                                <IconSquareRoundedX color="red" />
                              </a>
                            </td>
                          </div>
                        ))}
                      {/* </div> */}
                      {/* ))} */}
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="continue__btn">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/");
                      }}
                    >
                      Continue Shopping
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="cart__total">
                <h6>Cart total</h6>
                <ul>
                  <li>
                    Total <span>Rs {totalPrice}</span>
                  </li>
                </ul>
                <a href="#" className="primary-btn" onClick={handleCheckout}>
                  Proceed to checkout
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer section */}
      <Footer />
    </>
  );
}

export default ShoppingCartPage;
