import api from "../config/api";

const useDashboard = () => {
  const getDashboard = async () => {
    try {
      const res = await api.get("/api/dashboard/getDashboard");

      return {
        success: true,
        data: res.data.data,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch dashboard.",
      };
    }
  };

  return {
    getDashboard,
  };
};

export default useDashboard;