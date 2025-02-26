import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";

export const addItemToFavs = (productId) => {
  const url = import.meta.env.VITE_API_URL;
  const username = JSON.parse(Cookies.get("details")).usrname;

  const productToFavs = async() => {
    
      const data = await axios.post(
        `${url}/products/addToFavs?_id=${productId}`, {username}
      );

      if (data.statusText === "OK") {
        toast.success("Product added to favs");
      }else{
        toast.error(data.message)
      }
    
  };
  productToFavs();
};

export default addItemToFavs;
