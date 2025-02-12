import axios from "axios";

const url = import.meta.env.VITE_API_URL;

const deleteData = async (endpoint, headers) => {
    try {
      const response = await axios.delete(`${url}${endpoint}`, headers);
      console.log(response, 2345)
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
  
  export default deleteData;