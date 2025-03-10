import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart } from "../../react-redux/cartSlice";
import { useDispatch } from "react-redux";
import { addItemToCart } from "./AddToCart";
import { addItemToFavs } from "./AddToFavs";
import { deleteFromFavs } from "../DeleteFromFavs";
import Cookies from "js-cookie";

export const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const url = import.meta.env.VITE_API_URL;
  const image_url = import.meta.env.VITE_IMAGE_URL;
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const headers = { Authorization: `Bearer ${token}` };

  const [favProductId, setFavProductId] = useState("");

  useEffect(() => {
    if (Cookies.get("token")) {
      const username = JSON.parse(Cookies.get("details")).usrname;
      axios
        .get(`${url}/products/getFavs?username=${username}`, {
          headers,
        })
        .then((res) => {
          setFavProductId(res.data.result.map((item) => item.productId));
        })
        .catch(() => toast.error("Failed to fetch products"));
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${url}/products/displayProduct`)
      .then((res) => {
        setProducts(res.data.result);
      })
      .catch(() => toast.error("Failed to fetch products"));
  }, []);

  useEffect(() => {}, [products]);

  const addCart = (productId, dessertName, price, image, quantity = 1) => {
    dispatch(
      addToCart({
        productId,
        dessertName,
        price,
        image,
        quantity,
      })
    );
  };

  return (
    <>
      {JSON.parse(Cookies.get("details")).isAdmin ? (
        <div className="container">
          <div className="add-product">
            <button
              className="add-product-btn"
              onClick={(e) => {
                e.preventDefault();
                navigate("/addProduct");
              }}
            >
              Click to add product
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      {products?.length ? (
        <>
          <section className="product spad">
            <div className="row">
              {products.map((product) => (
                <div key={product._id} className="col-lg-3 col-md-6 col-sm-6">
                  <div className="product__item">
                    <div className="product__item__pic set-bg">
                      <img
                        src={`${image_url}/images/product/${product.image.filename}`}
                        alt={product.dessertName}
                      />
                      <div className="product__label">
                        <span>{product.category.toUpperCase()}</span>
                      </div>
                    </div>
                    <div className="product__item__text">
                      <h6>
                        <a href="#">{product.dessertName.toUpperCase()}</a>
                      </h6>
                      <div className="product__item__details">
                        <div className="product__item__price">
                          Rs.{product.price}
                        </div>
                        <div className="product__add__favs">
                          {favProductId.includes(product._id) ? (
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                deleteFromFavs(product._id, setFavProductId);
                              }}
                            >
                              <img src="img/icon/red-heart.png" alt="" />
                            </a>
                          ) : (
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                console.log(product, 124);
                                addItemToFavs(product._id, setFavProductId);
                              }}
                            >
                              <img src="img/icon/heart.png" alt="" />
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="cart_add">
                        <button
                          onClick={() => {
                            addItemToCart(product._id);
                            addCart(
                              product._id,
                              product.dessertName,
                              product.price,
                              product.image.filename
                            );
                          }}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <div>No product</div>
      )}
    </>
  );
};

export default Products;
