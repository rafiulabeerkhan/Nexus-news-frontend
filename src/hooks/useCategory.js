import api from "../config/api";
const useCategory = () => {
  const getAllCategories = async ({ page = 1, limit = 10, search = "" }) => {
    try {
      const res = await api.get("/api/category/getCategories", {
        params: {
          page,
          limit,
          search,
        },
      });

      if (res.status !== 200) {
        return {
          success: false,
          message: "Failed to fetch categories.",
        };
      }

      return {
        success: true,
        data: res.data,
      };
    } catch (error) {
      console.error("Get Categories Error:", error);

      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong while fetching categories.",
      };
    }
  };

  const createCategory = async (payload) => {
    try {
      const res = await api.post("/api/category/createCategory", payload);

      return {
        success: true,
        data: res.data.data,
        message: res.data.message || "Category created successfully.",
      };
    } catch (error) {
      console.error("Create Category Error:", error);

      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong while creating category.",
      };
    }
  };

  // Delete Category
  const deleteCategory = async (id) => {
    try {
      const res = await api.delete(`/api/category/deleteCategory/${id}`);

      if (res.status !== 200) {
        return {
          success: false,
          message: "Failed to delete category.",
        };
      }

      return {
        success: true,
        message: res.data.message,
      };
    } catch (error) {
      console.error("Delete Category Error:", error);

      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong while deleting category.",
      };
    }
  };
  
  const updateCategory = async (id, payload) => {
    try {
      const res = await api.put(`/api/category/updateCategory/${id}`, payload);

      return {
        success: true,
        data: res.data.data,
        message: res.data.message || "Category updated successfully.",
      };
    } catch (error) {
      console.error("Update Category Error:", error);

      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong while updating category.",
      };
    }
  };
  return {
    getAllCategories,
    deleteCategory,
    createCategory,
    updateCategory,
  };
};
export default useCategory;
