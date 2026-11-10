import { ChevronRight } from "lucide-react";
import Card, { CardHeader } from "../../components/Card";
import { Link } from "react-router-dom";

const badge = {
  New: "bg-[#fbefd9] text-[#9a6a1c]",
  submitted: "bg-[#fbefd9] text-[#9a6a1c]",
  "In progress": "bg-[#e1eefb] text-[#2563a8]",
  in_progress: "bg-[#e1eefb] text-[#2563a8]",
  Completed: "bg-emerald-50 text-emerald-700",
  completed: "bg-emerald-50 text-emerald-700",
};

export default function LatestTickets({ ticketsData, loading, className = "" }) {
  const tickets = ticketsData || [];

  return (
    <Card className={className}>
      <CardHeader
        title="Latest service tickets"
        subtitle="Recently submitted requests"
        action={
          <Link
            to="/tickets"
            className="text-[14px] font-semibold underline-offset-2 hover:underline"
          >
            View all
          </Link>
        }
      />
      {loading ? (
        <div className="p-8 text-center text-sm text-gray-400">Loading tickets...</div>
      ) : tickets.length === 0 ? (
        <div className="p-8 text-center text-sm text-gray-400">No recent tickets</div>
      ) : (
        <ul className="divide-y divide-[#EAEDEB]">
          {tickets.map((t) => {
            const initials = t.customer_name
              ? t.customer_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()
              : "CU";

            return (
              <li key={t.id}>
                <Link
                  to="/tickets"
                  className="flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors hover:bg-gray-50"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full text-[13px] font-medium bg-[#e8eef7] text-[#2b4a73]">
                    {initials}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-medium">
                      {t.title}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-muted">
                      {t.customer_name} · {t.time}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[12px] font-semibold ${
                      badge[t.status] || badge.New
                    }`}
                  >
                    {t.status}
                  </span>
                  <ChevronRight size={14} className="shrink-0" />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
