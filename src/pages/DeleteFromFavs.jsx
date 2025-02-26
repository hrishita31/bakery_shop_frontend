import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";

export const deleteFromFavs = (productId) => {
  const url = import.meta.env.VITE_API_URL;
  const username = JSON.parse(Cookies.get("details")).usrname;

  //   const token = Cookies.get("token");
  //   const headers = { Authorization: `Bearer ${token}` };

  const favsDelete = async () => {
    try {
        console.log(username, "username");
        console.log({username}, "{username}");
      await axios.delete(`${url}/products/deleteFromFavs?_id=${productId}`,
        {data:{username:username}}
      );
      toast.success("Product removed from favs");
      location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  };
  favsDelete();
};

export default deleteFromFavs;
