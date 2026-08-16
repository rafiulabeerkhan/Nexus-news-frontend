import { FaNewspaper, FaFolderPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
   const navigate = useNavigate();
  const actions = [
    {
      title: "Create News",
      icon: <FaNewspaper />,
      path: "/dashboard/news/create",
    },
    {
      title: "Add Category",
      icon: <FaFolderPlus />,
      path: "/dashboard/categories",
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-5">
      <h2 className="text-xl font-bold mb-5">Quick Actions</h2>

      <div className="space-y-4">
        {actions.map((item, index) => (
          <button
            key={index}
            className="w-full flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg"
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
