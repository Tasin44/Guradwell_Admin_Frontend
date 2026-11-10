import { CheckCircle2, Circle, X } from "lucide-react";
import { statusStyles } from "./serviceTicketData";

const statuses = [
  { label: "New", icon: Circle },
  { label: "In progress", icon: Circle },
  { label: "Completed", icon: CheckCircle2 },
];

const ServiceTicketDrawer = ({ ticket, onClose, onStatusUpdate }) => {
  if (!ticket) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/30"
        onClick={onClose}
      />

      <div className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <span className="text-sm font-medium text-gray-500">{ticket.id}</span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-medium tracking-wider text-gray-400 uppercase mb-1">
                {ticket.serviceCategory || "Service Request"}
              </p>
              <h2 className="text-lg font-semibold text-gray-900 leading-snug">
                {ticket.title}
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Submitted by {ticket.customer} · {ticket.submitted}
              </p>
              {ticket.customerPhone && (
                <p className="text-xs text-gray-500 mt-0.5">Phone: {ticket.customerPhone}</p>
              )}
              {ticket.address && (
                <p className="text-xs text-gray-500 mt-0.5">Location: {ticket.address}</p>
              )}
            </div>
            <span
              className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${
                statusStyles[ticket.status] || statusStyles.New
              }`}
            >
              {ticket.status}
            </span>
          </div>

          {ticket.image && (
            <div>
              <img
                src={ticket.image}
                alt={ticket.title}
                className="w-full aspect-[4/3] object-cover rounded-xl border border-gray-100"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          )}

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1.5">
              Customer notes / Description
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed bg-gray-50 p-3 rounded-lg">
              {ticket.notes}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Update status
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {statuses.map(({ label, icon: Icon }) => {
                const isActive = ticket.status === label;
                return (
                  <button
                    key={label}
                    onClick={() => onStatusUpdate(label)}
                    className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      isActive
                        ? "bg-[#1a2744] text-white border-[#1a2744]"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceTicketDrawer;
