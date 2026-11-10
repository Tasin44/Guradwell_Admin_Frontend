import { Users, Ticket, Gift } from "lucide-react";
import StatsCard from "./StatsCard";

export default function StatsGrid({ overview, loading }) {
  const totalCustomers = overview?.total_customers ?? (loading ? "..." : 0);
  const openTickets = overview?.open_tickets ?? (loading ? "..." : 0);
  const urgentTickets = overview?.urgent_tickets ?? 0;
  const referralRewards = overview?.referral_rewards !== undefined
    ? `$${Number(overview.referral_rewards).toLocaleString()}`
    : loading ? "..." : "$0";
  const pendingRewards = overview?.pending_rewards_count ?? 0;

  const stats = [
    {
      icon: Users,
      label: "Total customers",
      value: totalCustomers.toString(),
      note: "",
      tone: "blue",
    },
    {
      icon: Ticket,
      label: "Open tickets",
      value: openTickets.toString(),
      note: urgentTickets > 0 ? `${urgentTickets} urgent` : "All standard",
      tone: "red",
    },
    {
      icon: Gift,
      label: "Referral rewards",
      value: referralRewards,
      note: `${pendingRewards} pending`,
      tone: "pink",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((s) => (
        <StatsCard key={s.label} {...s} />
      ))}
    </div>
  );
}
