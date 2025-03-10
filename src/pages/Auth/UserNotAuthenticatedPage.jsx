import { useNavigate } from "react-router-dom";

export const UserNotAuthenticated = () => {
  const navigate = useNavigate();
  return (
    <>

      <div className="user__unauthenticated__text">
        <span>You have to login first to access this page</span>
      </div>
      <button className="back-to-login-btn-unaunthenticated" onClick={() => navigate("/login")}>
        Back to login page
      </button>

    </>
  );
};

export default UserNotAuthenticated;
