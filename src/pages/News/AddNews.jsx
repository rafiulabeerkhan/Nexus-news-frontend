import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaFileCirclePlus, FaPaperPlane } from "react-icons/fa6";
import useNews from "../../hooks/useNews";
import useCategory from "../../hooks/useCategory";
import showToast from "../../utils/toast";

const STATUS_OPTIONS = ["DRAFT", "PUBLISHED"];

const FLAGS = [
  { key: "isFeatured", label: "Featured" },
  { key: "isBreaking", label: "Breaking" },
  { key: "isTrending", label: "Trending" },
  { key: "isHeadline", label: "Headline" },
];

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const AddNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createNews, updateNews, getNewsById } = useNews();
  const { getAllCategories } = useCategory();
  const [categories, setCategories] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailAltTouched, setThumbnailAltTouched] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    thumbnail: "",
    thumbnailAlt: "",
    categoryId: "",
    status: "DRAFT",
    isFeatured: false,
    isBreaking: false,
    isTrending: false,
    isHeadline: false,
  });

  const [slugTouched, setSlugTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "thumbnailAlt") {
      setThumbnailAltTouched(true);
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "title" && !slugTouched ? { slug: slugify(value) } : {}),
      ...(name === "title" && !thumbnailAltTouched
        ? { thumbnailAlt: value }
        : {}),
    }));
  };

  const handleFlagToggle = (key) => {
    setForm((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Validation
    if (!form.title.trim()) {
      return setError("Title is required.");
    }

    if (!form.slug.trim()) {
      return setError("Slug is required.");
    }

    if (!form.summary.trim()) {
      return setError("Summary is required.");
    }

    if (!form.content.trim()) {
      return setError("Content is required.");
    }

    if (!form.categoryId) {
      return setError("Please select a category.");
    }

    setLoading(true);
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("summary", form.summary);
    formData.append("content", form.content);
    formData.append("thumbnailAlt", form.thumbnailAlt);
    formData.append("categoryId", Number(form.categoryId));

    formData.append("status", form.status);

    formData.append("isFeatured", form.isFeatured);
    formData.append("isBreaking", form.isBreaking);
    formData.append("isTrending", form.isTrending);
    formData.append("isHeadline", form.isHeadline);

    if (thumbnailFile) {
      formData.append("image", thumbnailFile);
    }

    const response = id
      ? await updateNews(id, formData)
      : await createNews(formData);

    setLoading(false);

    if (!response.success) {
      setError(response.message);
      return;
    }

    showToast(response.message, "success");

    if (!id) {
      setForm({
        title: "",
        slug: "",
        summary: "",
        content: "",
        thumbnail: "",
        thumbnailAlt: "",
        categoryId: "",
        status: "DRAFT",
        isFeatured: false,
        isBreaking: false,
        isTrending: false,
        isHeadline: false,
      });

      setSlugTouched(false);
    }

    showToast("News article saved successfully!", "success");
    navigate("/dashboard/news");
  };

  const fetchCategories = async () => {
    const res = await getAllCategories({
      page: 1,
      limit: 100,
      search: "",
    });
    if (res.success) {
      setCategories(res.data.data.data);
    }
  };

  const fetchNews = async () => {
    const res = await getNewsById(id);

    if (!res.success) {
      showToast(res.message, "error");
      return;
    }

    const news = res.data;

    setForm({
      title: news.title || "",
      slug: news.slug || "",
      summary: news.summary || "",
      content: news.content || "",
      thumbnail: news.thumbnail
        ? `${import.meta.env.VITE_API_URL}${news.thumbnail}`
        : "",
      thumbnailAlt: news.thumbnailAlt || "",
      categoryId: news.categoryId?.toString() || "",
      status: news.status || "DRAFT",
      isFeatured: news.isFeatured ?? false,
      isBreaking: news.isBreaking ?? false,
      isTrending: news.isTrending ?? false,
      isHeadline: news.isHeadline ?? false,
    });
  };

  useEffect(() => {
    fetchCategories();

    if (id) {
      fetchNews();
    }
  }, [id]);
  return (
    <div className="bg-white dark:bg-slate-800 rounded-[32px] overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white px-8 py-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20 pointer-events-none blur-3xl"></div>
        <h2 className="text-3xl font-extrabold tracking-wide flex items-center gap-4 relative z-10">
          <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl shadow-inner">
             <FaFileCirclePlus className="text-white text-3xl shrink-0" />
          </div>
          {id ? "Update News Entry" : "Create News Article"}
        </h2>

        <p className="text-white/80 mt-3 text-sm font-medium relative z-10 max-w-lg">
          Craft and publish your next great story. Fill out the details below to add a new article to the platform.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-10">
        {error && (
          <div className="bg-red-100 text-red-600 rounded-xl p-3 text-sm">
            {error}
          </div>
        )}

        {/* Article Details */}
        <div>
          <h3 className="text-xs uppercase tracking-[4px] text-primary-500 font-bold mb-6">
            Article Details
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">
                Title *
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full h-14 px-5 rounded-2xl bg-gray-100 border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">
                Category *
              </label>
              <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                className="w-full h-14 px-5 rounded-2xl bg-gray-100 border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none"
              >
                <option value="">Select Category</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">
                Status *
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full h-14 px-5 rounded-2xl bg-gray-100 border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none capitalize"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Thumbnail */}
        <div>
          <h3 className="text-xs uppercase tracking-[4px] text-primary-500 font-bold mb-6">
            Thumbnail
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Thumbnail Upload */}
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">
                Thumbnail Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (!file) return;

                  setThumbnailFile(file);

                  setForm((prev) => ({
                    ...prev,
                    thumbnail: URL.createObjectURL(file),
                  }));
                }}
                className="w-full h-14 px-3 py-3 rounded-2xl bg-gray-100 border border-gray-200"
              />
            </div>

            {/* Thumbnail Alt */}
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">
                Thumbnail Alt Text
              </label>

              <input
                type="text"
                name="thumbnailAlt"
                value={form.thumbnailAlt}
                onChange={handleChange}
                placeholder="Describe the image for accessibility"
                className="w-full h-14 px-5 rounded-2xl bg-gray-100 border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
          </div>

          {form.thumbnail && (
            <div className="mt-5 rounded-2xl overflow-hidden border border-gray-200 max-h-48">
              <img
                src={form.thumbnail}
                alt={form.thumbnailAlt || form.title || "Preview"}
                className="w-full h-48 object-cover"
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div>
          <h3 className="text-xs uppercase tracking-[4px] text-primary-500 font-bold mb-6">
            Summary & Content
          </h3>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">
                Summary *
              </label>

              <textarea
                rows={3}
                name="summary"
                value={form.summary}
                onChange={handleChange}
                placeholder="A short one or two sentence summary shown in listings..."
                className="w-full rounded-3xl bg-gray-100 border border-gray-200 px-5 py-4 resize-none outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">
                Content *
              </label>

              <textarea
                rows={10}
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="Write the full article content..."
                className="w-full rounded-3xl bg-gray-100 border border-gray-200 px-5 py-4 resize-none outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Flags */}
        <div>
          <h3 className="text-xs uppercase tracking-[4px] text-primary-500 font-bold mb-6">
            Placement
          </h3>

          <div className="bg-gray-50 rounded-3xl p-6 border flex flex-wrap gap-8">
            {FLAGS.map(({ key, label }) => (
              <label
                key={key}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={form[key]}
                  onChange={() => handleFlagToggle(key)}
                  className="accent-primary-500 w-4 h-4"
                />
                <span className="capitalize">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Button */}
        <div className="sticky bottom-6 z-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-lg mt-10">
          <button
            type="submit"
            disabled={loading}
            className="relative w-full h-16 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-extrabold tracking-[2px] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            <FaPaperPlane className="text-white text-2xl shrink-0" />

            {loading
              ? "SUBMITTING..."
              : id
                ? "UPDATE ARTICLE"
                : "SUBMIT & PUBLISH"}
          </button>

          <p className="text-center text-[12px] font-medium text-slate-500 dark:text-slate-400 mt-4">
            Draft articles are saved securely but will not be shown publicly until the status is set to published.
          </p>
        </div>
      </form>
    </div>
  );
};

export default AddNews;
