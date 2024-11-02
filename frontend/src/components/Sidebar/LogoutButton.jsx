import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext"; // Import your context
import { useSocketContext } from "../../context/SocketConnection";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { logout, loading } = useLogout();
  const navigate = useNavigate();
  const { authUser } = useAuthContext(); // Get authUser from context
  const { onlineUsers } = useSocketContext();

  const isOnline = authUser && onlineUsers.includes(authUser._id);

  return (
    <div className="mt-2">
      {" "}
      <p>Your profile</p>
      <div className="mt-auto flex items-center gap-2 divider">
        {authUser && authUser.profilePic ? (
          <div className="dropdown dropdown-top">
            <div
              tabIndex={0}
              role="button"
              className={`btn btn-ghost btn-circle avatar ${
                isOnline ? "online" : "offline"
              }`}
            >
              <div className={`w-20 rounded-full `}>
                <img alt="no image" src={authUser.profilePic} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/profile/${authUser._id}`);
                }}
              >
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                {!loading ? (
                  <>
                    <span onClick={logout}>Logout</span>
                  </>
                ) : (
                  <span className="loading loading-spinner"></span>
                )}
              </li>
            </ul>
          </div>
        ) : (
          <h1>hle</h1>
        )}
      </div>
    </div>
  );
};

export default LogoutButton;
