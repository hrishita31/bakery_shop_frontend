import { useNavigate, useLocation } from "react-router-dom";

export const HeaderSection = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
                    <ul>
                      <li>
                        USD <span className="arrow_carrot-down"></span>
                        <ul>
                          <li>EUR</li>
                          <li>USD</li>
                        </ul>
                      </li>
                      <li>
                        ENG <span className="arrow_carrot-down"></span>
                        <ul>
                          <li>Spanish</li>
                          <li>ENG</li>
                        </ul>
                      </li>
                      <li>
                        <a href="#">Sign in</a>
                        <span className="arrow_carrot-down"></span>
                      </li>
                    </ul>
                  </div>

                  <div className="header__logo">
                    {/* <a href="cake_shop/src/pages/HomePage.jsx"/> */}
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
                      <a href="#" className="search-switch">
                        <img src="img/icon/search.png" alt="" />
                      </a>
                      <a href="#">
                        <img src="img/icon/heart.png" alt="" />
                      </a>
                    </div>
                    <div className="header__top__right__cart">
                      <a href="#">
                        <img src="img/icon/cart.png" alt="" />
                        <span>0</span>
                      </a>
                      <div className="cart__price">
                        Cart:<span>$0.00</span>
                      </div>
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
                    {/* <a href="cake_shop/src/pages/HomePage.jsx">Home</a> */}
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

                    {/* <a href="cake_shop/src/pages/AboutPage.jsx">About</a> */}
                  </li>
                  <li className={isActive("/shop") ? "active" : ""}>
                    {/* <a href="cake_shop/src/pages/ShopPage.jsx">Shop</a> */}
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
                        "/shoppingcart" |
                          "/checkout" |
                          "/wishlist" |
                          "class" |
                          "blogDetails"
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
                            navigate("/shoppingcart");
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
                      <li>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("/blogDetails");
                          }}
                        >
                          Blog Details
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className={isActive("/blog") ? "active" : ""}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/blog");
                      }}
                    >
                      Blog
                    </a>
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
