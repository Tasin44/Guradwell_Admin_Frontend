import { useState, useMemo } from "react";
import { Search, RefreshCw } from "lucide-react";

const customersData = [
  {
    id: "CUS-1024",
    name: "Jamie Morgan",
    email: "jamie.m@example.com",
    initials: "JM",
    avatarBg: "bg-emerald-100 text-emerald-700",
    joined: "Jun 12, 2025",
    bookings: 3,
    status: "Verified",
    feedAccess: "Active",
  },
  {
    id: "CUS-1023",
    name: "Sam Patel",
    email: "sam.patel@example.com",
    initials: "SP",
    avatarBg: "bg-violet-100 text-violet-700",
    joined: "Jun 10, 2025",
    bookings: 1,
    status: "New",
    feedAccess: "Active",
  },
  {
    id: "CUS-1022",
    name: "Riley Lewis",
    email: "riley.l@example.com",
    initials: "RL",
    avatarBg: "bg-rose-100 text-rose-700",
    joined: "Jun 8, 2025",
    bookings: 2,
    status: "Verified",
    feedAccess: "Restricted",
  },
  {
    id: "CUS-1021",
    name: "Maya Thompson",
    email: "maya.t@example.com",
    initials: "MT",
    avatarBg: "bg-amber-100 text-amber-700",
    joined: "Jun 4, 2025",
    bookings: 5,
    status: "Verified",
    feedAccess: "Active",
  },
  {
    id: "CUS-1020",
    name: "Noah Williams",
    email: "noah.w@example.com",
    initials: "NW",
    avatarBg: "bg-teal-100 text-teal-700",
    joined: "May 29, 2025",
    bookings: 0,
    status: "New",
    feedAccess: "Active",
  },
];

const statusStyles = {
  Verified: "bg-emerald-50 text-emerald-600",
  New: "bg-amber-50 text-amber-600",
};

const feedAccessStyles = {
  Active: "bg-gray-100 text-gray-500",
  Restricted: "bg-rose-50 text-rose-500",
};

const CustomersTable = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = useMemo(() => {
    return customersData.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.id.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        (filter === "verified" && c.status === "Verified") ||
        (filter === "new" && c.status === "New");

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setSearch("");
    setFilter("all");
    setCurrentPage(1);
  };

  // Page numbers with ellipsis style
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  };

  return (
    <div className="rounded-xl border border-[#EAEDEB] bg-white shadow-[0_1px_2px_rgba(16,34,40,0.05)] overflow-hidden">
      {/* Toolbar */}
      <div className="px-4 sm:px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={handleSearch}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-full bg-white outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all"
          />
        </div>

        {/* Spacer */}
        <div className="flex-1 hidden sm:block" />

        {/* Refresh */}
        <button
          onClick={handleRefresh}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-200 text-left">
          <thead>
            <tr className="border-y border-gray-100">
              {["Customer", "Joined", "Bookings", "Status"].map(
                (col) => (
                  <th
                    key={col}
                    className="px-5 py-3 text-[11px] font-medium tracking-wider text-gray-400 uppercase whitespace-nowrap"
                  >
                    {col}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody>
            {currentData.length > 0 ? (
              currentData.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                >
                  {/* Customer */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${customer.avatarBg}`}
                      >
                        {customer.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {customer.name}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Joined */}
                  <td className="px-5 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {customer.joined}
                  </td>

                  {/* Bookings */}
                  <td className="px-5 py-4 text-sm text-gray-700 whitespace-nowrap">
                    {customer.bookings}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                        statusStyles[customer.status]
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-5 py-12 text-center text-sm text-gray-400"
                >
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-4 sm:px-5 py-4 flex items-center justify-between gap-3">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, i) =>
            page === "..." ? (
              <span key={`dots-${i}`} className="px-1 text-sm text-gray-400">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-[#1a2744] text-white"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ),
          )}
        </div>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomersTable;