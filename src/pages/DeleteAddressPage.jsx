import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";

export const DeleteAddress = async (addressId) => {
  const url = import.meta.env.VITE_API_URL;
  const token = Cookies.get("token");
  const headers = { Authorization: `Bearer ${token}` };

  try {
    await axios.delete(`${url}/users/deleteAddress?_id=${addressId}`, {
      headers,
    });
    toast.success("Address deleted successfully!");
  } catch (error) {
    toast.error("Failed to delete address: " + error.message);
    throw error;
  }
};

export default DeleteAddress;
