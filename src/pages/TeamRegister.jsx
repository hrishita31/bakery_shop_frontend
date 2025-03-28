import Breadcrumb from "./Breadcrumbs";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormData from "form-data";

function TeamRegisterPage() {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;

  const TeamSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .test(
        "isValidName",
        "Should have atleast one alphabet or a digit",
        (value) => {
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
        }
      ),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^\d{10}$/, "Phone number must be a 10-digit number"),
    email: Yup.string()
      .required("Email is required")
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
    jobRole: Yup.string().required("Job role is required"),
    image: Yup.mixed()
      .required("Image is required")
      .test(
        "fileFormat",
        "Only .jpg, .jpeg, and .png files are allowed",
        (file) => {
          return (
            file && ["image/jpeg", "image/jpg", "image/png"].includes(file.type)
          );
        }
      ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      email: "",
      jobRole: "",
      image: null,
    },
    validationSchema: TeamSchema,
    onSubmit: async (values) => {
      let formData = new FormData();

      formData.append("name", values.name);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("email", values.email);
      formData.append("jobRole", values.jobRole);
      formData.append("image", values.image);

      const data = await axios.post(`${url}/teams/registerToTeam`, formData);
      if (data.statusText === "OK") {
        toast.success("Registration successful");
        navigate("/about");
      } else {
        toast.error(data.message);
      }
    },
  });
  return (
    <>
      {/* Breadcrumb section */}
      <Breadcrumb title="Team Registration" />

      <div className="team-container">
        <div className="team-box">
          <h2>Registration</h2>

          <form onSubmit={formik.handleSubmit}>
            <div className="team__register__label">
              <label htmlFor="name">Name</label>
              <label className="compulsory__fill_input">*</label>
            </div>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              placeholder="Name"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="error-login">{formik.errors.name}</div>
            ) : null}

            <div className="team__register__label">
              <label htmlFor="phoneNumber">Phone number</label>
              <label className="compulsory__fill_input">*</label>
            </div>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
              placeholder="Phone number"
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className="error-login">{formik.errors.phoneNumber}</div>
            ) : null}

            <div className="team__register__label">
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

            <div>
              <div className="radio-group">
                <div className="team__register__label">
                  <label htmlFor="jobRole">Job Role preferred</label>
                  <label className="compulsory__fill_input">*</label>
                </div>
                <div className="radio-option">
                  <input
                    id="jobRole"
                    name="jobRole"
                    type="radio"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value="Baker"
                  />
                  Baker
                </div>
                <div className="radio-option">
                  <input
                    id="jobRole"
                    name="jobRole"
                    type="radio"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value="Decorator"
                  />
                  Decorator
                </div>
                <div className="radio-option">
                  <input
                    id="jobRole"
                    name="jobRole"
                    type="radio"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value="Specialist"
                  />
                  Specialist
                </div>
              </div>
              {formik.touched.jobRole && formik.errors.jobRole ? (
                <div className="error-login">{formik.errors.jobRole}</div>
              ) : null}
            </div>

            <div className="team__register__label">
              <label htmlFor="image">Upload photo</label>
              <label className="compulsory__fill_input">*</label>
            </div>
            <input
              id="image"
              name="image"
              type="file"
              onChange={(event) => {
                formik.setFieldValue("image", event.currentTarget.files[0]);
              }}
            />
            {formik.touched.image && formik.errors.image ? (
              <div className="error-login">{formik.errors.image}</div>
            ) : null}

            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default TeamRegisterPage;
