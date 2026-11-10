import { useEffect, useState } from "react";
import LatestTickets from "./LatestTickets";
import RecentActivity from "./RecentActivity";
import SectionTitle from "../../components/SectionTitle";
import ServiceOverview from "./ServiceOverview";
import StatsGrid from "./StatsGrid";
import adminApi from "../../lib/admin-api";

const DashboardOverview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOverview = async () => {
    try {
      const res = await adminApi.getDashboardOverview();
      setData(res);
    } catch (err) {
      console.error("Failed to load dashboard overview:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  return (
    <div>
      <SectionTitle
        title={"Dashboard Overview"}
        description={"Here’s what’s happening with Guard well today."}
      />
      <main className="w-full p-5 space-y-4">
        <StatsGrid overview={data} loading={loading} />

        {/* Row 2: chart */}
        <div>
          <ServiceOverview daysData={data?.service_overview_days} loading={loading} />
        </div>

        {/* Row 3: tickets (wide) + activity */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <LatestTickets
            ticketsData={data?.latest_service_tickets}
            loading={loading}
            className="lg:col-span-2"
          />
          <RecentActivity activityData={data?.recent_activity} loading={loading} />
        </div>
      </main>
    </div>
  );
};

export default DashboardOverview;
