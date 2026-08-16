import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useNews from "../../../hooks/useNews";
import { getImageUrl } from "../../../utils/getImageUrl";
import { formatDate } from "../../../utils/dateConverter";

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getAllNews } = useNews();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (newsList.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % newsList.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [newsList]);

  if (loading) {
    return (
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 relative overflow-hidden z-10 flex justify-center items-center min-h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </section>
    );
  }

  const news = newsList.length > 0 ? newsList[index] : null;
  if (!news) return null;

  const fallbackImage = "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80";
  const imageSrc = news.thumbnail ? getImageUrl(news.thumbnail) : fallbackImage;

  return (
    <section id="home" className="pt-24 pb-12 md:pt-32 md:pb-16 px-4 md:px-8 relative z-10">
      <div className="max-w-7xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl min-h-[500px] md:min-h-[600px] flex items-center group">
        
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            key={news.id}
            src={imageSrc} 
            alt={news.title}
            className="w-full h-full object-cover transition-transform duration-1000 scale-105 group-hover:scale-110"
          />
          {/* Dark Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-6 md:px-16 py-12 grid md:grid-cols-12 gap-8 items-center">
          
          {/* LEFT: Featured Story */}
          <motion.div 
             key={`left-${news.id}`}
             initial={{ opacity: 0, x: -50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, ease: "easeOut" }}
             className="md:col-span-7 space-y-6 text-white"
          >
            <span className="inline-block bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
              Breaking News
            </span>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-md cursor-pointer hover:text-primary-300 transition-colors" onClick={() => navigate(`/news/${news.slug}`)}>
              {news.title}
            </h1>

            <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-xl line-clamp-3">
              {news.summary || news.description}
            </p>

            <div className="flex items-center gap-4 text-sm text-slate-300 font-medium">
              <span className="flex items-center gap-1">📍 {news.category?.name || news.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1">🕒 {formatDate(news.createdAt)}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => navigate(`/news/${news.slug}`)}
                className="bg-primary-600 hover:bg-primary-500 text-white text-center px-8 py-3 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-primary-600/30"
              >
                Read Full Story
              </button>
            </div>
          </motion.div>

          {/* RIGHT: Latest News Glass Card */}
          <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="md:col-span-5 flex justify-end"
          >
             <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl w-full max-w-md hidden md:block">
                <h3 className="text-white text-lg font-bold mb-4 border-b border-white/20 pb-3 flex items-center justify-between">
                   Trending Now
                   <span className="flex gap-1">
                     {newsList.map((_, i) => (
                       <button
                         key={`dot-${i}`}
                         onClick={() => setIndex(i)}
                         className={`h-1.5 rounded-full transition-all ${i === index ? "bg-primary-500 w-4" : "bg-white/30 w-1.5"}`}
                       />
                     ))}
                   </span>
                </h3>
                <ul className="space-y-4">
                  {newsList.map((item, i) => (
                    <li 
                      key={item.id} 
                      className={`flex gap-3 items-center group cursor-pointer p-2 rounded-lg transition-colors ${i === index ? 'bg-white/10' : 'hover:bg-white/5'}`} 
                      onClick={() => setIndex(i)}
                    >
                       <div className={`w-2 h-2 rounded-full shrink-0 ${i === index ? 'bg-primary-500 shadow-[0_0_8px_theme(colors.primary.500)]' : 'bg-white/30 group-hover:bg-white/60'}`} />
                       <div>
                          <p className={`text-sm ${i === index ? 'text-white font-bold' : 'text-slate-300'} group-hover:text-white transition-colors line-clamp-2`}>
                             {item.title}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">{formatDate(item.createdAt)}</p>
                       </div>
                    </li>
                  ))}
                </ul>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
