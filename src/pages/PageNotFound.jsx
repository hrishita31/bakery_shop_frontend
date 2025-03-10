import { useNavigate } from "react-router-dom";

export const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="page__not__found">
        <span>404 Page Not Found</span>
      </div>

      <div className="page__not__found__text">
        <span>Looks like the page you`re looking for does not exist</span>
      </div>
      <button className="back-to-home-btn" onClick={() => navigate("/")}>
        Back to home page
      </button>
    
      <button className="back-to-last-page-btn" onClick={() => navigate(-1)}>
        Back to last page
      </button>

    </>
  );
};

export default PageNotFound;
