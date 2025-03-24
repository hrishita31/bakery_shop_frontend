import Breadcrumb from "./Breadcrumbs";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormData from "form-data";
// import axios from "axios";
import postData from "../requests/postRequest";

function SignUpPage() {
  const navigate = useNavigate();
  // const url = import.meta.env.VITE_API_URL;

  const SignUpSchema = Yup.object().shape({
    firstname: Yup.string()
      .required("firstname is required")
      .test("isValidFirstname", "Should have atleast one alphabet", (value) => {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);

        let validConditions = 0;

        const numberOfMustBeValidConditions = 1;
        const conditions = [hasLowerCase, hasUpperCase];
        conditions.forEach((condition) =>
          condition ? validConditions++ : null
        );
        if (validConditions >= numberOfMustBeValidConditions) {
          return true;
        }
        return false;
      }),

    lastname: Yup.string()
      .required("lastname is required")
      .test("isValidLastname", "Should have atleast one alphabet", (value) => {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);

        let validConditions = 0;

        const numberOfMustBeValidConditions = 1;
        const conditions = [hasLowerCase, hasUpperCase];
        conditions.forEach((condition) =>
          condition ? validConditions++ : null
        );
        if (validConditions >= numberOfMustBeValidConditions) {
          return true;
        }
        return false;
      }),
    email: Yup.string()
      .required("email is required")
      .test(
        "isValidEmail",
        "Should have atleast one alphabet or a digit",
        (value) => {
          const hasUpperCase = /[A-Z]/.test(value);
          const hasLowerCase = /[a-z]/.test(value);
          const hasNumber = /[0-9]/.test(value);
          const hasSpecialChar = /[@]/.test(value);

          let validConditions = 0;

          const numberOfMustBeValidConditions = 1;
          const conditions = [
            hasLowerCase,
            hasUpperCase,
            hasNumber,
            hasSpecialChar,
          ];
          conditions.forEach((condition) =>
            condition ? validConditions++ : null
          );
          if (validConditions >= numberOfMustBeValidConditions) {
            return true;
          }
          return false;
        }
      ),
    username: Yup.string()
      .required("username is required")
      .test("isValidFirstname", "Should have atleast one alphabet", (value) => {
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
      }),
    password: Yup.string()
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
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: async (values) => {
      let formData = new FormData();

      formData.append("firstname", values.firstname);
      formData.append("lastname", values.lastname);
      formData.append("email", values.email);
      formData.append("username", values.username);
      formData.append("password", values.password);
      formData.append("confirmPassword", values.confirmPassword);

      const data = await postData(values, "/users/newUser");
      if (data.success) {
        toast.success("Sign up successful");

        navigate("/login");
      } else {
        toast.error(data.message);
      }
    },
  });

  return (
    <>

      {/* breadcrumbs section */}
      <Breadcrumb title="Sign up"></Breadcrumb>

      {/* sign up section */}
      <div className="signUp-container">
        <div className="signUp-box">
          <h2>Sign up</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="signUp__label">
              <label htmlFor="firstname">Firstname</label>
              <label className="compulsory__fill_input">*</label>
            </div>
            <input
              id="firstname"
              name="firstname"
              type="text"
              placeholder="Firstname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstname}
            />
            {formik.touched.firstname && formik.errors.firstname ? (
              <div className="error-login">{formik.errors.firstname}</div>
            ) : null}

            <div className="signUp__label">
              <label htmlFor="lastname">Lastname</label>
              <label className="compulsory__fill_input">*</label>
            </div>
            <input
              id="lastname"
              name="lastname"
              type="text"
              placeholder="Lastname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastname}
            />
            {formik.touched.lastname && formik.errors.lastname ? (
              <div className="error-login">{formik.errors.lastname}</div>
            ) : null}

            <div className="signUp__label">
              <label htmlFor="email">Email</label>
              <label className="compulsory__fill_input">*</label>
            </div>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error-login">{formik.errors.email}</div>
            ) : null}

            <div className="signUp__label">
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

            <div className="signUp__label">
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

            <div className="signUp__label">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <label className="compulsory__fill_input">*</label>
            </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="error-login">{formik.errors.confirmPassword}</div>
            ) : null}

            {/* <input type="submit" /> */}
            <button type="submit" className="submit-btn">
              Submit
            </button>
            <div className="create__new__account">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
              >
                Already signed in?
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
