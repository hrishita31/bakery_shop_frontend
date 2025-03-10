import { useNavigate } from "react-router-dom";

export const UserNotAuthorized = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="page__not__found">
        <span>401 Unauthorized</span>
      </div>

      <div className="page__not__found__text">
        <span>You are not authorized to view this page</span>
      </div>
      <button className="back-to-login-btn" onClick={() => navigate("/login")}>
        Back to login page
      </button>
    
      <button className="to-last-page-btn" onClick={() => navigate(-2)}>
        Back to last page
      </button>

    </>
  );
};

export default UserNotAuthorized;
