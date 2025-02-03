import axios from "axios";

const url = import.meta.env.VITE_API_URL;

const getData = async (values, endpoint) => {
  try {
    const response = await axios.get(`${url}${endpoint}`);
    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 202 ||
      response.status === 203 ||
      response.status === 204
    ) {
    //   alert("updated");
    const result = response.data;
        console.log(result);
      return {
        
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.data.message || "Could not update",
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

export default getData;
