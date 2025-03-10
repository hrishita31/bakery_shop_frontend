import * as Yup from "yup";
import { useFormik } from "formik";
import postData from "../../requests/postRequest";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

export const Class = () => {

  const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };

  const ClassSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .test(
        "isValidName",
        "Should have atleast one alphabet",
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
    classTime: Yup.string().required("Class time is required"),
    branch: Yup.string().required("Branch preferred is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      classTime: "",
      branch: "",
    },
    validationSchema: ClassSchema,
    onSubmit: async (values) => {
      const data = await postData(values, "/classes/classRegistration", {
        headers,
      });
      if (data.success) {
        toast.success("Registration successful");
      } else {
        toast.error(data.message);
      }
    },
  });
  return (
    <>
      <section className="class spad">
        <div className="container">
          <div className="row align-items-center">
            {/* Registration Form */}
            <div className="col-lg-6">
              <div className="class__form">
                <div className="section-title">
                  <span>Class cakes</span>
                  <h2>
                    Made from your <br />
                    own hands
                  </h2>
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <div className="class__label">
                      <label htmlFor="name">Name</label>
                      <label className="compulsory__fill">*</label>
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className="error-class">{formik.errors.name}</div>
                    ) : null}
                  </div>

                  <div>
                    <div className="class__label">
                      <label htmlFor="phoneNumber">Phone number</label>
                      <label className="compulsory__fill">*</label>
                    </div>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="text"
                      placeholder="Phone number"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phoneNumber}
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                      <div className="error-class">
                        {formik.errors.phoneNumber}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <div className="radio-group">
                      <div className="class__label">
                        <label htmlFor="classTime">Class Time</label>
                        <label className="compulsory__fill_input">*</label>
                      </div>
                      <div className="radio-option-class">
                        <input
                          id="classTime"
                          name="classTime"
                          type="radio"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value="4:00-5:00"
                        />
                        4:00-5:00
                      </div>
                      <div className="radio-option-class">
                        <input
                          id="classTime"
                          name="classTime"
                          type="radio"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value="5:00-6:00"
                        />
                        5:00-6:00
                      </div>
                      <div className="radio-option-class">
                        <input
                          id="classTime"
                          name="classTime"
                          type="radio"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value="6:00-7:00"
                        />
                        6:00-7:00
                      </div>
                    </div>
                    {formik.touched.classTime && formik.errors.classTime ? (
                      <div className="error-class">
                        {formik.errors.classTime}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <div className="radio-group">
                      <div className="class__label">
                        <label htmlFor="branch">Branch</label>
                        <label className="compulsory__fill_input">*</label>
                      </div>
                      <div className="radio-option-class">
                        <input
                          id="branch"
                          name="branch"
                          type="radio"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value="Bopal"
                        />
                        Bopal
                      </div>
                      <div className="radio-option-class">
                        <input
                          id="branch"
                          name="branch"
                          type="radio"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value="Shyamal"
                        />
                        Shyamal
                      </div>
                    </div>
                    {formik.touched.branch && formik.errors.branch ? (
                      <div className="error-class">{formik.errors.branch}</div>
                    ) : null}
                  </div>
                  <div className="class__submit">
                    {/* <input type="submit" /> */}
                    <button type="submit" className="submit-btn">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Video Section */}
            <div className="col-lg-6">
              <div
                className="about__video set-bg"
                style={{ backgroundImage: `url(img/about-video.jpg)` }}
              >
                <a
                  href=""
                  className="play-btn video-popup"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-play"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Class;
