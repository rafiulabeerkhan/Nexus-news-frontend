import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CustomModal from "../../components/CustomModal";
import useUsers from "../../hooks/useUsers";

const CreateUsers = ({ open, setOpen, selectedUser, onSuccess }) => {
  const { createUser, updateUser } = useUsers();

  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    password: "",
    role: "REPORTER",
    contact: "",
    isActive: true,
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        name: selectedUser.name || "",
        userName: selectedUser.userName || "",
        password: "",
        role: selectedUser.role || "REPORTER",
        contact: selectedUser.contact || "",
        isActive: selectedUser.isActive,
      });
    } else {
      setFormData({
        name: "",
        userName: "",
        password: "",
        role: "REPORTER",
        contact: "",
        isActive: true,
      });
    }
  }, [selectedUser, open]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Name is required.");
      return;
    }

    if (!formData.userName.trim()) {
      toast.error("Username is required.");
      return;
    }

    if (!selectedUser && !formData.password.trim()) {
      toast.error("Password is required.");
      return;
    }

    let res;

    if (selectedUser) {
      const payload = { ...formData };

      if (!payload.password) {
        delete payload.password;
      }

      res = await updateUser(selectedUser.id, payload);
    } else {
      res = await createUser(formData);
    }

    if (res.success) {
      toast.success(res.message);
      handleClose();
      onSuccess();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <CustomModal
      open={open}
      setOpen={handleClose}
      header={selectedUser ? "Edit User" : "Create User"}
      width="w-[90vw] sm:w-[40vw]"
      closedBy="escape"
    >
      <div className="space-y-5">
        {/* Name */}
        <div>
          <label className="block mb-2 text-sm font-semibold">Full Name</label>

          <input
            className="w-full rounded-xl border px-4 py-3"
            placeholder="Enter full name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />
        </div>

        {/* Username */}
        <div>
          <label className="block mb-2 text-sm font-semibold">Username</label>

          <input
            className="w-full rounded-xl border px-4 py-3"
            placeholder="Enter username"
            value={formData.userName}
            onChange={(e) =>
              setFormData({
                ...formData,
                userName: e.target.value,
              })
            }
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-2 text-sm font-semibold">Password</label>

          <input
            type="password"
            className="w-full rounded-xl border px-4 py-3"
            placeholder={
              selectedUser
                ? "Leave blank to keep current password"
                : "Enter password"
            }
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
          />
        </div>

        {/* Role */}
        <div>
          <label className="block mb-2 text-sm font-semibold">Role</label>

          <select
            className="w-full rounded-xl border px-4 py-3"
            value={formData.role}
            onChange={(e) =>
              setFormData({
                ...formData,
                role: e.target.value,
              })
            }
          >
            <option value="MODERATOR">MODERATOR</option>
            <option value="REPORTER">REPORTER</option>
          </select>
        </div>

        {/* Contact */}
        <div>
          <label className="block mb-2 text-sm font-semibold">Contact</label>

          <input
            className="w-full rounded-xl border px-4 py-3"
            placeholder="Enter contact number"
            value={formData.contact}
            onChange={(e) =>
              setFormData({
                ...formData,
                contact: e.target.value,
              })
            }
          />
        </div>

        {/* Status */}
        <div className="flex items-center gap-3">
          <input
            id="isActive"
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) =>
              setFormData({
                ...formData,
                isActive: e.target.checked,
              })
            }
          />

          <label htmlFor="isActive" className="text-sm font-medium">
            Active
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-3">
          <button
            onClick={handleClose}
            className="rounded-xl border px-5 py-2.5 font-semibold"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-xl bg-primary-600 px-5 py-2.5 text-white font-semibold"
          >
            {selectedUser ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default CreateUsers;
