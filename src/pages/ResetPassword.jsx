import Header from "../../public/js/components/Header";
import Footer from "../../public/js/components/Footer";
import Breadcrumb from "./Breadcrumbs";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
import patchData from "../requests/patchRequest";

function ResetPasswordPage() {
  //   const navigate = useNavigate();
  const location = useLocation();

  const ResetPasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(/[0-9]/, "Password must contain at least one digit (0-9)")
      .matches(
        /[A-Z]/,
        "Password must contain at least one uppercase letter (A-Z)"
      )
      .matches(
        /[a-z]/,
        "Password must contain at least one lowercase letter (a-z)"
      )
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@, $, !, %, *, ?, &)"
      ),
    confirmPassword: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(/[0-9]/, "Password must contain at least one digit (0-9)")
      .matches(
        /[A-Z]/,
        "Password must contain at least one uppercase letter (A-Z)"
      )
      .matches(
        /[a-z]/,
        "Password must contain at least one lowercase letter (a-z)"
      )
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@, $, !, %, *, ?, &)"
      ),
  });

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      const searchParams = new URLSearchParams(location.search);
      const token = searchParams.get("token") || "";
      if (!token) {
        toast.error("Invalid or expired token. Please request again");
      }

      const finalData = { ...values, token: token };
      const data = await patchData(finalData, "/users/resetPassword");
      if (data.success) {
        toast.success("Successfully updated the password");

        // navigate("/login");
      } else {
        toast.error(data.message);
      }
    },
  });
  return (
    <>
      {/* Header section */}
      <Header />

      {/* Breadcrumb section */}
      <Breadcrumb title="Reset Password" />

      {/* Forgot Password section */}
      <div className="forgotPwd-container">
        <div className="forgotPwd-box">
          <h2>Reset Password</h2>

          <form onSubmit={formik.handleSubmit}>
            <div className="reset__password__label">
              <label htmlFor="newPassword">Password</label>
              <label className="compulsory__fill_input">*</label>
            </div>
            <input
              id="newPassword"
              name="newPassword"
              type="text"
              placeholder="Enter new password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div>{formik.errors.newPassword}</div>
            ) : null}

            <div className="reset__password__label">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <label className="compulsory__fill_input">*</label>
            </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="confirmPassword"
              placeholder="Confirm new password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div>{formik.errors.confirmPassword}</div>
            ) : null}

            {/* <input type="submit" /> */}
            <button type="submit" className="submit-btn">
            Submit
          </button>
          </form>
        </div>
      </div>

      {/* Footer section */}
      <Footer />
    </>
  );
}

export default ResetPasswordPage;
