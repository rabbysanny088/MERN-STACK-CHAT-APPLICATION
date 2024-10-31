import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `/api/messages/send/${selectedConversation._id}`,
        { message }
      );
      setMessages([...messages, data]);
      if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("sendMessages error:", error);
      toast.error(
        error.response?.data?.error ||
          "An unexpected error occurred. Kindly try later!"
      );
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessage };
};

export default useSendMessage;
