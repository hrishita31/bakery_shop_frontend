import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";

export const deleteFromCart = (productId) => {
  const url = import.meta.env.VITE_API_URL;
  const username = JSON.parse(Cookies.get("details")).usrname;

  const token = Cookies.get("token");
  const headers = { Authorization: `Bearer ${token}` };

  const cartDelete = async () => {
    try {
      await axios.delete(
        `${url}/products/deleteFromCart?_id=${productId}`,
        {
          data: { username: username },
        },
        {
          headers,
        }
      );
      toast.success("Product removed from cart");
    } catch (error) {
      toast.error(error.message);
    }
  };
  cartDelete();
};

export default deleteFromCart;
