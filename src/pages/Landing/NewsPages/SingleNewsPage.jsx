import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useNews from "../../../hooks/useNews";
import { CalendarDays, ArrowLeft } from "lucide-react";
import { getImageUrl } from "../../../utils/getImageUrl";
import { formatDate } from "../../../utils/dateConverter";

const SingleNewsPage = () => {
  const { slug } = useParams();
  const { getAllNews } = useNews();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      // Fetch news and find by slug. We can fetch with a large limit or use search.
      // Assuming search might match the title/slug, or we just fetch the first page if it's recent.
      const res = await getAllNews({
        page: 1,
        limit: 100,
        search: slug.replace(/-/g, " "), // try to search by title words
      });

      if (res.success) {
        // Find exact match by slug
        const match = res.data.data.find((n) => n.slug === slug);
        if (match) {
          setArticle(match);
        } else {
          // Fallback if not found in first search, try fetching all without search
          const allRes = await getAllNews({ page: 1, limit: 100 });
          if (allRes.success) {
             const allMatch = allRes.data.data.find((n) => n.slug === slug);
             setArticle(allMatch || null);
          }
        }
      }
      setLoading(false);
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center py-32 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold mt-5 text-gray-800">Article Not Found</h2>
        <p className="text-gray-500 mt-2 mb-8">
          The news article you are looking for does not exist or has been removed.
        </p>
        <Link to="/" className="text-primary-600 font-medium hover:underline">
          &larr; Back to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{article.title} - NexusNews</title>
        <meta name="description" content={article.summary || article.description?.substring(0, 150)} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary || article.description?.substring(0, 150)} />
        {article.thumbnail && <meta property="og:image" content={getImageUrl(article.thumbnail)} />}
      </Helmet>
      
      <div className="bg-gray-50 min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-5 pt-12">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 transition mb-8">
          <ArrowLeft size={20} />
          Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
          {article.title}
        </h1>
        
        <div className="flex items-center gap-4 text-gray-500 mb-8 border-b pb-8">
          <div className="flex items-center gap-2">
            <CalendarDays size={18} />
            {formatDate(article.createdAt)}
          </div>
          {article.category && (
            <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
              {article.category.name}
            </span>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 mb-12">
        <img
          src={getImageUrl(article.thumbnail)}
          alt={article.thumbnailAlt || article.title}
          className="w-full max-h-[600px] object-cover rounded-2xl shadow-lg"
        />
      </div>

      <div className="max-w-3xl mx-auto px-5">
        <p className="text-xl text-gray-600 font-medium leading-relaxed mb-10 italic border-l-4 border-primary-600 pl-6">
          {article.summary}
        </p>
        
        <div 
          className="prose prose-lg max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
      </div>
    </>
  );
};

export default SingleNewsPage;
