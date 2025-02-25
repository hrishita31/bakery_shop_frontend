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
      .required("password is required")
      .min(8, "password must be 8 characters long")
      .matches(/[0-9]/, "Must contain at least one digit")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[a-z]/, "Must contain at least one lowercase letter"),
    confirmPassword: Yup.string()
      .required("new password is required")
      .min(8, "password must be 8 characters long")
      .matches(/[0-9]/, "Must contain at least one digit")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[a-z]/, "Must contain at least one lowercase letter"),
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
      if(!token){
        toast.error("Invalid or expired token. Please request again")
      }
      
      const finalData = { ...values, token:token};
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
            <label htmlFor="newPassword">Password</label>
            <input
              id="newPassword"
              name="newPassword"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div>{formik.errors.newPassword}</div>
            ) : null}
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div>{formik.errors.confirmPassword}</div>
            ) : null}

            <input type="submit" />
          </form>
        </div>
      </div>

      {/* Footer section */}
      <Footer />
    </>
  );
}

export default ResetPasswordPage;
