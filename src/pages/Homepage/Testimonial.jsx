import { useEffect, useState, useRef } from "react";
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
import { IconRefresh } from "@tabler/icons-react";

export const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const url = import.meta.env.VITE_API_URL;
  const token = Cookies.get("token");
  const headers = { Authorization: `Bearer ${token}` };
  const [captchaText, setCaptchaText] = useState("");
  const [userInput, setUserInput] = useState("");
  const canvasRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (isPopupOpen && canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        initializeCaptcha(ctx);
      }
    }, 100)
    
  }, [isPopupOpen]);

  const generateRandomChar = (min, max) =>
    String.fromCharCode(Math.floor(Math.random() * (max - min + 1) + min));

  const generateCaptchaText = () => {
    let captcha = "";
    for (let i = 0; i < 3; i++) {
      captcha += generateRandomChar(65, 90); // A-Z
      captcha += generateRandomChar(97, 122); // a-z
      captcha += generateRandomChar(48, 57); // 0-9
    }
    return captcha
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  };

  const drawCaptchaOnCanvas = (ctx, captcha) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const textColors = ["rgb(0,0,0)", "rgb(130,130,130)"];
    const letterSpace = 150 / captcha.length;
    for (let i = 0; i < captcha.length; i++) {
      ctx.font = "20px Roboto Mono";
      ctx.fillStyle = textColors[Math.floor(Math.random() * 2)];
      ctx.fillText(
        captcha[i],
        25 + i * letterSpace,
        Math.floor(Math.random() * 16 + 25),
        100
      );
    }
  };

  const initializeCaptcha = (ctx) => {
    setUserInput("");
    const newCaptcha = generateCaptchaText();
    setCaptchaText(newCaptcha);
    drawCaptchaOnCanvas(ctx, newCaptcha);
  };

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const testimonialSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .matches(/[A-Za-z0-9]/, "Should have at least one alphabet or digit"),
    location: Yup.string()
      .required("Location is required")
      .matches(/[A-Za-z0-9]/, "Should have at least one alphabet or digit"),
    rating: Yup.string().required("Rating is required"),
    quote: Yup.string()
      .required("Quote is required")
      .matches(/[A-Za-z0-9]/, "Should have at least one alphabet or digit"),
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
      location: "",
      rating: "",
      quote: "",
      image: null,
      username: JSON.parse(Cookies.get("details")).usrname,
    },
    validationSchema: testimonialSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (userInput === captchaText) {
          let formData = new FormData();
          formData.append("name", values.name);
          formData.append("location", values.location);
          formData.append("rating", values.rating);
          formData.append("quote", values.quote);
          formData.append("image", values.image);
          formData.append("username", values.username);

          const response = await axios.post(
            `${url}/testimony/postTestimony`,
            formData,
            { headers }
          );

          console.log(response, 235);
          if (response.status === 201) {
            toast.success("Testimonial submitted successfully!");
            
            setTestimonials([
              ...testimonials,
              { ...values, image: URL.createObjectURL(values.image) },
            ]);
            setIsPopupOpen(false);
            resetForm();
            
          } else {
            // toast.error("Failed to submit testimonial.");
          }
        } else {
          const ctx = canvasRef.current.getContext("2d");
          initializeCaptcha(ctx);
          toast.error("Incorrect captcha. Try again.");
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  useEffect(() => {
    console.log(testimonials)
  }, [testimonials])

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
                  <label htmlFor="location">location</label>
                  <label className="compulsory__fill_input">*</label>
                </div>
                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="location"
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
                  <div className="error-login">{formik.errors.rating}</div>
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
                  <div className="error-login">{formik.errors.image}</div>
                ) : null}

                <div className="testimony__label">
                  <label htmlFor="captcha">Enter captcha</label>
                  <label className="compulsory__fill_input">*</label>
                </div>
                <div className="wrapper">
                  <div className="captcha-generate">
                    <canvas ref={canvasRef} width="280" height="60"></canvas>
                  </div>
                  <div className="reload-btn">
                    <button
                      type="button"
                      onClick={() => {
                        console.log(canvasRef.current, 8888);
                        initializeCaptcha(canvasRef.current.getContext("2d"));
                        setTimeout(() => {
                          if (canvasRef.current) {
                            initializeCaptcha(
                              canvasRef.current.getContext("2d")
                            );
                          }
                        }, 100);
                      }}
                    >
                      <IconRefresh />
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  id="captcha"
                  placeholder="Enter the text in the image"
                  value={userInput}
                  onChange={handleUserInputChange}
                />
                {formik.touched.captcha && formik.errors.captcha ? (
                  <div className="error-login">{formik.errors.captcha}</div>
                ) : null}

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