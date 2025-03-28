import Breadcrumb from "./Breadcrumbs";
import * as Yup from "yup";
import { useFormik } from "formik";
//import axios from "axios";
import { useNavigate } from "react-router-dom";
import postData from "../requests/postRequest";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { fetchCartData } from "../react-redux/cartSlice";
import { useDispatch } from "react-redux";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      if (data.success) {
        toast.success("Login successful");
        const token = data.data.result.token;
        const details = data.data.result.details;

        Cookies.set("token", token, { expires: 7, secure: true });
        Cookies.set("details", JSON.stringify(details), {
          expires: 7,
          secure: true,
        });

        navigate("/");
        const username = JSON.parse(Cookies.get("details")).usrname;
        dispatch(fetchCartData(username));
      } else {
        toast.error(data.message);
      }
    },
  });

  return (
    <>
      {/* Breadcrumb section */}
      <Breadcrumb title="Login" />

      {/* Login form section */}
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>

          <form onSubmit={formik.handleSubmit}>
            <div className="login__label">
              <label htmlFor="username">Username</label>
              <label className="compulsory__fill_input">*</label>
            </div>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="error-login">{formik.errors.username}</div>
            ) : null}

            <div className="login__label">
              <label htmlFor="password">Password</label>
              <label className="compulsory__fill_input">*</label>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error-login">{formik.errors.password}</div>
            ) : null}

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

            {/* <input type="submit" /> */}
            <button type="submit" className="submit-btn">
              Submit
            </button>

            <div className="create__new__account">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/signUp");
                }}
              >
                Create a new account?
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
