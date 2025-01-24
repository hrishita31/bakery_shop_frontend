import Header from "../../public/js/components/Header";
import Footer from "../../public/js/components/Footer";
import Breadcrumb from "./Breadcrumbs";

function ShopDetailsPage() {
  return (
    <>
      {/* header section */}
      <Header />

      {/* breadcrumbs */}
      <Breadcrumb title="Shop details"></Breadcrumb>

      {/* shop details section */}
      <section className="product-details spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="product__details__img">
                <div className="product__details__big__img">
                  <img
                    className="big_img"
                    src="img/shop/details/product-big-1.jpg"
                    alt=""
                  />
                </div>
                <div className="product__details__thumb">
                  <div className="pt__item active">
                    <img
                      data-imgbigurl="img/shop/details/product-big-2.jpg"
                      src="img/shop/details/product-big-2.jpg"
                      alt=""
                    />
                  </div>
                  <div className="pt__item">
                    <img
                      data-imgbigurl="img/shop/details/product-big-1.jpg"
                      src="img/shop/details/product-big-1.jpg"
                      alt=""
                    />
                  </div>
                  <div className="pt__item">
                    <img
                      data-imgbigurl="img/shop/details/product-big-4.jpg"
                      src="img/shop/details/product-big-4.jpg"
                      alt=""
                    />
                  </div>
                  <div className="pt__item">
                    <img
                      data-imgbigurl="img/shop/details/product-big-3.jpg"
                      src="img/shop/details/product-big-3.jpg"
                      alt=""
                    />
                  </div>
                  <div className="pt__item">
                    <img
                      data-imgbigurl="img/shop/details/product-big-5.jpg"
                      src="img/shop/details/product-big-5.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="product__details__text">
                <div className="product__label">Cupcake</div>
                <h4>SWEET AUTUMN LEAVES</h4>
                <h5>$26.41</h5>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis ipsum suspendisse ultrices gravida
                </p>
                <ul>
                  <li>
                    SKU: <span>17</span>
                  </li>
                  <li>
                    Category: <span>Biscuit cake</span>
                  </li>
                  <li>
                    Tags: <span>Gadgets, minimalisstic</span>
                  </li>
                </ul>
                <div className="product__details__option">
                  <div className="quantity">
                    <div className="pro-qty">
                      <input type="text" value="2" />
                    </div>
                  </div>
                  <a href="#" className="primary-btn">
                    Add to cart
                  </a>
                  <a href="#" className="heart__btn">
                    <span className="icon_heart_alt"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="product__details__tab">
            <div className="col-lg-12">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#tabs-1"
                    role="tab"
                  >
                    Description
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#tabs-2"
                    role="tab"
                  >
                    Additional information
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#tabs-3"
                    role="tab"
                  >
                    Previews(1)
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div className="tab-pane active" id="tabs-1" role="tabpanel">
                  <div className="row d-flex justify-content-center">
                    <div className="col-lg-8">
                      <p>
                        This delectable Strawberry Pie is an extraordinary treat
                        filled with sweet and tasty chunks of delicious
                        strawberries. Made with the freshest ingredients, one
                        bite will send you to summertime. Each gift arrives in
                        an elegant gift box and arrives with a greeting card of
                        your choice that you can personalize online!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="tab-pane" id="tabs-2" role="tabpanel">
                  <div className="row d-flex justify-content-center">
                    <div className="col-lg-8">
                      <p>
                        This delectable Strawberry Pie is an extraordinary treat
                        filled with sweet and tasty chunks of delicious
                        strawberries. Made with the freshest ingredients, one
                        bite will send you to summertime. Each gift arrives in
                        an elegant gift box and arrives with a greeting card of
                        your choice that you can personalize online!2
                      </p>
                    </div>
                  </div>
                </div>
                <div className="tab-pane" id="tabs-3" role="tabpanel">
                  <div className="row d-flex justify-content-center">
                    <div className="col-lg-8">
                      <p>
                        This delectable Strawberry Pie is an extraordinary treat
                        filled with sweet and tasty chunks of delicious
                        strawberries. Made with the freshest ingredients, one
                        bite will send you to summertime. Each gift arrives in
                        an elegant gift box and arrives with a greeting card of
                        your choice that you can personalize online!3
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* related products section */}
      <section className="related-products spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="section-title">
                <h2>Related Products</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="related__products__slider owl-carousel">
              <div className="col-lg-3">
                <div className="product__item">
                  <div
                    className="product__item__pic set-bg"
                    data-setbg="img/shop/product-1.jpg"
                  >
                    <div className="product__label">
                      <span>Cupcake</span>
                    </div>
                  </div>
                  <div className="product__item__text">
                    <h6>
                      <a href="#">Dozen Cupcakes</a>
                    </h6>
                    <div className="product__item__price">$32.00</div>
                    <div className="cart_add">
                      <a href="#">Add to cart</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="product__item">
                  <div
                    className="product__item__pic set-bg"
                    data-setbg="img/shop/product-2.jpg"
                  >
                    <div className="product__label">
                      <span>Cupcake</span>
                    </div>
                  </div>
                  <div className="product__item__text">
                    <h6>
                      <a href="#">Cookies and Cream</a>
                    </h6>
                    <div className="product__item__price">$30.00</div>
                    <div className="cart_add">
                      <a href="#">Add to cart</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="product__item">
                  <div
                    className="product__item__pic set-bg"
                    data-setbg="img/shop/product-3.jpg"
                  >
                    <div className="product__label">
                      <span>Cupcake</span>
                    </div>
                  </div>
                  <div className="product__item__text">
                    <h6>
                      <a href="#">Gluten Free Mini Dozen</a>
                    </h6>
                    <div className="product__item__price">$31.00</div>
                    <div className="cart_add">
                      <a href="#">Add to cart</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="product__item">
                  <div
                    className="product__item__pic set-bg"
                    data-setbg="img/shop/product-4.jpg"
                  >
                    <div className="product__label">
                      <span>Cupcake</span>
                    </div>
                  </div>
                  <div className="product__item__text">
                    <h6>
                      <a href="#">Cookie Dough</a>
                    </h6>
                    <div className="product__item__price">$25.00</div>
                    <div className="cart_add">
                      <a href="#">Add to cart</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="product__item">
                  <div
                    className="product__item__pic set-bg"
                    data-setbg="img/shop/product-5.jpg"
                  >
                    <div className="product__label">
                      <span>Cupcake</span>
                    </div>
                  </div>
                  <div className="product__item__text">
                    <h6>
                      <a href="#">Vanilla Salted Caramel</a>
                    </h6>
                    <div className="product__item__price">$05.00</div>
                    <div className="cart_add">
                      <a href="#">Add to cart</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="product__item">
                  <div
                    className="product__item__pic set-bg"
                    data-setbg="img/shop/product-6.jpg"
                  >
                    <div className="product__label">
                      <span>Cupcake</span>
                    </div>
                  </div>
                  <div className="product__item__text">
                    <h6>
                      <a href="#">German Chocolate</a>
                    </h6>
                    <div className="product__item__price">$14.00</div>
                    <div className="cart_add">
                      <a href="#">Add to cart</a>
                    </div>
                  </div>
                </div>
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

export default ShopDetailsPage;
