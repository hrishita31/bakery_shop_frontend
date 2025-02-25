import Header from "../../public/js/components/Header";
import Footer from "../../public/js/components/Footer";
import Breadcrumb from "./Breadcrumbs";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import postData from "../requests/postRequest";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormData from "form-data";
// import { ImageInput } from "formik-file-and-image-input/lib";

function TeamRegisterPage() {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;

  const TeamSchema = Yup.object().shape({
    name: Yup.string().required("username is required"),
    phoneNumber: Yup.string().required("password is required"),
    email: Yup.string().required("email is required"),
    jobRole: Yup.string().required("job role is required"),
    image: Yup.mixed().required("Photo is required"),
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

      const data = await axios.post(`${url}/teams/postTeamMember`, formData)
      if (data.statusText === "OK") {
        toast.success("Registration successful");

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
      <Breadcrumb title="Team Registration" />

      <div className="team-container">
        <div className="team-box">
          <h2>Registration</h2>

          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
            ) : null}
            <label htmlFor="phoneNumber">phoneNumber:</label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div>{formik.errors.phoneNumber}</div>
            ) : null}
            <label htmlFor="email">Email:</label>
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

            <div className="radio-group">
            <label htmlFor="jobRole">Job Role preferred:</label>
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

            <label htmlFor="image">Upload photo:</label>
            <input
            id="image"
            name="image"
            type="file"
            onChange={(event) => {
              formik.setFieldValue("image", event.currentTarget.files[0])
          }}/>
            {formik.touched.image && formik.errors.image ? (
              <div>{formik.errors.image}</div>
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

export default TeamRegisterPage;
