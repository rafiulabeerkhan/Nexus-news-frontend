import { useEffect, useState } from "react";
import useDashboard from "../../hooks/useDashboard";

import DashboardHeader from "./DashboardStuff/DashboardHeader";
import LatestNewsTable from "./DashboardStuff/LatestNewsTable";
import QuickActions from "./DashboardStuff/QuickActions";
import StatsGrid from "./DashboardStuff/StatsGrid";
import TopNews from "./DashboardStuff/TopNews";
import VisitorChart from "./DashboardStuff/VisitorChart";

const ModeratorDashboard = () => {
  const { getDashboard } = useDashboard();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    setLoading(true);

    const res = await getDashboard();

    if (res.success) {
      setDashboard(res.data);
    }

    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <DashboardHeader />

        <StatsGrid cards={dashboard?.cards} />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <VisitorChart data={dashboard?.weeklyVisitors || []} />
          </div>

          <QuickActions />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <LatestNewsTable latestNews={dashboard?.latestNews || []} />{" "}
          <TopNews news={dashboard?.mostViewedNews || []} />
        </div>
      </div>
    </div>
  );
};

export default ModeratorDashboard;
