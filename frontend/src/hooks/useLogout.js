import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    try {
      const { data } = await axios.post("/api/auth/logout");
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("chat-user");
      setAuthUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(
        error.response?.data?.error ||
          "An unexpected error occurred. Kindly try later!"
      );
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};

export default useLogout;
