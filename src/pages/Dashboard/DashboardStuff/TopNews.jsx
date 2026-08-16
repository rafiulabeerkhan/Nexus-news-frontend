const TopNews = ({ news = [] }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-5">
      <h2 className="text-xl font-bold mb-5 text-gray-800 dark:text-white">
        Most Viewed News
      </h2>

      <div className="max-h-[420px] overflow-y-auto scrollbar-thin">
        {news.length > 0 ? (
          news.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b border-gray-200 dark:border-slate-700 pb-3"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 dark:text-white truncate">
                  {item.title}
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.category?.name}
                </p>
              </div>

              <div className="flex flex-col items-end ml-4">
                <span className="text-xs text-gray-500">
                  {item.viewCount} Views
                </span>

                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  #{index + 1}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="py-6 text-center text-gray-500 dark:text-gray-400">
            No news found.
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNews;
