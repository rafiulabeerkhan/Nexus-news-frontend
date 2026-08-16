import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useNews from "../../../hooks/useNews";
import { CalendarDays, ArrowRight, Newspaper } from "lucide-react";
import { getImageUrl } from "../../../utils/getImageUrl";
import { formatDate } from "../../../utils/dateConverter";
const NewsPage = () => {
  const { slug } = useParams();
  const { getAllNews } = useNews();

  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const res = await getAllNews({
        page: 1,
        limit: 20,
        categorySlug: slug,
      });

      if (res.success) {
        console.log(res.data.data);
        setNews(res.data.data);
      }
    };

    fetchNews();
  }, [slug]);

  const featuredNews = news[0];
  const remainingNews = news.slice(1);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-5 py-12">
          <div className="flex items-center gap-3">
            <Newspaper className="text-red-600" size={30} />

            <h1 className="text-4xl font-bold capitalize">
              {slug?.replace("-", " ")}
            </h1>
          </div>

          <p className="text-gray-500 mt-2">
            Latest news, updates and stories.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-10">
        {/* Featured */}
        {featuredNews && (
          <Link to={`/news/${featuredNews.slug}`} className="group block mb-12">
            <div className="grid lg:grid-cols-2 gap-8 bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition">
              <img
                src={getImageUrl(featuredNews.thumbnail)}
                alt={featuredNews.thumbnailAlt}
                className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-500"
              />

              <div className="p-8 flex flex-col justify-center">
                <span className="bg-red-600 text-white px-4 py-1 rounded-full w-fit text-sm">
                  Featured
                </span>

                <h2 className="text-4xl font-bold mt-5 group-hover:text-red-600 transition">
                  {featuredNews.title}
                </h2>

                <p className="text-gray-600 mt-5 leading-8">
                  {featuredNews.summary}
                </p>

                <div className="flex items-center gap-2 text-gray-500 mt-6">
                  <CalendarDays size={18} />
                  {formatDate(featuredNews.createdAt)}
                </div>

                <div className="flex items-center gap-2 text-red-600 font-semibold mt-8">
                  Read Full Story
                  <ArrowRight size={18} />
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* News Grid */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {remainingNews.map((item) => (
            <Link
              key={item.id}
              to={`/news/${item.slug}`}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition duration-300 group"
            >
              <div className="overflow-hidden">
                <img
                  src={getImageUrl(item.thumbnail)}
                  alt={item.thumbnailAlt}
                  className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold line-clamp-2 group-hover:text-red-600 transition">
                  {item.title}
                </h3>

                <p className="text-gray-600 mt-3 line-clamp-3">
                  {item.summary}
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-500 mt-5">
                  <CalendarDays size={16} />
                  {formatDate(item.createdAt)}
                </div>

                <button className="mt-5 flex items-center gap-2 text-red-600 font-semibold">
                  Read More
                  <ArrowRight size={16} />
                </button>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}

        {news.length === 0 && (
          <div className="text-center py-32">
            <Newspaper size={60} className="mx-auto text-gray-400" />

            <h2 className="text-2xl font-bold mt-5">No News Found</h2>

            <p className="text-gray-500 mt-2">
              There are no news articles available in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
