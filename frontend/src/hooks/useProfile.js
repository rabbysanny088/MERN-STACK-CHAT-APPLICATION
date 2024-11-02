import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const useProfile = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null); // Changed to `null` to handle a single object
  const { id } = useParams();

  const getProfile = async (userId) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/users/profile/${userId}`);
      if (res.data.error) {
        throw new Error(res.data.error);
      }
      setProfile(res.data);
    } catch (error) {
      console.error("getProfile error:", error);
      toast.error(
        error.response?.data?.error ||
          "An unexpected error occurred. Kindly try later!"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getProfile(id); // Fetch the profile when `id` is available from URL
    }
  }, [id]);

  return { getProfile, loading, profile };
};

export default useProfile;
