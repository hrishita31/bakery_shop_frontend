import axios from "axios";

const url = import.meta.env.VITE_API_URL;

const getData = async (endpoint) => {
  try {
    const response = await axios.get(`${url}${endpoint}`);
    // const result = response.data;
    //     console.log(result, 345);
    // console.log(response, 678);
    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 202 ||
      response.status === 203 ||
      response.status === 204
    ) {
      return {
        success: true,
      };
    } else {
      console.log(response, 678)
      return {
       
        success: false,
        message: response.data.message || "Could not fetch",
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
