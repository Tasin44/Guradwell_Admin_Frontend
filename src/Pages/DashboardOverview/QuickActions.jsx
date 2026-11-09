import { ChevronRight, Users, Ticket, ShieldCheck, Gift } from "lucide-react";
import Card, { CardHeader } from "../../components/Card";

const actions = [
  { icon: Users, label: "Verify new customers" },
  { icon: Ticket, label: "Review open tickets" },
  { icon: ShieldCheck, label: "Moderate pending posts" },
  { icon: Gift, label: "Pay referral bonuses" },
];

export default function QuickActions({ className = "" }) {
  return (
    <Card className={className}>
      <CardHeader title="Quick actions" subtitle="Common admin tasks" bordered={false} />
      <ul className="px-3 py-3">
        {actions.map(({ icon: Icon, label }) => (
          <li key={label}>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 cursor-pointer hover:bg-gray-50 text-left transition-colors hover:bg-page focus-visible:outline-2 focus-visible:outline-ink/30"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded bg-[#3d5a5215] text-[#3d5a52]">
                <Icon size={20} strokeWidth={1.6} />
              </span>
              <span className="flex-1 text-[14px]">{label}</span>
              <ChevronRight size={15} />
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
