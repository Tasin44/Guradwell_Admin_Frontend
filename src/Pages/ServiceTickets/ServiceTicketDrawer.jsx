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
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-medium tracking-wider text-gray-400 uppercase mb-1">
                Service Request
              </p>
              <h2 className="text-lg font-semibold text-gray-900 leading-snug">
                {ticket.title}
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Submitted by {ticket.customer} · {ticket.submitted}
              </p>
            </div>
            <span
              className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${
                statusStyles[ticket.status]
              }`}
            >
              {ticket.status}
            </span>
          </div>

          {ticket.image && (
            <img
              src={ticket.image}
              alt={ticket.title}
              className="w-full aspect-[4/3] object-cover rounded-xl border border-gray-100"
            />
          )}

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1.5">
              Customer notes
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
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
                    className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-xs font-medium transition-all ${
                      isActive
                        ? "border-[#1a2744] bg-[#EDF3F8] text-[#1a2744]"
                        : "border-gray-200 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? "text-[#1a2744]" : "text-gray-400"
                      }`}
                      strokeWidth={isActive ? 2 : 1.5}
                    />
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
