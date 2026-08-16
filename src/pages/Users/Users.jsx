import { useEffect, useState } from "react";
import { FiEdit, FiGitCommit, FiTrash } from "react-icons/fi";
import DataTable from "../../components/DataTable";
import { usePaginationStore } from "../../store/paginationStore";
import { formatDate } from "../../utils/dateConverter";
import useUsers from "../../hooks/useUsers";
import CreateUsers from "./CreateUsers";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
const Users = () => {
  const { getAllUsers, deleteUser } = useUsers();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState(null);
  const { page, limit, search, setTotalData } = usePaginationStore();

  const HEADER_CONFIG = {
    title: "Users",
    searchPlaceholder: "Search User...",
  };

  const TABLE_HEAD = [
    "SL",
    "Name",
    "Username",
    "Role",
    "Contact",
    "Status",
    "Created At",
    "Action",
  ];

  const COLUMN_MAPPING = {
    Name: "name",
    Username: "userName",
    Role: "role",
    Contact: "contact",
    Status: "status",
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
        setSelectedUsers(row);
        setOpenModal(true);
      },
    },
    {
      label: "Delete",
      icon: (
        <FiTrash className="w-5 h-5 text-danger hover:text-danger-hover transition" />
      ),
      show: () => true,
      onClick: (row) => handleDeleteUser(row.id),
    },
  ];

  const fetchUsers = async () => {
    setLoading(true);

    const res = await getAllUsers({
      page,
      limit,
      search,
    });

    if (res.success) {
      const formatted = res.data.data.map((item) => ({
        ...item,
        status: item.isActive ? "Active" : "Inactive",
        createdAt: formatDate(item.createdAt),
      }));

      setUsers(formatted);
      setTotalData(res.data.pagination.total);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [page, limit, search]);

  const handleCreate = () => {
    setSelectedUsers(null);
    setOpenModal(true);
  };

  const handleDeleteUser = async (id) => {
    const result = await Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    const res = await deleteUser(id);

    if (res.success) {
      toast.success(res.message);
      fetchUsers();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 py-2 px-4 border border-primary-200 bg-navbar-bg text-text rounded-md hover:bg-primary-50 transition"
        >
          <FiGitCommit className="text-primary-600" />
          <span className="text-sm font-medium">Create User</span>
        </button>
      </div>

      <DataTable
        headerConfig={HEADER_CONFIG}
        tableHead={TABLE_HEAD}
        tableData={users}
        loading={loading}
        columnMapping={COLUMN_MAPPING}
        actionButtonsConfig={ACTION_BUTTONS}
      />
      <CreateUsers
        open={openModal}
        setOpen={setOpenModal}
        selectedUser={selectedUsers}
        onSuccess={fetchUsers}
      />
    </div>
  );
};

export default Users;
