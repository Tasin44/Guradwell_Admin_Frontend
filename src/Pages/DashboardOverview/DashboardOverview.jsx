import LatestTickets from "./LatestTickets";
import RecentActivity from "./RecentActivity";
import SectionTitle from "../../components/SectionTitle";
import ServiceOverview from "./ServiceOverview";
import StatsGrid from "./StatsGrid";

const DashboardOverview = () => {
  return (
    <div>
      <SectionTitle
        title={"Dashboard Overview"}
        description={"Here’s what’s happening with Guard well today."}
      />
      <main className="w-full p-5 space-y-4">
      
      <StatsGrid />

      {/* Row 2: chart */}
      <div>
        <ServiceOverview />
      </div>

      {/* Row 3: tickets (wide) + activity */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <LatestTickets className="lg:col-span-2" />
        <RecentActivity />
      </div>
    </main>
    </div>
  );
};

export default DashboardOverview;
