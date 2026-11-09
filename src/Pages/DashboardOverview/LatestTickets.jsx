import { ChevronRight } from "lucide-react";
import Card, { CardHeader } from "../../components/Card";
import { Link } from "react-router-dom";

const tickets = [
  {
    initials: "JM",
    title: "Gutter leaking near back door",
    by: "Jamie Morgan",
    time: "12 min ago",
    status: "New",
    avatar: "bg-[#e3ebe7] text-[#3d5a52]",
  },
  {
    initials: "SP",
    title: "Annual gutter inspection",
    by: "Sam Patel",
    time: "1 hr ago",
    status: "In progress",
    avatar: "bg-[#e8eef7] text-[#2b4a73]",
  },
  {
    initials: "MT",
    title: "Downpipe appears blocked",
    by: "Maya Thompson",
    time: "3 hrs ago",
    status: "In progress",
    avatar: "bg-[#f8e8e3] text-[#9a4a3a]",
  },
];

const badge = {
  New: "bg-[#fbefd9] text-[#9a6a1c]",
  "In progress": "bg-[#e1eefb] text-[#2563a8]",
};

export default function LatestTickets({ className = "" }) {
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
      <ul className="divide-y divide-[#EAEDEB]">
        {tickets.map((t) => (
          <li key={t.title}>
            <Link className="flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors hover:bg-gray-50">
              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[14px] font-medium ${t.avatar}`}
              >
                {t.initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-medium">
                  {t.title}
                </span>
                <span className="mt-0.5 block text-[11px] text-muted">
                  {t.by} · {t.time}
                </span>
              </span>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[12px] font-semibold ${badge[t.status]}`}
              >
                {t.status}
              </span>
              <ChevronRight size={14} className="shrink-0" />
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
