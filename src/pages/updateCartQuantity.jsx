import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";

export const addCount = (productId) => {
    const url = import.meta.env.VITE_API_URL;
     const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };

    const addQuantity = async() => {
        try{
           await axios.patch(`${url}/products/incrementProductQuantity?_id=${productId}`, {
            headers,
           })
            
        }catch(error){
            toast.error(error.message)
        }
    }

    addQuantity();
}

export const reduceCount = (productId) => {
    const url = import.meta.env.VITE_API_URL;
     const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };

    const reduceQuantity = async() => {
        try{
           await axios.patch(`${url}/products/decrementProductQuantity?productId=${productId}`, {
            headers,
           })
            
        }catch(error){
            toast.error(error.message)
        }
    }

    reduceQuantity();
}



