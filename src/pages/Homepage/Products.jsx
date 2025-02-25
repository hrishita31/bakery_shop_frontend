import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import {AddToCart} from "./AddToCart"
import { addToCart } from "../../react-redux/cartSlice";
import { useDispatch } from "react-redux";
import { addItemToCart } from "./AddToCart";

export const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const url = import.meta.env.VITE_API_URL;
  const image_url = import.meta.env.VITE_IMAGE_URL;
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${url}/products/displayProduct`)
      .then((res) => {
        setProducts(res.data.result);
      })
      .catch(() => toast.error("Failed to fetch poducts"));
  }, []);

  useEffect(() => {
  }, [products]);

  const addCart = (productId, dessertName, price, image, productDetails, quantity = 1) => {
    dispatch(
      addToCart({
        productId,
        dessertName,
        price,
        image,
        productDetails : productDetails || [],
        quantity,
      })
    );
  };

  return (
    <>
      <div className="container">
        <div className="add-product">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/addProduct");
            }}
          >
            Click to add product
          </a>
        </div>
      </div>
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
                        <span>{product.dessertName}</span>
                      </div>
                    </div>
                    <div className="product__item__text">
                      <h6>
                        <a href="#">{product.category}</a>
                      </h6>
                      <div className="product__item__price">
                        Rs.{product.price}
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
