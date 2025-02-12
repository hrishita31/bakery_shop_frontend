import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";

export const DeleteAddress = (addressId) => {
  const url = import.meta.env.VITE_API_URL;

  const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };

  const addressDelete = async () => {
    try {
      await axios.delete(`${url}/users/deleteAddress?_id=${addressId}`, {
        headers,
      });
     
    } catch (error) {
      toast.error(error.message);
    }
  };
  
addressDelete();
};

export default DeleteAddress;
