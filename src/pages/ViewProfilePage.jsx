import Header from "../../public/js/components/Header";
import Footer from "../../public/js/components/Footer";
import Breadcrumb from "./Breadcrumbs";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";

function ViewProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Header section */}
      <Header />

      {/* Breadcrumb section */}
      <Breadcrumb title="Details" />

      {/* View details section */}
      <div className="details-container">
        <div className="profile-box">
          <div className="details-info">
            <label>Firstname:</label>
            <span>{JSON.parse(Cookies.get("details")).firstname}</span>

            <label>Lastname:</label>
            <span>{JSON.parse(Cookies.get("details")).lastname}</span>

            <label>Username:</label>
            <span>{JSON.parse(Cookies.get("details")).usrname}</span>

            <label>Email:</label>
            <span>{JSON.parse(Cookies.get("details")).email}</span>

            <label>Address:</label>
          </div>

          <li
            className={
              isActive("/addEditAddress" | "/allAddresses" | "/deleteAddress")
                ? "active"
                : ""
            }
          >
            <a>Address</a>
            <ul className="dropdown">
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/addEditAddress");
                  }}
                >
                  Add address
                </a>
              </li>

              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/viewAllAddress");
                  }}
                >
                  View all addresses
                </a>
              </li>
            </ul>
          </li>
        </div>
      </div>

      {/* Footer section */}
      <Footer />
    </>
  );
}

export default ViewProfilePage;
