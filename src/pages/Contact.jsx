import Header from "../../public/js/components/Header";
import Footer from "../../public/js/components/Footer";
import Breadcrumb from "./Breadcrumbs";
import Map from "./Homepage/Map";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";

export const ContactPage = () => {
  const url = import.meta.env.VITE_API_URL;
  const token = Cookies.get("token");
    const headers = { Authorization: `Bearer ${token}` };

  const ContactWithUsSchema = Yup.object().shape({
    name: Yup.string().required("Name is required")
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
    email: Yup.string().required("Email is required")
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
        const conditions = [hasLowerCase, hasUpperCase, hasNumber, hasSpecialChar];
        conditions.forEach((condition) =>
          condition ? validConditions++ : null
        );
        if (validConditions >= numberOfMustBeValidConditions) {
          return true;
        }
        return false;
      }
    ),
    message: Yup.string().required("Message is required")
    .test(
      "isValidMessage",
      "Should have atleast one alphabet",
      (value) => {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasDigits = /[0-9]/.test(value);
        let validConditions = 0;

        const numberOfMustBeValidConditions = 1;
        const conditions = [hasLowerCase, hasUpperCase, hasDigits];
        conditions.forEach((condition) =>
          condition ? validConditions++ : null
        );
        if (validConditions >= numberOfMustBeValidConditions) {
          return true;
        }
        return false;
      }
    ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: ContactWithUsSchema,
    onSubmit: async (values) => {
      console.log(values, 234);
      const data = await axios.post(`${url}/users/connectWithUs`, values, {
        headers,
      });

      console.log(data, 123);
      if (data.statusText === "OK") {
        toast.success("Successfully submitted your message");
      } else {
        toast.error(data.message);
      }
    },
  });

  return (
    <>
      {/* header section */}
      <Header />

      {/* breadcrumb section */}
      <Breadcrumb title="Contact"></Breadcrumb>

      {/* contact section */}
      <section className="contact spad">
        <div className="container">
          <Map />
          <div className="contact__address">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="contact__address__item">
                  <h6>Mumbai</h6>
                  <ul>
                    <li>
                      <span className="icon_pin_alt"></span>
                      <p>Mumbai</p>
                    </li>
                    <li>
                      <span className="icon_headphones"></span>
                      <p>+91 9898989898</p>
                    </li>
                    <li>
                      <span className="icon_mail_alt"></span>
                      <p>Sweetcake@support.com</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="contact__address__item">
                  <h6>Bangalore</h6>
                  <ul>
                    <li>
                      <span className="icon_pin_alt"></span>
                      <p>Bangalore</p>
                    </li>
                    <li>
                      <span className="icon_headphones"></span>
                      <p>+91 9797979797</p>
                    </li>
                    <li>
                      <span className="icon_mail_alt"></span>
                      <p>Sweetcake@support.com</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="contact__address__item">
                  <h6>Hyderabad</h6>
                  <ul>
                    <li>
                      <span className="icon_pin_alt"></span>
                      <p>Hyderabad</p>
                    </li>
                    <li>
                      <span className="icon_headphones"></span>
                      <p>+91 9090909090</p>
                    </li>
                    <li>
                      <span className="icon_mail_alt"></span>
                      <p>Sweetcake@support.com</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="contact__text">
                <h3>Contact With us</h3>
                <ul>
                  <li>Representatives or Advisors are available:</li>
                  <li>Mon-Fri: 5:00am to 9:00pm</li>
                  <li>Sat-Sun: 6:00am to 9:00pm</li>
                </ul>
                <img src="img/cake-piece.png" alt="" />
              </div>
            </div>
            <div className="col-lg-8">
              <div className="contact__form">
                <div className="row">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="contact__details">
                      <div className="contact__name__details">
                        <label htmlFor="name">Name</label><label className="compulsory__fill">*</label>
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
                      </div>
                      <div className="contact__email__details">
                        <label htmlFor="email">Email</label><label className="compulsory__fill">*</label>
                        <input
                          id="email"
                          name="email"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                          placeholder="Email"
                        />
                        {formik.touched.email && formik.errors.email ? (
                          <div className="error-login">{formik.errors.email}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="contact__message__details">
                      <label htmlFor="message">Message</label><label className="compulsory__fill">*</label>
                      <input 
                        id="message"
                        name="message"
                        type="textarea"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.message}
                        placeholder="Message"
                      />
                      {formik.touched.message && formik.errors.message ? (
                        <div className="error-login">{formik.errors.message}</div>
                      ) : null}
                    </div>

                    <div className="submit__connect">
                      {/* <input type="submit" /> */}
                      <button type="submit" className="submit-btn">
            Submit
          </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer section */}
      <Footer />
    </>
  );
};

export default ContactPage;
