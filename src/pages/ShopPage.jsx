import Header from "../../public/js/components/Header";
import Footer from "../../public/js/components/Footer";
import Breadcrumb from "./Breadcrumbs";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useCallback } from "react";
import { addToCart } from "../react-redux/cartSlice";
import { useDispatch } from "react-redux";
import { addItemToCart } from "./Homepage/AddToCart";
import { addItemToFavs } from "./Homepage/AddToFavs";
import Cookies from "js-cookie";
import { deleteFromFavs } from "./DeleteFromFavs";

function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debounceValue;
}

function ShopPage() {
  const url = import.meta.env.VITE_API_URL;
  const image_url = import.meta.env.VITE_IMAGE_URL;
  const dispatch = useDispatch();
  const token = Cookies.get("token");
    const headers = { Authorization: `Bearer ${token}` };
  const [selectedValue, setSelectedValue] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [query, setQuery] = useState("");
  const username = JSON.parse(Cookies.get("details")).usrname;
  const [favProductId, setFavProductId] = useState("");

  useEffect(() => {
    axios
      .get(`${url}/products/getFavs?username=${username}`, {
        headers,
      })
      .then((res) => {
        setFavProductId(res.data.result.map((item) => item.productId));
      })
      .catch(() => toast.error("Failed to fetch products"));
  }, []);

  const debouncedQuery = useDebounce(query, 2000);

  useEffect(() => {
    axios
      .get(`${url}/products/getCategory`)
      .then((res) => {
        setCategories(res.data.result);
      })
      .catch(() => toast.error("Failed to fetch categories"));
  }, []);

  const handleCategoryClick = async (category) => {
    const response = await axios.post(
      `${url}/products/getProductFromCategory?category=${category}`
    );
    if (response.statusText === "OK") {
      setProducts(response.data.result);
    } else {
      toast.error(response.message);
    }
  };

  const viewProducts = async () => {
    try {
      const response = await axios.get(`${url}/products/displayProduct`);
      console.log(response);
      setProducts(response.data.result);
    } catch {
      toast.error("Failed to fetch products");
    }
  };

  const handleCategoryChange = async (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
  };

  useEffect(() => {
    if (selectedCategory) {
      handleCategoryClick(selectedCategory);
    } else {
      viewProducts();
    }
  }, [selectedCategory]);

  const searchProducts = useCallback(async (product) => {
    const response = await axios.post(
      `${url}/products/searchProduct?product=${product}`
    );
    if (response.statusText === "OK") {
      setProducts(response.data.result);
    } else {
      toast.error(response.message);
    }
  }, []);

  useEffect(() => {
    searchProducts(debouncedQuery);
  }, [debouncedQuery, searchProducts]);

  const handleProduct = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`${url}/products/displayProduct`)
      .then((res) => {
        setProducts(res.data.result);
      })
      .catch(() => toast.error("Failed to fetch products"));
  }, []);

  useEffect(() => {}, [products]);

  useEffect(() => {}, [categories]);

  const handleOptionClick = async (value) => {
    const response = await axios.post(`${url}/products/${value}`);
    if (response.statusText === "OK") {
      setProducts(response.data.result);
    } else {
      toast.error(response.message);
    }
  };

  const handleChange = (e) => {
    if (selectedValue) {
      viewProducts();
    } else {
      const value = e.target.value;
      setSelectedValue(value);
      handleOptionClick(value);
    }
  };

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
      {/* header section */}
      <Header />

      {/* breadcrumb section */}
      <Breadcrumb title="Shop"></Breadcrumb>

      {/*  shop section */}
      <div className="shop__option">
        <div className="row">
          <div className="col-lg-7 col-md-7">
            <div className="shop__option__search">
              <form action="#">
                <select onChange={handleCategoryChange}>
                  <option value="">Categories</option>
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  onChange={handleProduct}
                  value={query}
                  placeholder="Search"
                />
              </form>
            </div>
          </div>

          <div className="col-lg-5 col-md-5">
            <div className="shop__option__right">
              <select onChange={handleChange}>
                <option value="">Default sorting</option>
                <option value="sortProductsAscending">A to Z</option>
                <option value="sortProductsDescending">Z to A</option>
                <option value="sortPriceDescending">High to low price</option>
                <option value="sortPriceAscending">Low to high price</option>
              </select>
              {/* <p>Selected value : {selectedValue}</p> */}
            </div>
          </div>
        </div>
      </div>
      {/* <Products /> */}
      <section className="shop spad">
        <div className="container">
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
                        Rs. {product.price}
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
        </div>
      </section>

      {/* Footer section */}
      <Footer />
    </>
  );
}

export default ShopPage;
