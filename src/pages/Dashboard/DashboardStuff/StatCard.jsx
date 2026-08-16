const StatCard = ({ title, value, icon, color, onClick }) => {
  return (
    <div
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
      onClick={onClick}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full -mr-8 -mt-8 pointer-events-none"></div>
      <div className="flex justify-between items-center relative z-10">
        <div>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm uppercase tracking-wider">{title}</p>

          <h2 className="text-4xl font-extrabold mt-3 text-slate-800 dark:text-white group-hover:text-primary-600 transition-colors">{value}</h2>
        </div>

        <div className={`p-4 rounded-xl ${color} bg-opacity-10 dark:bg-opacity-20 backdrop-blur-sm shadow-inner`}>
          <div className="text-3xl opacity-90">{icon}</div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
