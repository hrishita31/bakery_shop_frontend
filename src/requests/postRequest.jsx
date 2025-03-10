import axios from "axios";

const url = import.meta.env.VITE_API_URL;
const postData = async (values, endpoint, headers) => {
  try {
    const response = await axios.post(
      `${url}${endpoint}`,
      {
        ...values,
      },
      headers
    );

    console.log(response, 890);

    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 202 ||
      response.status === 203 ||
      response.status === 204
    ) {
      return {
        success: true,
        data: response.data,
        message: response.data.message || "request successful",
      };
    } else {
      return {
        success: false,
        data: null,
        message: response.data.message || "something went wrong",
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || "An error occurred.",
    };
  }
};

export default postData;
