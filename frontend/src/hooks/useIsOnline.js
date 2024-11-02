import { useSocketContext } from "../context/SocketConnection";
import useConversation from "../zustand/useConversation";

const useIsOnline = () => {
  const { onlineUsers } = useSocketContext();
  const { selectedConversation } = useConversation();

  // Function to check if the selected conversation is online
  const isOnline = () => {
    return (
      selectedConversation && onlineUsers.includes(selectedConversation._id)
    );
  };

  return { isOnline };
};

export default useIsOnline;
