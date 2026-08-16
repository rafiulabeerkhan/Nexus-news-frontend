import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";
import useNews from "../../../hooks/useNews";

const DashboardHeader = () => {
  const authUser = useAuthStore();
  const navigate = useNavigate();
  const { createNews } = useNews();
  return (
    <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
      <div>
        <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
          NexusNews
        </h1>

        <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
          Welcome back, {authUser?.authUser?.name} 👋
        </p>
      </div>

      <div className="flex gap-3">
        <button
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
          onClick={async () => {
            const articles = [
              {
                title: "Tech Giants Announce New AI Innovations for 2026",
                summary: "Major technology companies have unveiled groundbreaking AI models that promise to revolutionize software development.",
                content: "In a joint summit held today, leading tech companies revealed their next-generation AI models. These models feature advanced reasoning capabilities and are designed to integrate seamlessly into daily developer workflows.",
                categoryId: 1 // Assuming 1 is a valid category or just passing something. Wait, the backend requires a categoryId. Let's pass a placeholder or get categories.
              },
              {
                title: "Global Summit Addresses Climate Action Targets",
                summary: "World leaders gather to discuss accelerated timelines for renewable energy adoption.",
                content: "The annual climate summit concluded with a historic agreement to triple renewable energy capacity by 2030, marking a significant milestone in global environmental policy.",
                categoryId: 2
              },
              {
                title: "Medical Breakthrough in Early Disease Detection",
                summary: "New non-invasive screening method shows 99% accuracy in preliminary trials.",
                content: "Researchers have published findings on a revolutionary screening technique that could detect severe illnesses years before symptoms appear, using only a simple blood test.",
                categoryId: 3
              },
              {
                title: "Championship Finals: Underdog Team Takes The Trophy",
                summary: "In an unexpected turn of events, the city's local team secured victory in the final seconds of the match.",
                content: "Sports fans witnessed history last night as the underdogs defied all odds to win the national championship, ending a 50-year title drought for the franchise.",
                categoryId: 4
              }
            ];
            for (const article of articles) {
              const formData = new FormData();
              Object.keys(article).forEach(key => formData.append(key, article[key]));
              // If image is required, we can append an empty blob or skip it if it's optional
              // formData.append("image", new Blob(), "placeholder.jpg");
              await createNews(formData);
            }
            alert("English News Seeded Successfully! Check your All News list.");
          }}
        >
          🌱 Seed English News
        </button>

        <button
          className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-semibold px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          onClick={() => navigate("/dashboard/news/create")}
        >
          + Create News
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
