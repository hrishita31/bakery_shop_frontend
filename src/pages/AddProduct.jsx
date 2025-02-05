import Header from "../../public/js/components/Header";
import Footer from "../../public/js/components/Footer";
import Breadcrumb from "./Breadcrumbs";
import * as Yup from "yup";
import { useFormik } from "formik";
//import axios from "axios";
import { useNavigate } from "react-router-dom";
// import postData from "../requests/postRequest";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormData from "form-data";
import axios from "axios";
import Cookies from "js-cookie";

function AddProductPage() {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;

  const ProductSchema = Yup.object().shape({
    category: Yup.string().required("category is required"),
    product: Yup.string().required("product is required"),
    image: Yup.mixed().required("Product image is required"),
    price: Yup.string().required("price is required"),
    rating: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      category: "",
      product: "",
      image: null,
      price: 0,
      rating: "",
    },
    validationSchema: ProductSchema,
    onSubmit: async (values) => {
      console.log(values, 4567);
      let formData = new FormData();
      // formData = {...values}

      formData.append("category", values.category);
      formData.append("product", values.product);
      formData.append("image", values.image);
      formData.append("price", values.price);
      formData.append("rating", values.rating);
      // console.log(formData, 123);
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };
      const data = await axios.post(`${url}/products/newProduct`, formData, {
        headers,
      });

      if (data.statusText === "OK") {
        toast.success("Successfully added new product");
        const headers = { Authorization: `Bearer ${token}` };
        const detailsResult = await axios.get({ headers: headers });
        console.log(detailsResult);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    },
  });

  return (
    <>
      {/* Header section */}
      <Header />

      {/* Breadcrumbs section */}
      <Breadcrumb title="Add product" />

      {/* Add products section */}
      <div className="add-product-container">
        <div className="add-product-box">
          <h2>Add Product</h2>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="category">Category: </label>
            <input
              id="category"
              name="category"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
            />
            {formik.touched.category && formik.errors.category ? (
              <div>{formik.errors.category}</div>
            ) : null}

            <label htmlFor="product">Product: </label>
            <input
              id="product"
              name="product"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.product}
            />
            {formik.touched.product && formik.errors.product ? (
              <div>{formik.errors.product}</div>
            ) : null}

            <label htmlFor="image">Upload image:</label>
            <input
              id="image"
              name="image"
              type="file"
              onChange={(event) => {
                formik.setFieldValue("image", event.currentTarget.files[0]);
                console.log(event.currentTarget.files[0]);
              }}
            />
            {formik.touched.image && formik.errors.image ? (
              <div>{formik.errors.image}</div>
            ) : null}

            <label htmlFor="price">Price: </label>
            <input
              id="price"
              name="price"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
            />
            {formik.touched.price && formik.errors.price ? (
              <div>{formik.errors.price}</div>
            ) : null}

            <label htmlFor="rating">Rating: </label>
            <input
              id="rating"
              name="rating"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rating}
            />
            {formik.touched.rating && formik.errors.rating ? (
              <div>{formik.errors.price}</div>
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

export default AddProductPage;
