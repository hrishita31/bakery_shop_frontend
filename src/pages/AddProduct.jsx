import Breadcrumb from "./Breadcrumbs";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormData from "form-data";
import axios from "axios";
import Cookies from "js-cookie";

function AddProductPage() {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;

  const ProductSchema = Yup.object().shape({
    category: Yup.string()
      .required("Category is required")
      .test("isValidCategory", "Should have atleast one alphabet", (value) => {
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
      }),
    product: Yup.string()
      .required("Product is required")
      .test("isValidCategory", "Should have atleast one alphabet", (value) => {
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
      }),
    image: Yup.mixed().required("Product image is required"),
    price: Yup.string()
      .required("Price is required")
      .matches(/[1-9]/, "Price must contain at least one digit (1-9)"),
  });

  const formik = useFormik({
    initialValues: {
      category: "",
      product: "",
      image: null,
      price: "",
    },
    validationSchema: ProductSchema,
    onSubmit: async (values) => {
      let formData = new FormData();

      formData.append("category", values.category);
      formData.append("product", values.product);
      formData.append("image", values.image);
      formData.append("price", values.price);

      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };
      
      const data = await axios.post(`${url}/products/newProduct`, formData, {
        headers,
      });

      if (data.statusText === "OK") {
        toast.success("Successfully added new product");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    },
  });

  return (
    <>
      {/* Breadcrumbs section */}
      <Breadcrumb title="Add product" />

      {/* Add products section */}
      <div className="add-product-container">
        <div className="add-product-box">
          <h2>Add Product</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="input-group">
              <label htmlFor="category">Category</label>
              <label className="compulsory__fill__admin">*</label>
              <input
                id="category"
                name="category"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.category}
                placeholder="Category"
              />
              {formik.touched.category && formik.errors.category ? (
                <div className="error-login">{formik.errors.category}</div>
              ) : null}
            </div>

            <div className="input-group">
              <label htmlFor="product">Product</label>
              <label className="compulsory__fill__admin">*</label>
              <input
                id="product"
                name="product"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.product}
                placeholder="Product"
              />
              {formik.touched.product && formik.errors.product ? (
                <div className="error-login">{formik.errors.product}</div>
              ) : null}
            </div>

            <div className="input-group">
              <label htmlFor="image">Upload image</label>
              <label className="compulsory__fill__admin">*</label>
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
            </div>

            <div className="input-group">
              <label htmlFor="price">Price</label>
              <label className="compulsory__fill__admin">*</label>
              <input
                id="price"
                name="price"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
                placeholder="Price"
              />
              {formik.touched.price && formik.errors.price ? (
                <div className="error-login">{formik.errors.price}</div>
              ) : null}
            </div>

            {/* <input type="submit" /> */}
            <button type="submit" className="submit-btn">
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProductPage;
