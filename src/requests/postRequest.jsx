import axios from "axios";
// import Cookies from "js-cookie";

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
      // localStorage.setItem("token", response.data.token);
//       const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzljNzFmMGNmNTc3MjE5YWZiM2M5YTgiLCJ1c2VybmFtZSI6ImhldHZpMDQxIiwiaWF0IjoxNzM4MzA2MDQ4LCJleHAiOjE3Mzg0Nzg4NDh9.ELiGfS73AM0NQgDZ5H5rycvkTAjMnahAIEWkcOdO2jY';
// Cookies.set('token', token, { expires: 7, secure: true });
// const token = Cookies.get('token');
// console.log(token);
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
