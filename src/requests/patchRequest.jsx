import axios from "axios";

const url = import.meta.env.VITE_API_URL;

const patchData = async (values, endpoint) => {
  console.log({...values}, 987690)
  try {
    const response = await axios.patch(`${url}${endpoint}`, {
      ...values,
    });
    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 202 ||
      response.status === 203 ||
      response.status === 204
    ) {
    //   alert("updated");
      return {
        success:true,
        data: response.data,
        message: response.data.message || "request successful",
      };
    } else {
      return {
        success: false,
        data:null,
        message: response.data.message || "could not update",
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      data:null,
      message: error.response?.data?.message || "An error occurred.",
    };
  }
};

export default patchData;
