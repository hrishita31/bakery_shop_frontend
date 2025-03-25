import { useNavigate } from "react-router-dom";

function FailedPayment() {
  const navigate = useNavigate();
  return (
    <>
      <div className="success-payment-container">
        <div className="success-payment-box">
          <div className="success_payment">
            <span>Payment failed, please try again</span>
          </div>
          <button
            className="back-to-login-btn-unaunthenticated"
            onClick={() => navigate("/checkout")}
          >
            Back to payment page
          </button>
        </div>
      </div>
    </>
  );
}

export default FailedPayment;
