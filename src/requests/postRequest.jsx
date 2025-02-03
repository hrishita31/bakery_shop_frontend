import axios from "axios";

const url = import.meta.env.VITE_API_URL;
// axios.defaults.withCredentials = true;
const postData = async (values, endpoint) => {
  try {
    // const headers = { 'Authorization': 'Bearer my-token' };
    const response = await axios.post(`${url}${endpoint}`, {
      ...values
    });
    
    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 202 ||
      response.status === 203 ||
      response.status === 204
    ) {
      return response;
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
