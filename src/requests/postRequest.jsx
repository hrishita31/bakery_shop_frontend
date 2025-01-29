import axios from "axios";

const url = import.meta.env.VITE_API_URL;
const postData = async (values, endpoint) => {
  // console.log(values);
  try {
    const response = await axios.post(`${url}${endpoint}`, {
      ...values
    // value:values
    });
    if (response.status === 200 || response.status === 201 || response.status === 202 || response.status === 203 || response.status === 204) {
        localStorage.setItem("token", response.data.token);
      return { success: true };
    } else {
      return {
        success: false,
        message: response.data.message || "Invalid credentials",
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "An error occurred.",
    };
  }
};

export default postData;
