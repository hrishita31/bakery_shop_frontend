import Breadcrumb from "./Breadcrumbs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { addItemToCart } from "./Homepage/AddToCart";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { deleteFromFavs } from "./DeleteFromFavs";
import { addToCart } from "../react-redux/cartSlice";

export const WishlistPage = () => {
  const [favs, setFavs] = useState([]);
  const [tag, setTag] = useState(0);
  
  const url = import.meta.env.VITE_API_URL;
  const image_url = import.meta.env.VITE_IMAGE_URL;
  const username = JSON.parse(Cookies.get("details")).usrname;
  const dispatch = useDispatch();
  const token = Cookies.get("token");
    const headers = { Authorization: `Bearer ${token}` };

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

  useEffect(() => {
    axios
      .get(`${url}/products/getFavs?username=${username}`, {
        headers,
      })
      .then((res) => {
        setFavs(res.data.result);
      })
      .catch(() => toast.error("Failed to fetch fav products"));
  }, [tag]);
 
 

  return (
    <>
      {/* breadcrumb section */}
      <Breadcrumb title="Wishlist"></Breadcrumb>

      {/* wishlist section */}
      <section className="wishlist spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {favs.length ?<div className="wishlist__cart__table">
                <table>
                  <thead>
                    <tr>
                      <div className="favs__table__headers">
                        <div className="favs__product">
                          <th>Product</th>
                        </div>
                        <div className="favs__price">
                          <th>Unit Price</th>
                        </div>
                        <div className="favs__stock">
                          <th>Stock</th>
                        </div>
                        <th></th>
                        <th></th>
                      </div>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {favs.map((item) => (
                        <div
                          key={item._id}
                          className="favs__product__cart__item"
                        >
                          <td className="product__cart__item">
                            <div className="product__cart__item__pic">
                              <img className="product__cart__item__img"
                            
                            
                              
                                src={`${image_url}/images/product/${item.image}`}
                                // src = {`${image_url}/images/product/${item.image}`}
                                alt={item.dessertName}
                              />
                            </div>
                            <div className="product__cart__item__text">
                              <h6>{item.dessertName}</h6>
                            </div>
                          </td>
                          <td className="cart__price">Rs. {item.price}</td>
                          <td className="cart__stock">In stock</td>
                          <td className="cart_add">
                            
                              <button
                                onClick={() => {
                                  addItemToCart(item.productId);
                                  addCart(
                                    item.productId,
                                    item.dessertName,
                                    item.price,
                                    item.productDetails[0].image.filename
                                  );
                                }}
                              >
                                Add To Cart
                              </button>
                        
                          </td>
                          <td className="cart__close">
                            <a
                              href="#"
                              onClick={() => {
                              
                                deleteFromFavs(item.productId, setFavs);
                                setTag(tag+1)

                              }}
                            >
                              <IconSquareRoundedX color="red" size="28"/>
                            </a>
                          </td>
                        </div>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div> : <h2>Empty wishlist</h2>}
              
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WishlistPage;
