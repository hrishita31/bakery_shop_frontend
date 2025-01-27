import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export const Class = () => {
  const ClassSchema = Yup.object().shape({
    Name: Yup.string().required("Name is required"),
    PhoneNumber: Yup.string().required("Phone number is required"),
    ClassTime: Yup.string().required("class time is required"),
    Branch: Yup.string().required("branch preferred is required"),
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
                <Formik
                  initialValues={{
                    Name: "",
                    PhoneNumber: "",
                    ClassTime: "",
                    Branch: "",
                  }}
                  validationSchema={ClassSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                      setSubmitting(false);
                    }, 1000);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div>
                        <label htmlFor="name">Name</label>
                        <Field
                          type="text"
                          name="name"
                          placeholder="Enter your name"
                        />
                        <ErrorMessage name="name" component="div" />
                      </div>

                      <div>
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <Field
                          type="text"
                          name="phoneNumber"
                          placeholder="Enter your phone number"
                        />
                        <ErrorMessage name="phoneNumber" component="div" />
                      </div>

                      <div>
                        <label>Class Time</label>
                        <div className="radio-group">

                          <label className="radio-option">
                            <Field
                              type="radio"
                              name="ClassTime"
                              value="4:00 - 5:00"
                            />
                            4:00 - 5:00
                            </label>
                            <label className="radio-option">
                            <Field
                              type="radio"
                              name="ClassTime"
                              value="5:00 - 6:00"
                            />
                            5:00 - 6:00
                            </label>
                            <label className="radio-option">
                            <Field
                              type="radio"
                              name="ClassTime"
                              value="6:00 - 7:00"
                            />
                            6:00 - 7:00
                          </label>
                          
                        </div>
                        <ErrorMessage name="classTime" component="div" />
                      </div>

                      <div>
                        <label>Branch</label>
                        <div className="radio-group">
                        <label className="radio-option">
                            <Field
                              type="radio"
                              name="Branch"
                              value="Bopal"
                            />
                            Bopal
                            </label>
                            <label className="radio-option">
                            <Field
                              type="radio"
                              name="Branch"
                              value="Shyamal"
                            />
                            Shyamal
                          </label>
                          
                        </div>
                        <ErrorMessage name="Branch" component="div" />
                      </div>                      

                      <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                    </Form>
                  )}
                </Formik>

                {/* <form action="#">
                  <input type="text" placeholder="Name" />
                  <input type="text" placeholder="Phone" />
                  <select>
                    <option value="">Studying Class</option>
                    <option value="">Writting Class</option>
                    <option value="">Reading Class</option>
                  </select>
                  <input type="text" placeholder="Type your requirements" />
                  <button type="submit" className="site-btn">
                    registration
                  </button>
                </form> */}
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
