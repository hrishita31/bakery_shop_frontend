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
// import { ImageInput } from "formik-file-and-image-input/lib";

function TeamRegisterPage() {
  const navigate = useNavigate();

  const TeamSchema = Yup.object().shape({
    name: Yup.string().required("username is required"),
    phoneNumber: Yup.string().required("password is required"),
    email: Yup.string().required("email is required"),
    jobRole: Yup.string().required("job role is required"),
    photo: Yup.mixed().required("Photo is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      email: "",
      jobRole: "",
      photo: null,
    },
    validationSchema: TeamSchema,
    onSubmit: async (values) => {
      const data = await postData(values, "/teams/postTeamMember");
      console.log(data);
      if (data.success) {
        toast.success("Registration successful");

        navigate("/");
      } else {
        toast.error(data.message);
        // toast.error("Login unsuccessful. Please try again.")
      }
    },
  });

//   function CustomImageInputWrapper({onClick, fileName, src}) {
//     return (
//         <div onClick={onClick}>
//             {!src && <button onClick={onClick}>Choose Image</button>}
//             <img src={src} />
//             <p>{fileName}</p>
//         </div>
//     )
// }
  return (
    <>
      {/* Header section */}
      <Header />

      {/* Breadcrumb section */}
      <Breadcrumb title="Team Regitration" />

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
            <label htmlFor="jobRole">Class Time:</label>
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

            <label htmlFor="photo">Upload photo:</label>
            <input
            id="photo"
            name="photo"
            type="file"
            onChange={(event) => {
                formik.setFieldValue("photo", event.currentTarget.files[0])
            }}/>
            {/* <ImageInput
                    name="photo"
                    validFormats={imageFormats}
                    component={CustomImageInputWrapper}
                /> */}
            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
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
