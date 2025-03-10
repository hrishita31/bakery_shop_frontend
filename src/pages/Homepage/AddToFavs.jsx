import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";

export const addItemToFavs = (productId, setFavProductId) => {
  const url = import.meta.env.VITE_API_URL;
  const username = JSON.parse(Cookies.get("details")).usrname;
  const token = Cookies.get("token");
  const headers = { Authorization: `Bearer ${token}` };

  const productToFavs = async () => {
    const data = await axios.post(
      `${url}/products/addToFavs?_id=${productId}`,
      { username },
      {
        headers,
      }
    );

    if (data.statusText === "OK") {
      setFavProductId((prev) => [...prev, productId]);
    } else {
      toast.error(data.message);
    }
  };
  productToFavs();
};

export default addItemToFavs;
