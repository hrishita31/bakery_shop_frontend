import { useState } from "react";
// import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";
import ShowTestimony from "./DisplayTestimony";
import { RatingFunc } from "./RatingComponent";

export const Testimonial = () => {
  const [setTestimonials] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // const CarouselRef = useRef();
  const url = import.meta.env.VITE_API_URL;
  const token = Cookies.get("token");
        const headers = { Authorization: `Bearer ${token}` };

  const testimonialSchema = Yup.object().shape({
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
    location: Yup.string()
      .required("Location is required")
      .test(
        "isValidLocation",
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
    rating: Yup.string().required("Rating is required"),
    quote: Yup.string()
      .required("Quote is required")
      .test(
        "isValidQuote",
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
    image: Yup.mixed().required("Image is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      location: "",
      rating: "",
      quote: "",
      image: null,
    },
    validationSchema: testimonialSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        let formData = new FormData();

        formData.append("name", values.name);
        formData.append("location", values.location);
        formData.append("rating", values.rating);
        formData.append("quote", values.quote);
        formData.append("image", values.image);

        const data = await axios.post(
          `${url}/testimony/postTestimony`,
          formData, {
            headers,
          }
        );

        if (data.statusText === "OK") {
          toast.success("Testimonial submitted successfully!");
          setTestimonials((prev) => [
            ...prev,
            { ...values, image: URL.createObjectURL(values.image) },
          ]);
          setIsPopupOpen(false);
          resetForm();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <section className="testimonial spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="section-title">
              <span>Testimonial</span>
              <h2>Our Clients Say</h2>
            </div>
          </div>
        </div>
        <ShowTestimony />
        <Popup
          open={isPopupOpen}
          closeOnDocumentClick
          onClose={() => setIsPopupOpen(false)}
        >
          <div className="testimonial-container">
            <div className="testimonial-box">
              <h2>Share Your Testimonial</h2>
              <form onSubmit={formik.handleSubmit}>
                <div className="testimony__label">
                  <label htmlFor="name">Name</label>
                  <label className="compulsory__fill_input">*</label>
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
                  <div className="error-login">{formik.errors.name}</div>
                ) : null}

                <div className="testimony__label">
                  <label htmlFor="location">Location</label>
                  <label className="compulsory__fill_input">*</label>
                </div>
                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Location"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.location}
                />
                {formik.touched.location && formik.errors.location ? (
                  <div className="error-login">{formik.errors.location}</div>
                ) : null}

                <div className="testimony__label">
                  <label htmlFor="rating">Rating</label>
                  <label className="compulsory__fill_input">*</label>
                </div>
                <RatingFunc formik={formik} />
                {formik.touched.rating && formik.errors.rating ? (
                  <div className="error">{formik.errors.rating}</div>
                ) : null}

                <div className="testimony__label">
                  <label htmlFor="quote">Quote</label>
                  <label className="compulsory__fill_input">*</label>
                </div>
                <textarea
                  id="quote"
                  name="quote"
                  placeholder="Add your thoughts"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.quote}
                />
                {formik.touched.quote && formik.errors.quote ? (
                  <div className="error">{formik.errors.quote}</div>
                ) : null}

                <div className="testimony__label">
                  <label htmlFor="image">Upload image</label>
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
                  <div className="error">{formik.errors.image}</div>
                ) : null}

                {/* <input type="submit" /> */}
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </Popup>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="add-testimony-button"
        >
          Click to add your thoughts!
        </button>
      </div>
    </section>
  );
};

export default Testimonial;
