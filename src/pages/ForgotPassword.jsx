import Breadcrumb from "./Breadcrumbs";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function ForgotPasswordPage() {
  // const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const token = Cookies.get("token");
  const headers = { Authorization: `Bearer ${token}` };

  const ForgotPasswordSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .test(
        "isValidLine1",
        "Should have atleast one alphabet or a digit",
        (value) => {
          const hasUpperCase = /[A-Z]/.test(value);
          const hasLowerCase = /[a-z]/.test(value);
          const hasNumber = /[0-9]/.test(value);

          let validConditions = 0;

          const numberOfMustBeValidConditions = 1;
          const conditions = [hasLowerCase, hasUpperCase, hasNumber];
          conditions.forEach((condition) =>
            condition ? validConditions++ : null
          );
          if (validConditions >= numberOfMustBeValidConditions) {
            return true;
          }
          return false;
        }
      ),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values) => {
      const response = await axios.post(
        `${url}/users/getUser`,
        { ...values },
        {
          headers: headers,
        }
      );
      if (response.statusText === "OK") {
        const email = response.data.result.email;
        toast.success(
          `User found! Email sent to ${email || "the registered email id"} `
        );
      } else {
        toast.error(
          response.message || "User not found, please enter correct username"
        );
      }
    },
  });
  return (
    <>
      {/* Breadcrumb section */}
      <Breadcrumb title="Forgot Password" />

      {/* Forgot Password section */}
      <div className="forgotPwd-container">
        <div className="forgotPwd-box">
          <h2>Forgot Password</h2>

          <form onSubmit={formik.handleSubmit}>
            <div className="forgot__password__label">
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

            {/* <input type="submit" /> */}
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPasswordPage;
