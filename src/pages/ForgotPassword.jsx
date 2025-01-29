import Header from "../../public/js/components/Header";
import Footer from "../../public/js/components/Footer";
import Breadcrumb from "./Breadcrumbs";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import patchData from "../requests/patchRequest";

function ForgotPasswordPage() {
  const navigate = useNavigate();

  const ForgotPasswordSchema = Yup.object().shape({
    newPassword: Yup.string().required("password is required")
    .min(8, "password must be 8 characters long")
      .matches(/[0-9]/, "Must contain at least one digit")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[a-z]/, "Must contain at least one lowercase letter"),
    confirmPassword: Yup.string().required("new password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values) => {
      const data = await patchData(values, "/users/forgotPwd");
      console.log(data);
      if (data.success) {
        toast.success("Successfully updated the password");

        navigate("/login");
      } else {
        toast.error(data.message)
      }
    },
  });
  return (
    <>
      {/* Header section */}
      <Header />

      {/* Breadcrumb section */}
      <Breadcrumb title="Forgot Password" />

      {/* Forgot Password section */}
      <div className="forgotPwd-container">
        <div className="forgotPwd-box">
          <h2>Forgot Password</h2>
          

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

export default ForgotPasswordPage;
