import Header from "../../public/js/components/Header";
import Footer from "../../public/js/components/Footer";
import Breadcrumb from "./Breadcrumbs";
import { Country, State, City } from "country-state-city";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import postData from "../requests/postRequest";
import patchData from "../requests/patchRequest";
import axios from "axios";
import Cookies from "js-cookie";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {Loader} from "./Loader"

function AddAddressPage() {
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const username = JSON.parse(Cookies.get("details")).usrname;

  const [searchParams] = useSearchParams();
  const addressId = searchParams.get("_id");
  const [isLoading, setIsLoading] = useState(false);

  const [countries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [tag, setTag] = useState(0);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const AddressSchema = Yup.object().shape({
    addressLine1: Yup.string()
      .required("Address Line 1 is required")
      .min(5, "Must be at least 5 character long")
      .test(
        "isValidLine1",
        "Should have atleast one alphabet or a digit",
        (value) => {
          const hasUpperCase = /[A-Z]/.test(value);
          const hasLowerCase = /[a-z]/.test(value);
          const hasNumber = /[0-9]/.test(value);

          let validConditions = 0;

          const numberOfMustBeValidConditions = 1;
          const conditions = [hasLowerCase, hasUpperCase, hasNumber];
          conditions.forEach((condition) =>
            condition ? validConditions++ : null
          );
          if (validConditions >= numberOfMustBeValidConditions) {
            return true;
          }
          return false;
        }
      ),
    addressLine2: Yup.string()
      .required("Address Line 2 is required")
      .min(5, "Must be at least 5 character long")
      .test(
        "isValidLine2",
        "Should have atleast one alphabet or a digit",
        (value) => {
          const hasUpperCase = /[A-Z]/.test(value);
          const hasLowerCase = /[a-z]/.test(value);
          const hasNumber = /[0-9]/.test(value);

          let validConditions = 0;

          const numberOfMustBeValidConditions = 1;
          const conditions = [hasLowerCase, hasUpperCase, hasNumber];
          conditions.forEach((condition) =>
            condition ? validConditions++ : null
          );
          if (validConditions >= numberOfMustBeValidConditions) {
            return true;
          }
          return false;
        }
      ),
    landmark: Yup.string(),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    pincode: Yup.string()
      .required("Pincode is required")
      .matches(/^\d{6}$/, "Pincode must be a 6-digit number"),
  });

  const handleSubmit = async (values) => {
    const token = Cookies.get("token");
    const headers = { Authorization: `Bearer ${token}` };
    let response;
    if (addressId) {
      response = await patchData(
        { ...values },
        `/users/editUserAddress?_id=${addressId}`,
        {
          headers,
        }
      );
      
    } else {
      response = await postData(
        { username, ...values },
        `/users/userAddress?username=${username}`,
        {
          headers,
        }
      );
    }

    navigate("/viewAllAddress");

    if (response.data.success) {
      toast.success("Data stored successfully");
    } else {
      toast.error(response.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      addressLine1: "",
      addressLine2: "",
      landmark: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
    },
    validationSchema: AddressSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: handleSubmit,
  });

  const handleCountryChange = (e) => {
    formik.values.country = e.target.value;
    formik.values.state = "";
    formik.values.city = "";
    setSelectedCountry(e.target.value);
    setStates(State.getStatesOfCountry(e.target.value));
    setTag(tag + 1);
    formik.setFieldValue("country", e.target.value);
  };

  const handlestateChange = (e) => {
    formik.values.state = e.target.value;
    formik.values.city = "";
    setSelectedState(e.target.value);
    setCities(City.getCitiesOfState(selectedCountry, e.target.value));
    formik.setFieldValue("state", e.target.value);
  };

  const handleCityChange = (e) => {
    formik.setFieldValue("city", e.target.value);
  };

  const fetchAddressDetails = async () => {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };
      let response = await axios.get(
        `${url}/users/getAddressToEdit?_id=${addressId}`,
        { headers }
      );
      const resultData = response.data.result;
      formik.setValues({
        addressLine1: resultData.addressLine1,
        addressLine2: resultData.addressLine2,
        landmark: resultData.landmark,
        pincode: resultData.pincode,
        country: resultData.country,
        state: resultData.state,
        city: resultData.city,
      });

      setSelectedCountry(resultData.country);

      setStates(State.getStatesOfCountry(resultData.country));
      setSelectedState(resultData.state);

      setCities(City.getCitiesOfState(resultData.country, resultData.state));

      setIsLoading(false)
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (addressId) {
      setIsLoading(true)
      fetchAddressDetails();
    }
  }, []);
  return (


    isLoading ?
       <Loader /> :
    
    <>
      {/* Header section */}
      <Header />

      {/* Breadcrumbs section */}
      <Breadcrumb title={addressId ? "Edit Address" : "Add Address"} />

      {/* Add Address section */}
      <div className="form-container">
        <form onSubmit={formik.handleSubmit}>
          <div className="input-group">
            <label htmlFor="addressLine1">Address Line 1</label><label className="compulsory__fill">*</label>
            <input
              id="addressLine1"
              name="addressLine1"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.addressLine1}
              placeholder="Address Line 1"
            />
            {formik.touched.addressLine1 && formik.errors.addressLine1 ? (
              <div className="error">{formik.errors.addressLine1}</div>
            ) : null}
          </div>

          <div className="input-group">
            <label htmlFor="addressLine2">Address Line 2</label><label className="compulsory__fill">*</label>
            <input
              id="addressLine2"
              name="addressLine2"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.addressLine2}
              placeholder="Address Line 2"
            />
            {formik.touched.addressLine2 && formik.errors.addressLine2 ? (
              <div className="error">{formik.errors.addressLine2}</div>
            ) : null}
          </div>

          <div className="input-group">
            <label htmlFor="landmark">Landmark</label>
            <input
              id="landmark"
              name="landmark"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.landmark}
              placeholder="Landmark"
            />
            {formik.touched.landmark && formik.errors.landmark ? (
              <div className="error">{formik.errors.landmark}</div>
            ) : null}
          </div>

          <div className="input-group">
            <label htmlFor="pincode">Pincode</label><label className="compulsory__fill">*</label>
            <input
              id="pincode"
              name="pincode"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.pincode}
              placeholder="Pincode"
            />
            {formik.touched.pincode && formik.errors.pincode ? (
              <div className="error">{formik.errors.pincode}</div>
            ) : null}
          </div>

          <div className="select-box">
            <div className="select-country">
              <select
                className="form-select"
                onChange={handleCountryChange}
                value={formik.values.country}
                onBlur={formik.handleBlur}
              >
                <option value="">Select country</option><label className="compulsory__fill">*</label>
                {countries.map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </select>
              {formik.touched.country && formik.errors.country ? (
                <div className="error-select-box">{formik.errors.country}</div>
              ) : null}
            </div>

            <div className="select-state">
              <select
                disabled={!selectedCountry}
                className="form-select"
                onChange={handlestateChange}
                value={formik.values.state}
                onBlur={formik.handleBlur}
              >
                <option value="">Select state</option><label className="compulsory__fill">*</label>
                {states.map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </select>
              {formik.touched.state && formik.errors.state ? (
                <div className="error-select-box">{formik.errors.state}</div>
              ) : null}
            </div>

            <div className="select-city">
              <select
                disabled={!selectedState}
                className="form-select"
                onChange={handleCityChange}
                value={formik.values.city}
                onBlur={formik.handleBlur}
              >
                <option value="">Select city</option><label className="compulsory__fill">*</label>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
              {formik.touched.city && formik.errors.city ? (
                <div className="error-select-box">{formik.errors.city}</div>
              ) : null}
            </div>
          </div>
          {/* <input type="submit" /> */}
          <button type="submit" className="submit-btn">
            Save
          </button>
        </form>
      </div>

      {/* Footer section */}
      <Footer />
    </>
  );
}

export default AddAddressPage;
