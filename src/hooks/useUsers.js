import api from "../config/api";
const useUsers = () => {
  const getAllUsers = async ({ page = 1, limit = 10, search = "" }) => {
    try {
      const res = await api.get("/api/users/users", {
        params: {
          page,
          limit,
          search,
        },
      });

      if (res.status !== 200) {
        return {
          success: false,
          message: "Failed to fetch users.",
        };
      }

      return {
        success: true,
        data: res.data,
      };
    } catch (error) {
      console.error("Get Users Error:", error);

      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong while fetching users.",
      };
    }
  };

  const createUser = async (payload) => {
    try {
      const res = await api.post("/api/users/createUsers", payload);

      return {
        success: true,
        data: res.data.data,
        message: res.data.message || "User created successfully.",
      };
    } catch (error) {
      console.error("Create User Error:", error);

      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong while creating user.",
      };
    }
  };

  // Delete User
  const deleteUser = async (id) => {
    try {
      const res = await api.delete(`/api/users/deleteUsers/${id}`);

      if (res.status !== 200) {
        return {
          success: false,
          message: "Failed to delete user.",
        };
      }

      return {
        success: true,
        message: res.data.message,
      };
    } catch (error) {
      console.error("Delete User Error:", error);

      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong while deleting user.",
      };
    }
  };

  //Update User
  const updateUser = async (id, payload) => {
    try {
      const res = await api.put(`/api/users/updateUsers/${id}`, payload);

      return {
        success: true,
        data: res.data.data,
        message: res.data.message || "User updated successfully.",
      };
    } catch (error) {
      console.error("Update User Error:", error);

      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong while updating user.",
      };
    }
  };
  return {
    getAllUsers,
    createUser,
    deleteUser,
    updateUser,
  };
};
export default useUsers;
