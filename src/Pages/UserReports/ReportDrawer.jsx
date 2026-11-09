import { Shield, X } from "lucide-react";

const ReportDrawer = ({ report, onClose, onAction }) => {
  if (!report) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/30"
        onClick={onClose}
      />

      <div className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <span className="text-sm font-medium text-gray-700">
            Report {report.id}
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <div>
            <p className="text-[11px] font-medium tracking-wider text-gray-400 uppercase mb-2">
              Reported Member
            </p>
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${report.avatarBg}`}
              >
                {report.initials}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {report.member}
                </p>
                <p className="text-xs text-gray-400">
                  Reported by {report.reportedBy} · {report.time}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-rose-50 rounded-xl p-4">
            <p className="text-[11px] font-medium tracking-wider text-rose-400 uppercase mb-1.5">
              Reported Comment
            </p>
            <p className="text-sm text-gray-800 leading-relaxed">
              &ldquo;{report.comment}&rdquo;
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Commented on &ldquo;{report.postTitle}&rdquo;
            </p>
          </div>

          {report.status === "Open" ? (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                Moderation decision
              </h3>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                If this comment breaks community rules, remove it and restrict
                the member from the feed. They will still be able to access the
                Guardwell app and service features.
              </p>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onAction("ban")}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-rose-600 bg-rose-50 border border-rose-100 rounded-lg hover:bg-rose-100 transition-colors"
                >
                  <Shield className="w-3.5 h-3.5" />
                  Ban from feed
                </button>
                <button
                  onClick={() => onAction("remove")}
                  className="px-3.5 py-2 text-sm font-medium text-rose-600 bg-rose-50 border border-rose-100 rounded-lg hover:bg-rose-100 transition-colors"
                >
                  Remove comment
                </button>
                <button
                  onClick={() => onAction("dismiss")}
                  className="px-3.5 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Dismiss report
                </button>
              </div>

              <div className="mt-4 flex items-start gap-2.5 bg-emerald-50 rounded-xl p-3.5">
                <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-emerald-800">
                    Feed-only restriction
                  </p>
                  <p className="text-[11px] text-emerald-600 mt-0.5 leading-relaxed">
                    Banned members can still sign in, request inspections and
                    manage their Guardwell account.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-sm font-medium text-gray-700">
                This report has been{" "}
                <span className="capitalize">{report.status.toLowerCase()}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ReportDrawer;
