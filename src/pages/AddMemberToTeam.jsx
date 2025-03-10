import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";

export const acceptTeamMember = async (memberId, setAllMembers) => {
  const url = import.meta.env.VITE_API_URL;
  const token = Cookies.get("token");
  console.log(token);
  const headers = { Authorization: `Bearer ${token}` };
  console.log(headers);

  try {
    const response = await axios.post(
      `${url}/teams/addToTeam?_id=${memberId}`,
      {
        headers,
      }
    );

    if (response.statusText === "OK") {
      toast.success("Successfully added the new chef");
      setAllMembers((prev) => prev.filter((member) => member._id !== memberId));
    } else {
      toast.error(response.message);
    }
  } catch {
    toast.error("Error handling member");
  }
};

export default acceptTeamMember;
