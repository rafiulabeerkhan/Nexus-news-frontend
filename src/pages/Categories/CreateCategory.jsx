import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CustomModal from "../../components/CustomModal";
import useCategory from "../../hooks/useCategory";
const CreateCategory = ({ open, setOpen, selectedCategory, onSuccess }) => {
  const { createCategory, updateCategory } = useCategory();

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    isActive: true,
  });

  useEffect(() => {
    if (selectedCategory) {
      setFormData({
        name: selectedCategory.name || "",
        slug: selectedCategory.slug || "",
        description: selectedCategory.description || "",
        isActive: selectedCategory.isActive,
      });
    } else {
      setFormData({
        name: "",
        slug: "",
        description: "",
        isActive: true,
      });
    }
  }, [selectedCategory, open]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Category name is required.");
      return;
    }
    if (!formData.slug.trim()) {
      toast.error("Category slug is required.");
      return;
    }

    let res;

    if (selectedCategory) {
      res = await updateCategory(selectedCategory.id, formData);
    } else {
      res = await createCategory(formData);
      console.log("create category response", res);
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
      header={selectedCategory ? "Edit Category" : "Create Category"}
      width="w-[90vw] sm:w-[40vw]"
      closedBy="escape"
    >
      <div className="space-y-5">
        {/* Name */}
        <div>
          <label className="block mb-2 text-sm font-semibold">
            Category Name
          </label>

          <input
            className="w-full rounded-xl border px-4 py-3"
            placeholder="Enter category name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-semibold">
            Category Slug
          </label>

          <input
            className="w-full rounded-xl border px-4 py-3"
            placeholder="Enter category slug"
            value={formData.slug}
            onChange={(e) =>
              setFormData({
                ...formData,
                slug: e.target.value,
              })
            }
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 text-sm font-semibold">
            Description
          </label>

          <textarea
            rows={4}
            className="w-full rounded-xl border px-4 py-3"
            placeholder="Enter category description"
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
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
            {selectedCategory ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default CreateCategory;
