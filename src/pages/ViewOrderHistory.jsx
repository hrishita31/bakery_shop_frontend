import Breadcrumb from "./Breadcrumbs";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function ViewOrderHistory() {
  const [order, setOrder] = useState([]);
  const url = import.meta.env.VITE_API_URL;
  const token = Cookies.get("token");
  const headers = { Authorization: `Bearer ${token}` };
  const username = JSON.parse(Cookies.get("details")).usrname;

  const fetchOrderHistory = async () => {
    try {
      const response = await axios.get(
        `${url}/users/showOrderHistory?username=${username}`,
        { headers }
      );
      setOrder(response.data.result);
      console.log(response.data.result);
    } catch (error) {
      toast.error("Failed to fetch order ", error.message);
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  return (
    <>
      <Breadcrumb title="Order History" />

      {/* {order.length > 0 ? ( */}
      <div className="order-container">
        <div className="order-box">
          <thead>
            <tr>
              <div className="table__contents">
                <div className="order__product__table">
                  <th>Product</th>
                </div>
                <div className="order__unit__price__table">
                  <th>Unit Price(Rs.)</th>
                </div>
                <div className="order__quantity__table">
                  <th>Quantity</th>
                </div>
                <div className="order__total_table">
                  <th>Total(Rs.)</th>
                </div>
              </div>
            </tr>
          </thead>

          {order.map((orderGroup) => (
            <div key={orderGroup.orderId} className="order-group">
              <div className="order-info">
                <div className="orderItem-container">
                    <div className="order__date__label">
                  <p>
                    Order Date:{" "}
                    {new Date(orderGroup.createdAt).toLocaleString()}
                  </p>
                  </div>

                  {orderGroup.products.map((product) => (
                    <div key={product.productId}>
                        <div className="orderItem__label">
                      <div className="item__dessertName">
                        <span>{product.dessertName}</span>
                      </div>
                      <div className="item__price">
                        <span>{product.price}</span>
                      </div>
                      <div className="item__quantity">
                        <span>{product.quantity}</span>
                      </div>
                      <div className="item__totalPrice">
                        <span>{product.totalPrice}</span>
                      </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ) : (
        <div>No address</div>
      )} */}
    </>
  );
}

export default ViewOrderHistory;
