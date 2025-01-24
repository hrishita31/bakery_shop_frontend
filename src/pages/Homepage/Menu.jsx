export const Menu = () => {
  return (
    <>
      <div className="offcanvas-menu-overlay"></div>
      <div className="offcanvas-menu-wrapper">
        <div className="offcanvas__cart">
          <div className="offcanvas__cart__links">
            <a href="#" className="search-switch">
              <img src="img/icon/search.png" alt="" />
            </a>
            <a href="#">
              <img src="img/icon/heart.png" alt="" />
            </a>
          </div>

          <div className="offcanvas__cart__item">
            <a href="#">
              <img src="img/icon/cart.png" alt="" />
              <span>0</span>
            </a>
            <div className="cart__price">
              Cart:<span>$0.00</span>
            </div>
          </div>
        </div>

        <div className="offcanvas__logo"></div>

        <div id="mobile-menu-wrap"></div>
        <div className="offcanvas__option">
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
              <a href="#">Sign in</a>{" "}
              <span className="arrow_carrot-down"></span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Menu;
