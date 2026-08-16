import { useEffect, useState } from "react";
import { FiEdit, FiPlus, FiTrash } from "react-icons/fi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import DataTable from "../../components/DataTable";
import useNews from "../../hooks/useNews";
import { usePaginationStore } from "../../store/paginationStore";
import { formatDate } from "../../utils/dateConverter";
import { useNavigate } from "react-router-dom";
const AllNews = () => {
  const { getAllNews, deleteNews } = useNews();

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const { page, limit, search, setTotalData } = usePaginationStore();
  const navigate = useNavigate();
  const HEADER_CONFIG = {
    title: "News",
    searchPlaceholder: "Search News...",
  };

  const TABLE_HEAD = [
    "SL",
    "Title",
    "Category",
    "Author",
    "Status",
    "Featured",
    "Breaking",
    "Created At",
    "Action",
  ];

  const COLUMN_MAPPING = {
    Title: "title",
    Category: "category",
    Author: "author",
    Status: "status",
    Featured: "featured",
    Breaking: "breaking",
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
        navigate(`/dashboard/news/create/${row.original.id}`);
      },
    },
    {
      label: "Delete",
      icon: (
        <FiTrash className="w-5 h-5 text-danger hover:text-danger-hover transition" />
      ),
      show: () => true,
      onClick: (row) => handleDeleteNews(row.id),
    },
  ];

  const fetchNews = async () => {
    setLoading(true);

    try {
      const res = await getAllNews({
        page,
        limit,
        search,
      });

      if (res.success) {
        const formatted = res.data.data.map((item) => ({
          ...item,
          category: item.category?.name ?? "-",
          author: item.author?.name ?? "-",
          featured: item.isFeatured ? "Yes" : "No",
          breaking: item.isBreaking ? "Yes" : "No",
          createdAt: formatDate(item.createdAt),
          original: item,
        }));

        setNews(formatted);
        setTotalData(res.data.total);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [page, limit, search]);

  const handleCreate = () => {
    navigate("/dashboard/news/create");
  };

const handleDeleteNews = async (id) => {
    const result = await Swal.fire({
      title: "Delete News?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    const res = await deleteNews(id);

    if (res.success) {
      toast.success(res.message);
      fetchNews();
    } else {
      toast.error(res.message);
    }
  };


  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">News Management</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage all your articles from one place</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 py-2.5 px-5 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <FiPlus className="text-xl" />
          <span className="text-sm font-semibold tracking-wide">Create News</span>
        </button>
      </div>

      <DataTable
        headerConfig={HEADER_CONFIG}
        tableHead={TABLE_HEAD}
        tableData={news}
        loading={loading}
        columnMapping={COLUMN_MAPPING}
        actionButtonsConfig={ACTION_BUTTONS}
      />
    </div>
  );
};

export default AllNews;
