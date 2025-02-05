/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import postData from "../../requests/postRequest";
// import getData from "../../requests/getRequest";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TestimonialCard = ({ authorName, location, rating, text, image }) => {
  return (
    <div className="testimonial-card">
      <div className="testimonial-author">
        <div className="testimonial-author-pic">
          <img src={image} alt={authorName} />
        </div>
        <div className="testimonial-author-text">
          <h5>{authorName.toUpperCase()}</h5>
          <span>{location}</span>
        </div>
        <div className="testimonial-rating">
          {Array.from({ length: 5 }, (_, index) => (
            <span
              key={index}
              className={
                index < Math.floor(rating)
                  ? "icon_star"
                  : index < rating
                  ? "icon_star-half_alt"
                  : "icon_star-empty"
              }
            ></span>
          ))}
        </div>
      </div>
      <p className="testimonial-text">{text}</p>
    </div>
  );
};

export const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const CarouselRef = useRef();

  // useEffect(() => {
  //   const fetchTestimonials = async () => {
  //     const data = await getData("/testimony/getTestimonials");
  //     if (data.success) {
  //       setTestimonials(data.testimonials);
  //     }
  //   };
  //   fetchTestimonials();
  // }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      location: "",
      rating: "",
      quote: "",
      photo: null,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      location: Yup.string().required("Location is required"),
      rating: Yup.string().required("Rating is required"),
      quote: Yup.string().required("Quote is required"),
      photo: Yup.mixed().required("Photo is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("location", values.location);
        formData.append("rating", values.rating);
        formData.append("quote", values.quote);
        formData.append("photo", values.photo);
  
        const data = await postData(formData, "/testimony/postTestimony", {
          headers: { "Content-Type": "multipart/form-data" }, // Ensure correct content type
        });
  
        if (data.data.success) {
          toast.success("Testimonial submitted successfully!");
          setTestimonials((prev) => [...prev, { ...values, image: URL.createObjectURL(values.photo) }]);
          setIsPopupOpen(false);
          resetForm(); // Clear form after success
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
        <div className="row" style={{ width: "100%" }}>
          {testimonials.length > 0 && (
            <Carousel
              ref={CarouselRef}
              additionalTransfrom={0}
              arrows
              autoPlay
              autoPlaySpeed={9000}
              centerMode={false}
              className=""
              containerClass="w-full"
              draggable
              infinite
              itemClass="testimonial__item"
              keyBoardControl
              minimumTouchDrag={80}
              pauseOnHover
              responsive={{
                desktop: { breakpoint: { max: 3000, min: 1024 }, items: 2 },
                tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
                mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
              }}
              rewind={false}
              shouldResetAutoplay
              showDots={false}
              slidesToSlide={1}
              swipeable
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </Carousel>
          )}
        </div>
        <Popup
          open={isPopupOpen}
          closeOnDocumentClick
          onClose={() => setIsPopupOpen(false)}
        >
          <div className="testimonial-container">
            <div className="testimonial-box">
              <h2>Share Your Testimonial</h2>
              <form onSubmit={formik.handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <div>{formik.errors.name}</div>
                )}

                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  {...formik.getFieldProps("location")}
                />
                {formik.touched.location && formik.errors.location && (
                  <div>{formik.errors.location}</div>
                )}

                <label htmlFor="rating">Rating</label>
                <input
                  id="rating"
                  name="rating"
                  type="text"
                  {...formik.getFieldProps("rating")}
                />
                {formik.touched.rating && formik.errors.rating && (
                  <div>{formik.errors.rating}</div>
                )}

                <label htmlFor="quote">Quote</label>
                <textarea
                  id="quote"
                  name="quote"
                  {...formik.getFieldProps("quote")}
                />
                {formik.touched.quote && formik.errors.quote && (
                  <div>{formik.errors.quote}</div>
                )}

                <label htmlFor="photo">Upload photo:</label>
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  onChange={(event) =>
                    formik.setFieldValue("photo", event.currentTarget.files[0])
                  }
                />
                {formik.touched.photo && formik.errors.photo && (
                  <div>{formik.errors.photo}</div>
                )}

                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </Popup>
        <button onClick={() => setIsPopupOpen(true)}>
          Click to add your thoughts!
        </button>
      </div>
    </section>
  );
};

export default Testimonial;
