import Header from "../../public/js/components/Header";
import Footer from "../../public/js/components/Footer";
import Breadcrumb from "./Breadcrumbs";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function SignUpPage() {

  const SignUpSchema = Yup.object().shape({
      firstname : Yup.string()
                  .required('firstname is required'),
      lastname : Yup.string()
                  .required('lastname is required'),
      email : Yup.string()
                  .required('email is required'),
      username : Yup.string()
                .required('username is required'),
      password : Yup.string()
                .min(8, 'password must be 8 characters long')
                .required('password is required'),
      });
  return (
    <>
      {/* header section */}
      <Header />

        {/* breadcrumbs section */}
      <Breadcrumb title="Sign up"></Breadcrumb>

        {/* sign up section */}
      <div className="signUp-container">
        <div className="signUp-box">
          <h2>Sign up</h2>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={SignUpSchema}
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
                  <label htmlFor="firstname">Firstname</label>
                  <Field
                    type="text"
                    name="firstname"
                    placeholder="Enter your firstname"
                  />
                  <ErrorMessage name="username" component="div" />
                </div>

                <div>
                  <label htmlFor="lastname">Lastname</label>
                  <Field
                    type="text"
                    name="lastname"
                    placeholder="Enter your lastname"
                  />
                  <ErrorMessage name="lastname" component="div" />
                </div>

                <div>
                  <label htmlFor="email">Email</label>
                  <Field
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage name="email" component="div" />
                </div>

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

          {/* <form>
          <label htmlFor="firstname">Firstname</label>
          <input type="text" id="firstname" placeholder="Enter first name" />
          <label htmlFor="lastname">Lastname</label>
            <input type="text" id="lastname" placeholder="Enter last name" />
            <label htmlFor="email">Email</label>
            <input type="text" id="email" placeholder="Enter email adress" />
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Enter username" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter password" />
            <button type="submit">Login</button>
          </form> */}
        </div>
      </div>

      {/* Footer section */}
      <Footer />
    </>
  );
}

export default SignUpPage;
