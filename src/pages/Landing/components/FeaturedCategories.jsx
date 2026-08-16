import { useState, useEffect } from "react";
import useNews from "../../../hooks/useNews";
import { getImageUrl } from "../../../utils/getImageUrl";
import { formatDate } from "../../../utils/dateConverter";

export default function FeaturedCategories() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getAllNews } = useNews();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const res = await getAllNews({ limit: 5 });
      if (res.success && res.data.data.length > 0) {
        setNewsList(res.data.data);
      }
      setLoading(false);
    };
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px] mt-10 md:mt-16 max-w-7xl mx-auto">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const data = newsList;
  if (data.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 md:mt-16 max-w-7xl mx-auto px-6 md:px-8 z-10 relative">
      {/* LEFT BIG NEWS */}
      <div className="md:col-span-2 space-y-4">
        {data[0] && (
          <div className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer">
            <img
              src={data[0].thumbnail ? getImageUrl(data[0].thumbnail) : data[0].image}
              className="w-full h-[320px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 p-5 w-full text-white pointer-events-none">
              <h2 className="text-xl font-bold group-hover:text-primary-300 transition-colors">{data[0].title}</h2>
              <p className="text-sm mt-1 text-slate-300">{formatDate(data[0].createdAt)}</p>
            </div>
          </div>
        )}

        {/* SECOND BIG CARD */}
        {data[1] && (
          <div className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer">
            <img
              src={data[1].thumbnail ? getImageUrl(data[1].thumbnail) : data[1].image}
              className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 p-4 w-full text-white pointer-events-none">
              <h2 className="text-lg font-semibold group-hover:text-primary-300 transition-colors">{data[1].title}</h2>
              <p className="text-xs mt-1 text-slate-300">{formatDate(data[1].createdAt)}</p>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT SMALL LIST */}
      <div className="space-y-4">
        {data.slice(2).map((news, i) => (
          <div
            key={i}
            className="flex gap-4 bg-white rounded-xl shadow-sm p-3 hover:shadow-md transition group cursor-pointer border border-slate-100"
          >
            <img
              src={news.thumbnail ? getImageUrl(news.thumbnail) : news.image}
              className="w-24 h-24 object-cover rounded-lg shrink-0"
            />
            <div className="flex flex-col justify-center">
              <h3 className="text-sm font-semibold line-clamp-2 text-slate-800 group-hover:text-primary-600 transition-colors">
                {news.title}
              </h3>
              <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                {formatDate(news.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
