import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";

export const deleteMember = async(memberId, setAllMembers) => {
    const url = import.meta.env.VITE_API_URL;
    const token = Cookies.get("token");
        const headers = { Authorization: `Bearer ${token}` };

    try {
        const response = await axios.post(`${url}/teams/deleteMember?_id=${memberId}`,{}, {
            headers,
        });
    
        if (response.status === 200) {
          toast.success("Successfully deleted the member");
    
          setAllMembers((prevMembers) =>
            prevMembers.filter((member) => member._id !== memberId)
          );
        } else {
          toast.error(response.data.message);
        }
      } catch{
        toast.error("Error deleting member");
      }
}

export default deleteMember;