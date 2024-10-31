import axios from "axios";
import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `/api/messages/${selectedConversation._id}`
        );

        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        toast.error(
          error.response?.data?.error ||
            "An unexpected error occurred. Kindly try later!"
        );
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};
export default useGetMessages;
