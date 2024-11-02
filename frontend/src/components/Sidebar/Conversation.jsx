import { useNavigate } from "react-router-dom";
import { useSocketContext } from "../../context/SocketConnection";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  // const { getProfile } = useProfile();
  const { onlineUsers } = useSocketContext();
  const isSelected = selectedConversation?._id === conversation._id;
  const isOnline = onlineUsers.includes(conversation._id);
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded py-1 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : "offline"} `}>
          <div className="w-12 rounded-full">
            <img
              onClick={(e) => {
                e.stopPropagation(); // Prevents triggering `setSelectedConversation`
                navigate(`/profile/${conversation._id}`);
              }}
              src={conversation.profilePic}
              alt="user avatar"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
