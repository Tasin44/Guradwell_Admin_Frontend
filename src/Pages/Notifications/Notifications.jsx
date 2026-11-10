import { useMemo, useState, useEffect } from "react";
import {
  Bell,
  Check,
  ClipboardList,
  Clock3,
  Mail,
  Plus,
  UserRound,
  X,
} from "lucide-react";
import SectionTitle from "../../components/SectionTitle";
import adminApi from "../../lib/admin-api";
import Swal from "sweetalert2";

const Notifications = () => {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [recipients, setRecipients] = useState([]);
  const [loadingRecipients, setLoadingRecipients] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(true);

  // Recipient form state
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [addingRecipient, setAddingRecipient] = useState(false);
  const [recipientError, setRecipientError] = useState("");

  const fetchRecipients = async () => {
    setLoadingRecipients(true);
    try {
      const data = await adminApi.getNotificationRecipients();
      setRecipients(data || []);
    } catch (err) {
      console.error("Failed to load recipients:", err);
    } finally {
      setLoadingRecipients(false);
    }
  };

  const fetchNotificationsFromTickets = async () => {
    setLoadingNotifications(true);
    try {
      const tickets = await adminApi.getTickets({ limit: 20 });
      const items = (tickets || []).map((t) => {
        const formattedDate = t.created_at
          ? new Date(t.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "-";

        return {
          id: t.id,
          title: `Service Request #${t.request_code || t.id}`,
          summary: t.description ? t.description.slice(0, 75) + "..." : "New request submitted",
          detail: `${t.customer_name || "Customer"} submitted a service request for ${t.service_category || "gutter service"} at ${t.full_address || "address"} (${t.postcode || ""}). Notes: ${t.description || "None"}. Contact: ${t.customer_phone || ""} ${t.customer_email || ""}`,
          category: "Service ticket",
          from: t.customer_name || "Customer",
          time: formattedDate,
          unread: t.status === "submitted",
        };
      });
      setNotifications(items);
    } catch (err) {
      console.error("Failed to load notifications:", err);
    } finally {
      setLoadingNotifications(false);
    }
  };

  useEffect(() => {
    fetchRecipients();
    fetchNotificationsFromTickets();
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter((item) => item.unread).length,
    [notifications],
  );

  const visibleNotifications = useMemo(() => {
    if (filter === "new") return notifications.filter((item) => item.unread);
    return notifications;
  }, [notifications, filter]);

  const openNotification = (item) => {
    setSelected(item);
    setNotifications((current) =>
      current.map((n) => (n.id === item.id ? { ...n, unread: false } : n)),
    );
  };

  const addRecipient = async () => {
    const name = newName.trim();
    const email = newEmail.trim().toLowerCase();

    if (!name || !email) {
      setRecipientError("Please enter both name and email.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setRecipientError("Enter a valid email address.");
      return;
    }

    if (recipients.some((r) => r.email?.toLowerCase() === email)) {
      setRecipientError("This email is already in the recipient list.");
      return;
    }

    setAddingRecipient(true);
    try {
      const created = await adminApi.createNotificationRecipient({
        name,
        email,
      });

      setRecipients((prev) => [...prev, created]);
      setNewName("");
      setNewEmail("");
      setRecipientError("");

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Recipient added successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.error("Failed to add recipient:", err);
      setRecipientError(err.response?.data?.message || "Failed to add recipient");
    } finally {
      setAddingRecipient(false);
    }
  };

  return (
    <div>
      <SectionTitle
        title="Notifications"
        description="Review updates and manage who receives email alerts."
      />

      <div className="p-5">
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_380px] gap-5 items-start">
          <section className="rounded-xl border border-[#EAEDEB] bg-white shadow-[0_1px_2px_rgba(16,34,40,0.05)] overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-gray-900">All notifications</h2>
                <p className="text-xs text-gray-400 mt-0.5">Updates from across Guardwell</p>
              </div>
              <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl" aria-label="Filter notifications">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${filter === "all" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >All</button>
                <button
                  onClick={() => setFilter("new")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer ${filter === "new" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >New <span className={`min-w-5 h-5 px-1 rounded-full inline-flex items-center justify-center text-[10px] ${filter === "new" ? "bg-[#1a2744] text-white" : "bg-gray-200 text-gray-600"}`}>{unreadCount}</span></button>
              </div>
            </div>

            {loadingNotifications ? (
              <div className="px-6 py-14 text-center text-sm text-gray-400">Loading notifications...</div>
            ) : visibleNotifications.length ? (
              <ul className="divide-y divide-gray-100">
                {visibleNotifications.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => openNotification(item)}
                      className="w-full text-left px-5 py-4 flex items-start gap-3 hover:bg-gray-50/70 transition-colors cursor-pointer"
                    >
                      <span className={`mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.unread ? "bg-blue-50 text-[#1a4b82]" : "bg-gray-100 text-gray-500"}`}>
                        <ClipboardList className="w-4 h-4" />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">{item.title}</span>
                          {item.unread && <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" aria-label="New" />}
                        </span>
                        <span className="block text-sm text-gray-500 mt-1">{item.summary}</span>
                        <span className="flex items-center gap-1.5 text-xs text-gray-400 mt-2"><Clock3 className="w-3.5 h-3.5" />{item.from} <span aria-hidden="true">·</span> {item.time}</span>
                      </span>
                      {item.unread && <span className="shrink-0 px-2 py-1 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700">New</span>}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-6 py-14 text-center">
                <Check className="w-8 h-8 text-emerald-500 mx-auto" />
                <p className="text-sm font-medium text-gray-700 mt-3">You’re all caught up</p>
                <p className="text-xs text-gray-400 mt-1">There are no new notifications.</p>
              </div>
            )}
          </section>

          <section className="rounded-xl border border-[#EAEDEB] bg-white shadow-[0_1px_2px_rgba(16,34,40,0.05)] overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">Notification team</h2>
              <p className="text-xs text-gray-400 mt-0.5">{recipients.length} active {recipients.length === 1 ? "recipient" : "recipients"}</p>
            </div>

            {loadingRecipients ? (
              <div className="p-6 text-center text-sm text-gray-400">Loading team...</div>
            ) : (
              <ul className="px-4 divide-y divide-gray-100">
                {recipients.map((recipient) => (
                  <li key={recipient.id} className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-semibold shrink-0">
                        {recipient.name ? recipient.name.charAt(0).toUpperCase() : "R"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{recipient.name}</p>
                        <p className="text-xs text-gray-400 truncate mt-0.5">{recipient.email}</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                        Active
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="m-4 mt-2 p-4 bg-[#f4f7f5] rounded-xl">
              <h3 className="text-sm font-medium text-gray-800">Add a team member</h3>
              <p className="text-xs text-gray-400 mt-1">They’ll receive email alerts for new service requests.</p>
              <div className="mt-3 flex flex-col gap-2">
                <label className="sr-only" htmlFor="notification-recipient-name">Recipient name</label>
                <input
                  id="notification-recipient-name"
                  type="text"
                  value={newName}
                  onChange={(event) => { setNewName(event.target.value); setRecipientError(""); }}
                  placeholder="Name"
                  className="w-full px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
                />
                <label className="sr-only" htmlFor="notification-recipient-email">Recipient email</label>
                <input
                  id="notification-recipient-email"
                  type="email"
                  value={newEmail}
                  onChange={(event) => { setNewEmail(event.target.value); setRecipientError(""); }}
                  placeholder="name@guardwell.co.uk"
                  className="w-full px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              {recipientError && <p className="text-xs text-red-600 mt-2" role="alert">{recipientError}</p>}
              <button
                onClick={addRecipient}
                disabled={addingRecipient}
                className="w-full mt-2 px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                {addingRecipient ? "Adding..." : "Add recipient"}
              </button>
              <p className="text-[11px] text-gray-400 mt-2 flex items-center gap-1.5">
                <Mail className="w-3 h-3" />All team members receive new notification alerts.
              </p>
            </div>
          </section>
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center p-4"
          onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="notification-detail-title"
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Bell className="w-4 h-4" />Notification details
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full cursor-pointer"
                aria-label="Close notification details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6">
              <span className="inline-flex px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                {selected.category}
              </span>
              <h2 id="notification-detail-title" className="text-xl font-semibold text-gray-900 mt-3">
                {selected.title}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mt-3">
                {selected.detail}
              </p>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <span className="inline-flex items-center gap-1.5"><UserRound className="w-3.5 h-3.5" />{selected.from}</span>
                <span className="inline-flex items-center gap-1.5"><Clock3 className="w-3.5 h-3.5" />{selected.time}</span>
              </div>
            </div>
            <div className="px-5 py-3 bg-gray-50 flex justify-end">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 text-sm font-medium text-white bg-[#1a2744] hover:bg-[#243556] rounded-xl cursor-pointer"
              >
                Done
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Notifications;
