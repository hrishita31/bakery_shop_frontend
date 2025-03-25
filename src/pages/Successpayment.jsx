import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../react-redux/cartSlice";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function SuccessPayment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    } catch (error) {
      toast.error("Some error occured" + error.message);
      throw error;
    }
  };

  dispatch(clearCart());
  deleteCartOnPayment(username);

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
