import Breadcrumb from "./Breadcrumbs";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { addToCart } from "../react-redux/cartSlice";
import { useDispatch } from "react-redux";
import { addItemToCart } from "./Homepage/AddToCart";
import { addItemToFavs } from "./Homepage/AddToFavs";
import Cookies from "js-cookie";
import { deleteFromFavs } from "./DeleteFromFavs";
import { IconCircleDashedX } from "@tabler/icons-react";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

function ShopPage() {
  const url = import.meta.env.VITE_API_URL;
  const image_url = import.meta.env.VITE_IMAGE_URL;
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const headers = { Authorization: `Bearer ${token}` };
  const username = JSON.parse(Cookies.get("details")).usrname;

  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 2000);
  const [favProductId, setFavProductId] = useState([]);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    axios
      .get(`${url}/products/getFavs?username=${username}`, { headers })
      .then((res) =>
        setFavProductId(res.data.result.map((item) => item.productId))
      )
      .catch(() => toast.error("Failed to fetch favorites"));
  }, []);

  useEffect(() => {
    axios
      .get(`${url}/products/getCategory`)
      .then((res) => setCategories(res.data.result))
      .catch(() => toast.error("Failed to fetch categories"));
  }, []);

  const viewProducts = async () => {
    try {
      const response = await axios.get(`${url}/products/displayProduct`);
      setAllProducts(response.data.result);
      setProducts(response.data.result);
    } catch {
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    viewProducts();
  }, []);

  useEffect(() => {
    let filteredProducts = allProducts;

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (debouncedQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.dessertName.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
    }

    switch (sortOption) {
      case "A-Z":
        filteredProducts.sort((a, b) =>
          a.dessertName.localeCompare(b.dessertName)
        );
        break;
      case "Z-A":
        filteredProducts.sort((a, b) =>
          b.dessertName.localeCompare(a.dessertName)
        );
        break;
      case "Low-High":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "High-Low":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setProducts([...filteredProducts]);
  }, [selectedCategory, debouncedQuery, sortOption, allProducts]);

  return (
    <>
      <Breadcrumb title="Shop" />

      <div className="shop__option">
        <div className="row">
          <div className="col-lg-7 col-md-7">
            <div className="shop__option__search">
              <form action="#">
                <select onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option value="">All Categories</option>
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <div className="inputWithButton">
                  <input
                    type="text"
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                    placeholder="Search"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setQuery("");
                    }}
                  >
                    <IconCircleDashedX color="red" size={20} />
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-5 col-md-5">
            <div className="shop__option__right">
              <select onChange={(e) => setSortOption(e.target.value)}>
                <option value="">Default sorting</option>
                <option value="A-Z">A to Z</option>
                <option value="Z-A">Z to A</option>
                <option value="High-Low">High to Low Price</option>
                <option value="Low-High">Low to High Price</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <section className="shop spad">
        <div className="container">
          <div className="row">
          {products.length > 0 ? (
        products.map((product) => (
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
                <div className="product__item__details__fav">
                  <div className="product__item__price">Rs. {product.price}</div>
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
                      dispatch(
                        addToCart({
                          productId: product._id,
                          dessertName: product.dessertName,
                          price: product.price,
                          image: product.image.filename,
                          quantity: 1,
                        })
                      );
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-12 text-center">
          <h4>No products found.</h4>
        </div>
      )}
          </div>
        </div>
      </section>
    </>
  );
}

export default ShopPage;
