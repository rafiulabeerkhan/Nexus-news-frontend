import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useNews from "../../../hooks/useNews";
import { getImageUrl } from "../../../utils/getImageUrl";
import { formatDate } from "../../../utils/dateConverter";

function LatestNews({ id }) {
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getAllNews } = useNews();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const res = await getAllNews({ limit: 5 });
      if (res.success && res.data.data.length > 0) {
        setLatestNews(res.data.data);
      }
      setLoading(false);
    };
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px] mt-20 max-w-7xl mx-auto">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (latestNews.length === 0) return null;

  return (
    <section
      id={id}
      className="max-w-7xl mx-auto px-6 md:px-8 mt-20 scroll-mt-24"
    >
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
        📰 Latest News
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {/* LEFT BIG STORY */}
        <div className="md:col-span-2">
          <Link to={`/news/${latestNews[0].slug}`} className="block relative rounded-xl overflow-hidden shadow-lg group">
            <img
              src={getImageUrl(latestNews[0].thumbnail)}
              className="w-full h-[350px] object-cover group-hover:scale-105 transition duration-500"
              alt={latestNews[0].title}
            />

            <div className="absolute bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white w-full">
              <h2 className="text-xl font-bold group-hover:text-primary-400 transition">{latestNews[0].title}</h2>
              <p className="text-sm mt-2 line-clamp-2">{latestNews[0].summary}</p>
              <p className="text-xs mt-2 text-slate-200">
                {formatDate(latestNews[0].createdAt)}
              </p>
            </div>
          </Link>
        </div>

        {/* RIGHT LIST */}
        <div className="space-y-4">
          {latestNews.slice(1).map((news) => (
            <Link
              key={news.id}
              to={`/news/${news.slug}`}
              className="flex gap-3 bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition group"
            >
              <img
                src={getImageUrl(news.thumbnail)}
                className="w-20 h-20 object-cover rounded-md group-hover:scale-105 transition"
                alt={news.title}
              />

              <div>
                <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-primary-600 transition">
                  {news.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {formatDate(news.createdAt)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LatestNews;
