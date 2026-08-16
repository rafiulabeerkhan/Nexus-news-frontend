import { useState } from "react";
import api from "../config/api";

const useRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const register = async ({
    name,
    email,
    password,
    role,
    contact,
    address,
    gender,
    mode,
  }) => {
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/api/auth/register", {
        name,
        email,
        password,
        role,
        contact,
        address,
        gender,
        mode,
      });

      return {
        success: true,
        data: res.data,
      };
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Registration failed";

      setError(message);

      return {
        success: false,
        data: err.response?.data,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    loading,
    error,
  };
};

export default useRegistration;