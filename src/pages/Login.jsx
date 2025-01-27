import Header from "../../public/js/components/Header";
import Footer from "../../public/js/components/Footer";
import Breadcrumb from "./Breadcrumbs";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function LoginPage() {

  const LoginSchema = Yup.object().shape({
    username : Yup.string()
              .required('username is required'),
    password : Yup.string()
              .min(8, 'password must be 8 characters long')
              .required('password is required'),
    });
  return (
    <>
      {/* Header section */}
      <Header />

      {/* Breadcrumb section */}
      <Breadcrumb title="Login" />

      {/* Login form section */}
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={LoginSchema}
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
                  <label htmlFor="username">Username</label>
                  <Field
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                  />
                  <ErrorMessage name="username" component="div" />
                </div>

                <div>
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage name="password" component="div" />
                </div>

                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Footer section */}
      <Footer />
    </>
  );
}

export default LoginPage;
