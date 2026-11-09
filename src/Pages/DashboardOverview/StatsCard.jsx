import Card from "../../components/Card";

const tones = {
  blue: "bg-[#e8eef7] text-[#2b4a73]",
  red: "bg-[#fbe9e6] text-[#b5483a]",
  green: "bg-[#e6f0ec] text-[#2f6b57]",
  pink: "bg-[#fde8ee] text-[#c2395f]",
};

export default function StatsCard({ icon: Icon, label, value, note, tone = "blue" }) {
  return (
    <Card className="flex items-start gap-3.5 p-4 sm:p-5">
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${tones[tone]}`}
      >
        <Icon size={18} strokeWidth={1.6} />
      </div>
      <div className="min-w-0">
        <p className="text-[14px] text-gray-500">{label}</p>
        <p className="mt-1 text-[26px] font-semibold leading-none">{value}</p>
        {note && <p className="mt-2 text-[13px]">{note}</p>}
      </div>
    </Card>
  );
}
