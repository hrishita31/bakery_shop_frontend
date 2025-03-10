import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";

export const addItemToCart = (productId) => {
  const url = import.meta.env.VITE_API_URL;
  const username = JSON.parse(Cookies.get("details")).usrname;
  const token = Cookies.get("token");
  const headers = { Authorization: `Bearer ${token}` };

  const productToCart = async () => {
    const data = await axios.post(
      `${url}/products/addToCart?_id=${productId}`,
      { username },
      {
        headers,
      }
    );

    console.log(data, 325);
    if (data.statusText === "OK") {
      toast.success("Product added to cart");
    } else {
      toast.error(data.message);
    }
  };
  productToCart();
};

export default addItemToCart;
