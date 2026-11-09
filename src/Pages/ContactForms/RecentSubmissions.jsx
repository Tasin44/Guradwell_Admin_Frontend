import { useState } from "react";
import { ClipboardList, ChevronRight, X } from "lucide-react";

const initialSubmissions = [
  {
    id: "FORM-001",
    title: "Tell us about your home",
    category: "Roofing",
    preview: "Would like an inspection of the rear gutter and downpipe.",
    name: "Olivia Bennett",
    email: "olivia@example.com",
    phone: "07700 900245",
    address: "42 Hawthorn Road, Bristol",
    postcode: "BS5 8QP",
    location: "Bristol, BS5",
    notes: "Would like an inspection of the rear gutter and downpipe.",
    time: "10 min ago",
    status: "New",
    unread: true,
    image:
      "https://images.unsplash.com/photo-1632759145351-1f9318958343?w=600&h=400&fit=crop",
  },
  {
    id: "FORM-002",
    title: "Contact enquiry",
    category: "Roofing",
    preview: "Would like an inspection of the rear gutter and downpipe.",
    name: "Olivia Bennett",
    email: "olivia@example.com",
    phone: "07700 900245",
    address: "42 Hawthorn Road, Bristol",
    postcode: "BS5 8QP",
    location: "Bristol, BS5",
    notes: "Interested in a full property quote.",
    time: "10 min ago",
    status: "New",
    unread: true,
    image: null,
  },
  {
    id: "FORM-003",
    title: "Inspection request",
    category: "Roofing",
    preview: "Would like an inspection of the rear gutter and downpipe.",
    name: "Olivia Bennett",
    email: "olivia@example.com",
    phone: "07700 900100",
    address: "15 Oak Lane, Bristol",
    postcode: "BS1 2AA",
    location: "Bristol, BS5",
    notes: "Annual inspection needed before winter.",
    time: "10 min ago",
    status: "Read",
    unread: false,
    image: null,
  },
];

const RecentSubmissions = () => {
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [selected, setSelected] = useState(null);
  const unreadCount = submissions.filter((submission) => submission.unread).length;

  const openSubmission = (submission) => {
    setSelected(submission);
    setSubmissions((current) =>
      current.map((item) =>
        item.id === submission.id ? { ...item, unread: false, status: "Read" } : item,
      ),
    );
  };

  return (
    <>
          <div className="flex-1 min-w-0 w-full rounded-xl border border-[#EAEDEB] bg-white shadow-[0_1px_2px_rgba(16,34,40,0.05)] overflow-hidden">
            <div className="px-4 sm:px-5 py-4 flex items-center justify-between gap-3 border-b border-gray-100">
              <div>
                <h2 className="text-sm sm:text-base font-semibold text-gray-900">
                  Recent submissions
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  New inspection and contact requests
                </p>
              </div>
              {unreadCount > 0 && (
                <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-600 whitespace-nowrap">
                  {unreadCount} unread
                </span>
              )}
            </div>

            <ul className="divide-y divide-gray-50">
              {submissions.map((sub) => (
                <li key={sub.id}>
                  <button
                    onClick={() => openSubmission(sub)}
                    className="w-full px-4 sm:px-5 py-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50/70 transition-colors text-left"
                  >
                    <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                      <ClipboardList className="w-4 h-4 text-slate-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {sub.category}
                      </p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {sub.preview}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5 truncate">
                        {sub.name} · {sub.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-gray-400 hidden sm:inline">
                        {sub.time}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

        {selected && (
          <>
            <div
              className="fixed inset-0 z-50 bg-black/30"
              onClick={() => setSelected(null)}
            />

            <div className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-700">
                  Submission details
                </span>
                <button
                  onClick={() => setSelected(null)}
                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                {/* ID + status */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-medium tracking-wider text-gray-400 uppercase">
                      {selected.id}
                    </p>
                    <h2 className="text-lg font-semibold text-gray-900 mt-0.5">
                      {selected.title}
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">
                      Submitted through the Guardwell inspection form
                    </p>
                  </div>
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${
                      selected.status === "New"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {selected.status === "New" ? "New" : "Read"}
                  </span>
                </div>

                {/* Image — conditional */}
                {selected.image && (
                  <img
                    src={selected.image}
                    alt=""
                    className="w-full aspect-[4/3] object-cover rounded-xl border border-gray-100"
                  />
                )}

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[11px] font-medium tracking-wider text-gray-400 uppercase mb-0.5">
                      Full Name
                    </p>
                    <p className="text-sm text-gray-900">{selected.name}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium tracking-wider text-gray-400 uppercase mb-0.5">
                      Phone
                    </p>
                    <p className="text-sm text-gray-900">{selected.phone}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium tracking-wider text-gray-400 uppercase mb-0.5">
                      Email
                    </p>
                    <p className="text-sm text-gray-900 break-all">
                      {selected.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium tracking-wider text-gray-400 uppercase mb-0.5">
                      Property Postcode
                    </p>
                    <p className="text-sm text-gray-900">{selected.postcode}</p>
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-medium tracking-wider text-gray-400 uppercase mb-0.5">
                    Full Address
                  </p>
                  <p className="text-sm text-gray-900">{selected.address}</p>
                </div>

                <div>
                  <p className="text-[11px] font-medium tracking-wider text-gray-400 uppercase mb-0.5">
                    Services Category
                  </p>
                  <p className="text-sm text-gray-900">{selected.category}</p>
                </div>

                <div>
                  <p className="text-[11px] font-medium tracking-wider text-gray-400 uppercase mb-0.5">
                    Anything else we should know?
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {selected.notes}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
    </>
  );
};

export default RecentSubmissions;
