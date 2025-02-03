import Header from "../../public/js/components/Header";
import Footer from "../../public/js/components/Footer";
import Breadcrumb from "./Breadcrumbs";
import * as Yup from "yup";
import { useFormik } from "formik";
import postData from "../requests/postRequest";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUpPage() {
  const navigate = useNavigate();

  const SignUpSchema = Yup.object().shape({
    firstname: Yup.string().required("firstname is required"),
    lastname: Yup.string().required("lastname is required"),
    email: Yup.string().required("email is required"),
    username: Yup.string().required("username is required"),
    password: Yup.string()
      .min(8, "password must be 8 characters long")
      .matches(/[0-9]/, "Must contain at least one digit")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[a-z]/, "Must contain at least one lowercase letter")
      // .matches(
      //   /^[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
      //   "Need one special character"
      // )
      .required("password is required"),
      confirmPassword: Yup.string()
      .min(8, "password must be 8 characters long")
      .matches(/[0-9]/, "Must contain at least one digit")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[a-z]/, "Must contain at least one lowercase letter")
      // .matches(
      //   /^[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
      //   "Need one special character"
      // )
      .required("password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      password: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: async (values) => {
      const data = await postData(values, "/users/newUser");
      if (data.data.success) {
        toast.success("Sign up successful");
        navigate("/");
      } else {
        toast.error(data.message)
      }
    },
  });
  return (
    <>
      {/* header section */}
      <Header />

      {/* breadcrumbs section */}
      <Breadcrumb title="Sign up"></Breadcrumb>

      {/* sign up section */}
      <div className="signUp-container">
        <div className="signUp-box">
          <h2>Sign up</h2>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="firstname">Firstname</label>
            <input
              id="firstname"
              name="firstname"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstname}
            />
            {formik.touched.firstname && formik.errors.firstname ? (
              <div>{formik.errors.firstname}</div>
            ) : null}
            <label htmlFor="lastname">Lastname</label>
            <input
              id="lastname"
              name="lastname"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastname}
            />
            {formik.touched.lastname && formik.errors.lastname ? (
              <div>{formik.errors.lastname}</div>
            ) : null}
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
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
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
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

export default SignUpPage;
