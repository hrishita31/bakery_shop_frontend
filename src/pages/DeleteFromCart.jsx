import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import Cookies from "js-cookie";

export const deleteFromCart = (productId) => {
  const url = import.meta.env.VITE_API_URL;

  //   const token = Cookies.get("token");
  //   const headers = { Authorization: `Bearer ${token}` };

  const cartDelete = async () => {
    try {
      await axios.delete(`${url}/products/deleteFromCart?_id=${productId}`);
      toast.success("Product removed from cart");
    } catch (error) {
      toast.error(error.message);
    }
  };
  cartDelete();
};

export default deleteFromCart;
