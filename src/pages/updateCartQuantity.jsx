import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export const addCount = (productId) => {
    const url = import.meta.env.VITE_API_URL;

    const addQuantity = async() => {
        try{
           await axios.patch(`${url}/products/incrementProductQuantity?_id=${productId}`)
            
        }catch(error){
            toast.error(error.message)
        }
    }

    addQuantity();
}

export const reduceCount = (productId) => {
    const url = import.meta.env.VITE_API_URL;

    const reduceQuantity = async() => {
        try{
           await axios.patch(`${url}/products/decrementProductQuantity?productId=${productId}`)
            
        }catch(error){
            toast.error(error.message)
        }
    }

    reduceQuantity();
}



