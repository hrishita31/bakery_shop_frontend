import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { IconSend2 } from "@tabler/icons-react";

function ChatWithUsPage() {
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]); // Store multiple responses
  const [loading, setLoading] = useState(false);

  const url = import.meta.env.VITE_API_URL;
  const token = Cookies.get("token");
  const headers = { Authorization: `Bearer ${token}` };

  const sendMessage = async () => {
    if (!message.trim()) {
      alert("Please enter a message!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${url}/users/chat`, { message }, { headers });

      const results = Array.isArray(res.data.result) ? res.data.result : [res.data.result];

      setResponses(results);
    } catch (err) {
      console.error("Error sending message:", err);
      setResponses(["Failed to send message."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="user__chat__space">
        <input
          className="user__message"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
        />
        <button className="send__message" onClick={sendMessage} disabled={loading}>
          {loading ? "..." : <IconSend2 size={25} />}
        </button>
      </div>

      <div className="chat__response">
        {responses.map((response, index) => (
          <p key={index}>{response}</p>
        ))}
      </div>
    </>
  );
}

export default ChatWithUsPage;
