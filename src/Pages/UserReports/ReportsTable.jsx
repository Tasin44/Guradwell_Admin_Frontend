import { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";

const tabs = [
  { key: "Open", label: "Open" },
  { key: "Resolved", label: "Resolved" },
  { key: "Dismissed", label: "Dismissed" },
];

const ReportsTable = ({ reports, onSelectReport }) => {
  const [activeTab, setActiveTab] = useState("Open");

  const counts = useMemo(
    () => ({
      Open: reports.filter((report) => report.status === "Open").length,
      Resolved: reports.filter((report) => report.status === "Resolved").length,
      Dismissed: reports.filter((report) => report.status === "Dismissed").length,
    }),
    [reports],
  );

  const filteredReports = useMemo(
    () => reports.filter((report) => report.status === activeTab),
    [reports, activeTab],
  );

  return (
    <>
      <div className="flex items-center gap-4 sm:gap-6 border-b border-gray-200 mb-5 sm:mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-3 text-sm font-medium transition-colors relative flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              activeTab === tab.key
                ? "text-[#1a2744]"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.label}
            <span
              className={`text-xs ${
                activeTab === tab.key ? "text-[#1a2744]" : "text-gray-400"
              }`}
            >
              {counts[tab.key]}
            </span>
            {activeTab === tab.key && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a2744] rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-[#EAEDEB] bg-white shadow-[0_1px_2px_rgba(16,34,40,0.05)] overflow-hidden">
        <div className="px-4 sm:px-5 py-4 flex items-center justify-between gap-3 border-b border-gray-100">
          <div className="min-w-0">
            <h2 className="text-sm sm:text-base font-semibold text-gray-900">
              {activeTab} reports
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Reports submitted by community members
            </p>
          </div>
          {activeTab === "Open" && counts.Open > 0 && (
            <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-500 whitespace-nowrap shrink-0">
              Action required
            </span>
          )}
        </div>

        {filteredReports.length === 0 ? (
          <div className="px-5 py-12 text-center text-sm text-gray-400">
            No {activeTab.toLowerCase()} reports
          </div>
        ) : (
          <ul className="divide-y divide-gray-50">
            {filteredReports.map((report) => (
              <li key={report.id}>
                <button
                  onClick={() => onSelectReport(report)}
                  className="w-full px-4 sm:px-5 py-4 flex items-center cursor-pointer gap-3 sm:gap-4 hover:bg-gray-50/70 transition-colors text-left"
                >
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${report.avatarBg}`}
                  >
                    {report.initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {report.member}
                    </p>
                    <p className="text-sm text-gray-600 mt-0.5 line-clamp-1">
                      &ldquo;{report.comment}&rdquo;
                    </p>
                    <p className="text-xs text-gray-400 mt-1 truncate">
                      Reported by {report.reportedBy} · {report.time} ·{" "}
                      {report.postTitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 text-xs text-gray-400">
                    <span className="hidden sm:inline">{report.id}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ReportsTable;
