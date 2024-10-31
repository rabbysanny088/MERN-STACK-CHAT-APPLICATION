import { useEffect } from "react";
import notificationSound from "../assets/sounds/frontend_src_assets_sounds_notification.mp3";
import { useSocketContext } from "../context/SocketConnection";
import useConversation from "../zustand/useConversation";
const useListenMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMessage]);
    });
    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};

export default useListenMessage;
