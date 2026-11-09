import { Users, Ticket, ShieldCheck, Gift } from "lucide-react";
import StatsCard from "./StatsCard";

const stats = [
  { icon: Users, label: "Total customers", value: "1,248", note: "", tone: "blue" },
  { icon: Ticket, label: "Open tickets", value: "3", note: "2 urgent", tone: "red" },
  { icon: Gift, label: "Referral rewards", value: "$1,850", note: "14 pending", tone: "pink" },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((s) => (
        <StatsCard key={s.label} {...s} />
      ))}
    </div>
  );
}
