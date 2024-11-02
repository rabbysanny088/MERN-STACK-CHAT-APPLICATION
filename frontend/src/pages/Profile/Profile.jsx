import { Link } from "react-router-dom";
import { useSocketContext } from "../../context/SocketConnection";
import useProfile from "../../hooks/useProfile";

const Profile = () => {
  const { loading, profile } = useProfile();

  const { onlineUsers } = useSocketContext();

  const isOnline = profile && onlineUsers.includes(profile._id);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        {loading ? (
          <div className="flex items-center justify-center p-6">
            <p className="text-lg text-black flex items-center justify-center gap-2">
              {" "}
              <span className="loading loading-spinner"></span>
              <span> Profile loading...</span>
            </p>
          </div>
        ) : profile ? (
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div
                className={`avatar w-24 h-24 rounded-full border-4 text-white shadow-lg ${
                  isOnline ? "online" : "offline"
                } `}
              >
                <img
                  src={profile.profilePic}
                  alt={`${profile.fullName}'s profile`}
                />
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-semibold text-white">
                  {profile.fullName}
                </h2>
                <p className="text-white">@{profile.username}</p>
              </div>
            </div>
            <div className="mt-4 w-full p-6 rounded-lg shadow-lg bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
              <h3 className="text-lg font-medium text-white mb-2 ">
                Profile Details
              </h3>
              <div className="list-disc list-inside">
                <p>
                  <span className="text-[16px] font-light">fullName:</span>{" "}
                  <span className="text-[16px] font-bold text-white">
                    {profile.fullName}
                  </span>
                </p>
                <p>
                  <span>username:</span>{" "}
                  <span className="text-[16px] font-bold text-white">
                    {profile.username}
                  </span>
                </p>
                <p>
                  <span>Created</span>:{" "}
                  <span className="text-[16px] font-bold text-white">
                    {formatDateTime(profile.createdAt)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center p-6">
            <p className="text-lg text-gray-500">No profile data available.</p>
          </div>
        )}
        <div>
          <Link
            to="/"
            className="w-full p-2 rounded-lg shadow-xl bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 text-white font-medium cursor-pointer  transition duration-300"
          >
            Back to chat
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
