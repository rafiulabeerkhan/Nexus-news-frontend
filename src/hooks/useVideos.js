import api from "../config/api";
const useVideos = () => {
  const getVideos = async ({ page = 1, limit = 10, search = "" } = {}) => {
    try {
      const res = await api.get("/api/videos/getVideos", {
        params: {
          page,
          limit,
          search,
        },
      });

      return {
        success: true,
        data: res.data.data.data,
        pagination: {
          total: res.data.data.total,
          page: res.data.data.page,
          limit: res.data.data.limit,
          totalPages: res.data.data.totalPages,
        },
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong while fetching videos.",
      };
    }
  };

  // Create Video
    const createVideos = async (payload) => {
      try {
        const res = await api.post("/api/videos/createVideo", payload);

        return {
          success: true,
          data: res.data.data,
          message: res.data.message || "Video created successfully.",
        };
      } catch (error) {
        console.error("Create Video Error:", error);

        return {
          success: false,
          message:
            error.response?.data?.message ||
            error.message ||
            "Something went wrong while creating video.",
        };
      }
    };

  //   // Delete Video
    const deleteVideo = async (id) => {
      try {
        const res = await api.delete(`/api/videos/deleteVideo/${id}`);

        if (res.status !== 200) {
          return {
            success: false,
            message: "Failed to delete video.",
          };
        }

        return {
          success: true,
          message: res.data.message,
        };
      } catch (error) {
        console.error("Delete Video Error:", error);

        return {
          success: false,
          message:
            error.response?.data?.message ||
            error.message ||
            "Something went wrong while deleting video.",
        };
      }
    };

 
  return {
    getVideos,
    createVideos,
    deleteVideo,
  };
};
export default useVideos;
