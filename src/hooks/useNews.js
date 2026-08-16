import api from "../config/api";
const useNews = () => {
  const getAllNews = async ({
    page = 1,
    limit = 10,
    search = "",
    categorySlug  = "",
  }) => {
    try {
      const res = await api.get("/api/news/getNews", {
        params: {
          page,
          limit,
          search,
          categorySlug ,
        },
      });

      return {
        success: true,
        data: res.data,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong while fetching news.",
      };
    }
  };
  // const createNews = async (payload) => {
  //   try {
  //     const res = await api.post("/api/news/createNews", payload);

  //     return {
  //       success: true,
  //       data: res.data.data,
  //       message: res.data.message || "News created successfully.",
  //     };
  //   } catch (error) {
  //     console.error("Create News Error:", error);

  //     return {
  //       success: false,
  //       message:
  //         error.response?.data?.message ||
  //         error.message ||
  //         "Something went wrong while creating news.",
  //     };
  //   }
  // };
  const createNews = async (formData) => {
    try {
      const res = await api.post("/api/news/createNews", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return {
        success: true,
        data: res.data.data,
        message: res.data.message || "News created successfully.",
      };
    } catch (error) {
      console.error("Create News Error:", error);

      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong while creating news.",
      };
    }
  };

  const updateNews = async (id, payload) => {
    try {
      const res = await api.put(`/api/news/updateNews/${id}`, payload);

      return {
        success: true,
        data: res.data.data,
        message: res.data.message || "News updated successfully.",
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong while updating News.",
      };
    }
  };

  const getNewsById = async (id) => {
    try {
      const res = await api.get(`/api/news/getNewsById/${id}`);

      return {
        success: true,
        data: res.data.data,
        message: res.data.message,
      };
    } catch (error) {
      console.error("Get News By ID Error:", error);

      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong while fetching the news.",
      };
    }
  };

  // Delete News
  const deleteNews = async (id) => {
    try {
      const res = await api.delete(`/api/news/deleteNews/${id}`);

      if (res.status !== 200) {
        return {
          success: false,
          message: "Failed to delete News.",
        };
      }

      return {
        success: true,
        message: res.data.message,
      };
    } catch (error) {
      console.error("Delete News Error:", error);

      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong while deleting News.",
      };
    }
  };

  return {
    getAllNews,
    createNews,
    updateNews,
    getNewsById,
    deleteNews,
  };
};
export default useNews;
