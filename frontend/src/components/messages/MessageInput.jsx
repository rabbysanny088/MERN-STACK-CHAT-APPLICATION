import { useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { sendMessage, loading } = useSendMessage();
  const textAreaRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    // Adjust height based on content
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"; // Reset height
      textAreaRef.current.style.height = `${Math.min(
        200,
        textAreaRef.current.scrollHeight
      )}px`; // Set new height
    }
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <textarea
          ref={textAreaRef}
          className="border text-sm rounded-lg block w-full  p-2.5 bg-gray-700 border-gray-600 text-white resize-none overflow-y-auto"
          placeholder="Send a message"
          value={message}
          onChange={handleInputChange}
          style={{ height: "auto" }} // Allows dynamic height adjustment
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <BsSend size={25} />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
