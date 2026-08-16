import { format } from "date-fns";

const LatestNewsTable = ({ latestNews = [] }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          Latest News
        </h2>
      </div>

      <div className="overflow-y-auto max-h-[420px]">
        <table className="w-full text-sm">
          <thead className="border-b dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800 z-10">
            <tr className="text-left text-slate-500 dark:text-slate-400 font-semibold uppercase text-xs tracking-wider">
              <th className="py-4">Title</th>
              <th className="py-4">Category</th>
              <th className="py-4">Status</th>
              <th className="py-4">Views</th>
              <th className="py-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {latestNews.length > 0 ? (
              latestNews.map((item) => (
                <tr
                  key={item.id}
                  className="border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200 group"
                >
                  <td className="py-4 pr-4 font-semibold text-slate-800 dark:text-white group-hover:text-primary-600 transition-colors">
                    <p className="max-w-xs truncate">{item.title}</p>
                  </td>

                  <td className="py-3">{item.category?.name || "-"}</td>

                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        item.status === "PUBLISHED"
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                          : "bg-amber-100 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="py-3">{item.viewCount}</td>

                  <td className="py-3">
                    {format(new Date(item.createdAt), "dd MMM yyyy")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-500">
                  No news found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LatestNewsTable;
