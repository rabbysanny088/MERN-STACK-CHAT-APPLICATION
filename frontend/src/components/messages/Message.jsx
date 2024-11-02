import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
const Message = ({ message }) => {
  const navigate = useNavigate();

  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const formattedTime = extractTime(message.createdAt);
  const shakeClass = message.shouldShake ? "shake" : "";
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full cursor-pointer">
          <img
            src={profilePic}
            alt="No image"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/profile/${selectedConversation._id}`);
            }}
          />
        </div>
      </div>
      <div
        className={`flex flex-col chat-bubble text-white ${bubbleBgColor} ${shakeClass} max-w-xs pb-2 break-words`}
      >
        {message.message}
      </div>

      <div className={`chat-footer opacity-50 text-xs flex gap-1 items-center`}>
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
