import { useMemo, useState } from "react";
import { ChevronDown, ChevronRight, Search, Ticket } from "lucide-react";
import { statusStyles } from "./serviceTicketData";

const tabs = ["All", "New", "In progress", "Completed"];

const ServiceTicketsTable = ({ tickets, loading, onSelectTicket }) => {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const filteredData = useMemo(() => {
    let data = (tickets || []).filter((ticket) => {
      const matchesTab = activeTab === "All" || ticket.status === activeTab;
      const searchTerm = search.toLowerCase();
      const matchesSearch =
        ticket.title.toLowerCase().includes(searchTerm) ||
        ticket.customer.toLowerCase().includes(searchTerm) ||
        ticket.id.toLowerCase().includes(searchTerm);
      return matchesTab && matchesSearch;
    });

    if (sort === "oldest") {
      data = [...data].reverse();
    }

    return data;
  }, [activeTab, search, sort, tickets]);

  return (
    <div>
      <div className="flex items-center gap-6 border-b border-gray-200 mb-5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              activeTab === tab
                ? "text-[#1a2744]"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a2744] rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-[#EAEDEB] bg-white shadow-[0_1px_2px_rgba(16,34,40,0.05)] overflow-hidden">
        <div className="px-4 sm:px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search requests..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-full bg-white outline-none focus:ring-2 focus:ring-gray-200 transition-all"
            />
          </div>

          <div className="relative">
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="appearance-none pl-4 pr-9 py-2 text-sm border border-gray-200 rounded-full bg-white text-gray-600 outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead>
              <tr className="border-y border-gray-100">
                {["Request", "Customer", "Submitted", "Status", ""].map(
                  (column, index) => (
                    <th
                      key={index}
                      className="px-5 py-3 text-[11px] font-medium tracking-wider text-gray-400 uppercase whitespace-nowrap"
                    >
                      {column}
                    </th>
                  ),
                )}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-sm text-gray-400"
                  >
                    Loading service tickets...
                  </td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                          <Ticket className="w-4 h-4 text-slate-500" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {ticket.title}
                          </p>
                          <p className="text-xs text-gray-400">
                            {ticket.id}
                            {ticket.attachment && (
                              <span> · {ticket.attachment}</span>
                            )}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0 ${ticket.avatarBg}`}
                        >
                          {ticket.initials}
                        </div>
                        <span className="text-sm text-gray-700 whitespace-nowrap">
                          {ticket.customer}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {ticket.submitted}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                          statusStyles[ticket.status] || statusStyles.New
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => onSelectTicket(ticket)}
                        className="inline-flex items-center gap-1 text-sm font-medium text-[#1a2744] hover:underline cursor-pointer"
                      >
                        Open
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-sm text-gray-400"
                  >
                    No requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServiceTicketsTable;
