import { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import ReportDrawer from "./ReportDrawer";
import ReportsTable from "./ReportsTable";

const initialReports = [
  {
    id: "RPT-108",
    member: "Jordan Blake",
    initials: "JB",
    avatarBg: "bg-blue-100 text-blue-700",
    comment:
      "This is useless advice. You clearly have no idea what you are talking about.",
    reportedBy: "Jamie Morgan",
    time: "8 min ago",
    postTitle: "Advice for cleaning gutters safely",
    status: "Open",
  },
  {
    id: "RPT-107",
    member: "Taylor Reed",
    initials: "TR",
    avatarBg: "bg-rose-100 text-rose-700",
    comment: "Stop posting here. Nobody wants your opinion.",
    reportedBy: "Sam Patel",
    time: "34 min ago",
    postTitle: "New gutter installation",
    status: "Open",
  },
  {
    id: "RPT-106",
    member: "Morgan Lee",
    initials: "ML",
    avatarBg: "bg-amber-100 text-amber-700",
    comment: "Message me privately for a cheap repair with no paperwork needed.",
    reportedBy: "Maya Thompson",
    time: "2 hrs ago",
    postTitle: "Downpipe repair recommendations",
    status: "Open",
  },
];

const UserReports = () => {
  const [reports, setReports] = useState(initialReports);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const selectedReport =
    reports.find((report) => report.id === selectedReportId) ?? null;

  const handleAction = (action) => {
    if (!selectedReport) return;

    setReports((currentReports) =>
      currentReports.map((report) => {
        if (report.id !== selectedReportId) return report;
        if (action === "ban" || action === "remove") {
          return { ...report, status: "Resolved", action };
        }
        if (action === "dismiss") {
          return { ...report, status: "Dismissed", action };
        }
        return report;
      }),
    );
    setSelectedReportId(null);
  };

  return (
    <div>
      <SectionTitle
        title="User reports"
        description="Review reported comments and protect the community feed"
      />
      <div className="p-5">
        <ReportsTable
          reports={reports}
          onSelectReport={(report) => setSelectedReportId(report.id)}
        />
      </div>
      <ReportDrawer
        report={selectedReport}
        onClose={() => setSelectedReportId(null)}
        onAction={handleAction}
      />
    </div>
  );
};

export default UserReports;
