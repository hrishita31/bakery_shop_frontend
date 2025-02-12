import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const url = import.meta.env.VITE_API_URL;
  const image_url = import.meta.env.VITE_IMAGE_URL;
  useEffect(() => {
    axios
      .get(`${url}/products/displayProduct`)
      .then((res) => {
        console.log(res, "res");
        setProducts(res.data.result);
      })
      .catch(() => toast.error("Failed to fetch poducts"));
  }, []);

  useEffect(() => {
    console.log(products, 1234);
  }, [products]);

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
                        <a href="#">Add to cart</a>
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
