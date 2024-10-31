import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";

const SocketContext = createContext();

// hooks
export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socketInstance = io(
        "https://mern-stack-chat-application-39kx.onrender.com",
        {
          query: {
            userId: authUser._id,
          },
        }
      );
      setSocket(socketInstance);

      socketInstance.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // Cleanup on component unmount
      return () => socketInstance.close();
    } else {
      if (socket) {
        socket?.close();
        setSocket(null);
      }
    }
  }, [authUser]); // Remove `socket` from dependency array

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
