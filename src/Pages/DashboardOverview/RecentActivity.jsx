import Card, { CardHeader } from "../../components/Card";

export default function RecentActivity({ activityData, loading, className = "" }) {
  const items = activityData || [];

  return (
    <Card className={className}>
      <CardHeader title="Recent activity" subtitle="Live team updates" />
      {loading ? (
        <div className="p-8 text-center text-sm text-gray-400">Loading activity...</div>
      ) : items.length === 0 ? (
        <div className="p-8 text-center text-sm text-gray-400">No recent activity</div>
      ) : (
        <ul className="space-y-4 px-5 py-4">
          {items.map((i, idx) => {
            const dotColor =
              i.type === "customer_verified"
                ? "bg-[#2b6cb0]"
                : i.type === "ticket_status"
                ? "bg-[#2f855a]"
                : "bg-[#e0426f]";

            return (
              <li key={idx} className="flex items-start gap-2.5">
                <span className={`mt-1.5 size-3 shrink-0 rounded-full ${dotColor}`} />
                <div>
                  <p className="text-[13px] font-medium">{i.title}</p>
                  <p className="mt-0.5 text-[11px] text-muted">
                    {i.description} · {i.time}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
