import Card, { CardHeader } from "../../components/Card";

const items = [
  { dot: "bg-[#2b6cb0]", title: "Customer verified", meta: "Maya Thompson · 8 min ago" },
  { dot: "bg-[#2f855a]", title: "Ticket completed", meta: "REQ-2478 · 32 min ago" },
  { dot: "bg-[#ed8936]", title: "Post approved", meta: "By Jamie Morgan · 1 hr ago" },
  { dot: "bg-[#e0426f]", title: "Bonus paid", meta: "$100 to Sam Patel · 2 hrs ago" },
];

export default function RecentActivity({ className = "" }) {
  return (
    <Card className={className}>
      <CardHeader title="Recent activity" subtitle="Live team updates" />
      <ul className="space-y-4 px-5 py-4">
        {items.map((i) => (
          <li key={i.title} className="flex items-start gap-2.5">
            <span className={`mt-1.5 size-3 shrink-0 rounded-full ${i.dot}`} />
            <div>
              <p className="text-[13px] font-medium">{i.title}</p>
              <p className="mt-0.5 text-[11px] text-muted">{i.meta}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
