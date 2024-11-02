import { useEffect } from "react";
import { TiMessages } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketConnection";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const navigate = useNavigate();
  const isOnline =
    selectedConversation && onlineUsers.includes(selectedConversation._id);

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-4 mb-2 flex items-center gap-2">
            <div className={`avatar ${isOnline ? "online" : "offline"} `}>
              <div className="w-12 rounded-full">
                <img
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/profile/${selectedConversation._id}`);
                  }}
                  src={selectedConversation.profilePic}
                  className="cursor-pointer"
                  alt="user avatar"
                />
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex gap-3 justify-between">
                <p className="font-bold text-gray-200">
                  {selectedConversation.fullName}
                </p>
              </div>
            </div>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="flex items-center justify-center w-full h-full ">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>{`Welcome 👋 ${authUser.username} ❄`}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
