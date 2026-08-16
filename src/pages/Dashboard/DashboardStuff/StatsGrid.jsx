import { useNavigate } from "react-router-dom";
import StatCard from "./StatCard";

const StatsGrid = ({ cards }) => {
  const navigate = useNavigate();

  if (!cards) return null;

  const stats = [
    {
      title: "Total News",
      value: cards.totalNews,
      path: "/dashboard/news",
    },
    {
      title: "Published",
      value: cards.publishedNews,
      path: "/dashboard/news",
    },
    {
      title: "Draft",
      value: cards.draftNews,
      path: "/dashboard/news",
    },
    {
      title: "Categories",
      value: cards.totalCategories,
      path: "/dashboard/news",
    },
    {
      title: "Views",
      value: cards.totalViews,
      path: "/dashboard/news",
    },
  ];

  return (
    <div
      className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5"
     
    >
      {stats.map((item, index) => (
        
        <StatCard
          key={index}
          {...item}
          onClick={() => navigate(item.path)}
         />
      ))}
    </div>
  );
};

export default StatsGrid;
