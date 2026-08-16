import { useEffect, useState } from "react";
import { FiEdit, FiGitCommit, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/DataTable";
import useCategory from "../../hooks/useCategory";
import { usePaginationStore } from "../../store/paginationStore";
import { formatDate } from "../../utils/dateConverter";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import CreateCategory from "./CreateCategory";

const Categories = () => {
  const navigate = useNavigate();

  const { getAllCategories, deleteCategory } = useCategory();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { page, limit, search, setTotalData } = usePaginationStore();
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const HEADER_CONFIG = {
    title: "Categories",
    searchPlaceholder: "Search Category...",
  };

  const TABLE_HEAD = [
    "SL",
    "Name",
    "Description",
    "Status",
    "News",
    "Created At",
    "Action",
  ];

  const COLUMN_MAPPING = {
    Name: "name",
    Description: "description",
    Status: "status",
    News: "newsCount",
    "Created At": "createdAt",
  };

  const ACTION_BUTTONS = [
    {
      label: "Edit",
      icon: (
        <FiEdit className="w-5 h-5 text-success hover:text-success-hover transition" />
      ),
      show: () => true,
      onClick: (row) => {
        setSelectedCategory(row);
        setOpenModal(true);
      },
    },
    {
      label: "Delete",
      icon: (
        <FiTrash className="w-5 h-5 text-danger hover:text-danger-hover transition" />
      ),
      show: () => true,
      onClick: (row) => handleDeleteCategory(row.id),
    },
  ];

  const fetchCategories = async (e) => {
    setLoading(true);

    const res = await getAllCategories({
      page,
      limit,
      search,
    });

    if (res.success) {
      const { data, total } = res.data.data;

      const formatted = data.map((item) => ({
        ...item,
        status: item.isActive ? "Active" : "Inactive",
        newsCount: item._count.news,
        createdAt: formatDate(item.createdAt),
      }));

      setCategories(formatted);
      setTotalData(total);
    }

    setLoading(false);
  };
  useEffect(() => {
    fetchCategories();
  }, [page, limit, search]);

  const handleDeleteCategory = async (id) => {
    const result = await Swal.fire({
      title: "Delete Category?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    const res = await deleteCategory(id);

    if (res.success) {
      toast.success(res.message);
      fetchCategories();
    } else {
      toast.error(res.message);
    }
  };

  const handleCreate = () => {
    setSelectedCategory(null);
    setOpenModal(true);
  };
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 py-2 px-4 border border-primary-200 bg-navbar-bg text-text rounded-md hover:bg-primary-50 transition"
        >
          <FiGitCommit className="text-primary-600" />
          <span className="text-sm font-medium">Create Category</span>
        </button>
      </div>

      <DataTable
        headerConfig={HEADER_CONFIG}
        tableHead={TABLE_HEAD}
        tableData={categories}
        loading={loading}
        columnMapping={COLUMN_MAPPING}
        actionButtonsConfig={ACTION_BUTTONS}
      />
      <CreateCategory
        open={openModal}
        setOpen={setOpenModal}
        selectedCategory={selectedCategory}
        onSuccess={fetchCategories}
      />
    </div>
  );
};

export default Categories;
