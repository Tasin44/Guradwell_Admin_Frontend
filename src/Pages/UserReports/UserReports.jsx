import { useState, useEffect } from "react";
import SectionTitle from "../../components/SectionTitle";
import ReportDrawer from "./ReportDrawer";
import ReportsTable from "./ReportsTable";
import adminApi from "../../lib/admin-api";
import Swal from "sweetalert2";

const avatarBgs = [
  "bg-blue-100 text-blue-700",
  "bg-rose-100 text-rose-700",
  "bg-amber-100 text-amber-700",
  "bg-emerald-100 text-emerald-700",
];

const UserReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReportId, setSelectedReportId] = useState(null);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getReports({ limit: 100 });
      const mapped = (data || []).map((r, idx) => {
        const initials = r.author_name
          ? r.author_name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()
          : "US";

        const formattedDate = r.created_at
          ? new Date(r.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
          : "-";

        return {
          rawId: r.id || r.report_id,
          id: r.report_code || `RPT-${r.id || r.report_id}`,
          member: r.author_name,
          initials,
          avatarBg: avatarBgs[idx % avatarBgs.length],
          comment: r.reported_text,
          reportedBy: r.reporter_name,
          reason: r.reason,
          time: formattedDate,
          postTitle: `Reported post #${r.post_id}`,
          status: r.status || "Open",
        };
      });
      setReports(mapped);
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const selectedReport =
    reports.find((report) => report.id === selectedReportId) ?? null;

  const handleAction = async (action) => {
    if (!selectedReport) return;

    const actionMap = {
      ban: "delete_post",
      remove: "delete_post",
      dismiss: "dismiss_report",
    };

    const backendAction = actionMap[action] || "dismiss_report";

    try {
      await adminApi.handleReportAction(selectedReport.rawId, {
        action: backendAction,
      });

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

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: action === "dismiss" ? "Report dismissed" : "Post deleted and resolved",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.error("Failed to execute report action:", err);
      Swal.fire({
        icon: "error",
        title: "Action failed",
        text: err.response?.data?.message || "Could not process report action",
      });
    } finally {
      setSelectedReportId(null);
    }
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
          loading={loading}
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
