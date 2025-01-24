import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Breadcrumb = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className="breadcrumb-option">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="breadcrumb__text">
              <h2>{title}</h2>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="breadcrumb__links">
              {/* <a href="./index.html">Home</a> */}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                }}
              >
                Home
              </a>
              <span>{title}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
