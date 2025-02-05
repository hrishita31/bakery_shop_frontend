import Header from "../../public/js/components/Header";
import Footer from "../../public/js/components/Footer";
import Breadcrumb from "./Breadcrumbs";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
import postData from "../requests/postRequest";

function ForgotPasswordPage() {
  // const navigate = useNavigate();

  const ForgotPasswordSchema = Yup.object().shape({
    username: Yup.string().required("username is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
    },  
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values) => {
      const data = await postData(values, "/users/getUser");
      console.log(data, 9876);
      // console.log(data, 123456);
      if (data.success) {
        
        const email = data.data.result.email;
        toast.success(`User found! Email sent to ${email || "the registered email id"} `);

        // navigate("/");
      } else {
        toast.error(data.message || "User not found, please enter correct username")
      }
    },
  });
  return (
    <>
      {/* Header section */}
      <Header />

      {/* Breadcrumb section */}
      <Breadcrumb title="Forgot Password" />

      {/* Forgot Password section */}
      <div className="forgotPwd-container">
        <div className="forgotPwd-box">
          <h2>Forgot Password</h2>
          

          <form onSubmit={formik.handleSubmit}>

          <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div>{formik.errors.username}</div>
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

export default ForgotPasswordPage;
