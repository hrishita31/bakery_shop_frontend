import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../react-redux/cartSlice";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect } from "react";
import { saveOrderHistory } from "../react-redux/cartSlice";

function SuccessPayment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const username = JSON.parse(Cookies.get("details")).usrname;
  const url = import.meta.env.VITE_API_URL;
  const token = Cookies.get("token");
  const headers = { Authorization: `Bearer ${token}` };

  const deleteCartOnPayment = async (username) => {
    try {
      await axios.delete(
        `${url}/products/deleteItemsOnPayment?username=${username}`,
        {
          headers,
        }
      );
      console.log("deleted from backend")
    } catch (error) {
      toast.error("Some error occured" + error.message);
      throw error;
    }
  };
  useEffect(() => {
    const processOrder = async () => {
      if (cart.length > 0) {
        await dispatch(saveOrderHistory(cart)); // Save order first
        await deleteCartOnPayment(username); // Then delete cart items
        dispatch(clearCart()); // Finally, clear Redux cart
      }
    };
  
    processOrder();
  }, []); 
  

  return (
    <>
      <div className="success-payment-container">
        <div className="success-payment-box">
          <div className="success_payment">
            <span>Congratulations! Successful payment!</span>
          </div>

          <button
            className="success_payment_button"
            onClick={() => navigate("/shop")}
          >
            Back to shopping page
          </button>
        </div>
      </div>
    </>
  );
}

export default SuccessPayment;
