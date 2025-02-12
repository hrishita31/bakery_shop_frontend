import Header from "../../public/js/components/Header";
import Footer from "../../public/js/components/Footer";
import Breadcrumb from "./Breadcrumbs";
import * as Yup from "yup";
import { useFormik } from "formik";
//import axios from "axios";
import { useNavigate } from "react-router-dom";
import postData from "../requests/postRequest";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

function LoginPage() {
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("username is required"),
    password: Yup.string().required("password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      const data = await postData(values, "/users/userLogin");
      console.log(data, 123456);
      if (data.data.success) {
        toast.success("Login successful");
        const token = data.data.result.token;
        const details = data.data.result.details;

        Cookies.set("token", token, { expires: 7, secure: true });
        Cookies.set("details", JSON.stringify(details), {
          expires: 7,
          secure: true,
        });

        navigate("/");
      } else {
        toast.error(data.message);
        // toast.error("Login unsuccessful. Please try again.")
      }
    },
  });

  return (
    <>
      {/* Header section */}
      <Header />

      {/* Breadcrumb section */}
      <Breadcrumb title="Login" />

      {/* Login form section */}
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>

          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div>{formik.errors.username}</div>
            ) : null}
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}

            <input type="submit" />
            <div className="forgot-pwd">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/forgotPassword");
                }}
              >
                forgot password
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* Footer section */}
      <Footer />
    </>
  );
}

export default LoginPage;
