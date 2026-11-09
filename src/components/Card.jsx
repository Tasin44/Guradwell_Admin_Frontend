export default function Card({ className = "", children }) {
  return (
    <section
      className={`rounded-xl border border-[#EAEDEB] bg-white shadow-[0_1px_2px_rgba(16,34,40,0.05)] ${className}`}
    >
      {children}
    </section>
  );
}

export function CardHeader({ title, subtitle, action, bordered = true }) {
  return (
    <div
      className={`flex items-start justify-between gap-3 px-5 py-4 border-b border-[#EAEDEB]`}
    >
      <div>
        <h2 className="text-[16px] font-medium text-gray-700">{title}</h2>
        {subtitle && <p className="mt-0.5 text-[12px] text-gray-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
