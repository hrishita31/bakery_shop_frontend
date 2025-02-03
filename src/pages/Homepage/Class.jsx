import * as Yup from "yup";
import { useFormik } from "formik";
import postData from "../../requests/postRequest";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Class = () => {
  const ClassSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    classTime: Yup.string().required("class time is required"),
    branch: Yup.string().required("branch preferred is required"),
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
      const data = await postData(values, "/classes/classRegistration");
      console.log(data);
      if (data.data.success) {
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
                  <label htmlFor="name">Name</label>
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

                  <label htmlFor="phoneNumber">Phone Number</label>
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

                  <div className="radio-group">
                    <label htmlFor="classTime">Class Time</label>
                    <div className="radio-option">
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
                    <div className="radio-option">
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
                    <div className="radio-option">
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
                    <div>{formik.errors.classTime}</div>
                  ) : null}

                  <div className="radio-group">
                    <label htmlFor="branch">Branch</label>
                    <div className="radio-option">
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
                    <div className="radio-option">
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
                    <div>{formik.errors.branch}</div>
                  ) : null}

                  <input type="submit" />
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
                  href="https://www.youtube.com/watch?v=8PJ3_p7VqHw&list=RD8PJ3_p7VqHw&start_radio=1"
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
