import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../react-redux/cartSlice";
import { saveCartOnLogout } from "../../react-redux/cartSlice";

export const HeaderSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const cart = useSelector((state) => state.cart);

  let initials;

  if (token) {
    const firstname = JSON.parse(Cookies.get("details")).firstname;
    const lastname = JSON.parse(Cookies.get("details")).lastname;

    const initialFirstname = firstname.substring(0, 1).toUpperCase();
    const initialLastname = lastname.substring(0, 1).toUpperCase();

    initials = initialFirstname + initialLastname;
  }
  const isActive = (path) => location.pathname === path;
  return (
    <>
      <header className="header">
        <div className="header__top">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="header__top__inner">
                  <div className="header__top__left">
                    {/* <HeaderLeftSection /> */}
                    {token ? (
                      ""
                    ) : (
                      <ul>
                        <li>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate("/signUp");
                            }}
                          >
                            Sign up
                          </a>
                        </li>

                        <li>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate("/login");
                            }}
                          >
                            Login
                          </a>
                        </li>
                      </ul>
                    )}
                  </div>

                  <div className="header__logo">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/");
                      }}
                    ></a>

                    <img src="img/logo.png" alt="" />
                  </div>

                  <div className="header__top__right">
                    <div className="header__top__right__links">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/wishlist");
                        }}
                      >
                        <img src="img/icon/heart.png" alt="" />
                      </a>
                    </div>
                    <div className="header__top__right__cart">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/shoppingCart");
                        }}
                      >
                        <img src="img/icon/cart.png" alt="" />
                        <span>{cart.length}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="canvas__open">
              <i className="fa fa-bars"></i>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <nav className="header__menu mobile-menu">
                <ul>
                  <li className={isActive("/") ? "active" : ""}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/");
                      }}
                    >
                      Home
                    </a>
                  </li>
                  <li className={isActive("/about") ? "active" : ""}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/about");
                      }}
                    >
                      About
                    </a>
                  </li>
                  <li className={isActive("/shop") ? "active" : ""}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/shop");
                      }}
                    >
                      Shop
                    </a>
                  </li>
                  <li
                    className={
                      isActive(
                        "/shoppingcart" | "/checkout" | "/wishlist" | "class"
                      )
                        ? "active"
                        : ""
                    }
                  >
                    <a href="#">Pages</a>
                    <ul className="dropdown">
                      <li>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("/shoppingCart");
                          }}
                        >
                          Shopping Cart
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("/checkout");
                          }}
                        >
                          Checkout
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("/wishlist");
                          }}
                        >
                          Wishlist
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("/class");
                          }}
                        >
                          Class
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className={isActive("/contact") ? "active" : ""}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/contact");
                      }}
                    >
                      Contact
                    </a>
                  </li>

                  <li
                    className={
                      isActive("/logout" | "/viewProfile" | "/editAddress")
                        ? "active"
                        : ""
                    }
                  >
                    {/* <a href="#">Details</a> */}
                    <a href="#">{token ? initials : "Details"}</a>
                    <ul className="dropdown">
                      <li>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("/viewDetails");
                          }}
                        >
                          View profile
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("/viewAllAddress");
                          }}
                        >
                          View address details
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={(e) => {
                            console.log(cart, "is cart quantity updated or not")
                            dispatch(saveCartOnLogout(cart));
                            Cookies.remove("token");
                            Cookies.remove("details");
                            e.preventDefault();
                            // dispatch(checkoutCart(cart));
                            
                            dispatch(clearCart());

                            navigate("/login");
                          }}
                        >
                          Logout
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderSection;
