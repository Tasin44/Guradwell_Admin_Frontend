import { useMemo, useState } from "react";
import {
  Bell,
  Check,
  ClipboardList,
  Clock3,
  Mail,
  Pencil,
  Plus,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import SectionTitle from "../../components/SectionTitle";

const initialNotifications = [
  {
    id: 1,
    title: "New service request",
    summary: "A customer submitted a new service request.",
    detail: "Jamie Morgan requested help with a roof inspection at 18 Cedar Road, Bristol. The request is ready for your team to review.",
    category: "Service ticket",
    from: "Jamie Morgan",
    time: "12 min ago",
    unread: true,
  },
  {
    id: 2,
    title: "Post waiting for review",
    summary: "A community post needs moderation.",
    detail: "A new community feed post was reported for review. Open Feed moderation to check the post and decide whether it should remain visible.",
    category: "Feed moderation",
    from: "Community feed",
    time: "26 min ago",
    unread: true,
  },
  {
    id: 3,
    title: "Inspection form submitted",
    summary: "Olivia Bennett sent a property inspection request.",
    detail: "Olivia Bennett submitted an inspection form for 42 Hawthorn Road, Bristol. She would like the rear gutter and downpipe inspected.",
    category: "Contact form",
    from: "Olivia Bennett",
    time: "41 min ago",
    unread: true,
  },
  {
    id: 4,
    title: "Ticket status updated",
    summary: "A service ticket has been marked as resolved.",
    detail: "The team marked ticket GW-2048 as resolved. You can review its history in Service tickets.",
    category: "Service ticket",
    from: "Support team",
    time: "Yesterday",
    unread: false,
  },
];

const initialRecipients = [
  { id: 1, name: "alex", email: "alex@guardwell.co.uk", role: "Admin" },
  { id: 2, name: "service", email: "service@guardwell.co.uk", role: "Member" },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [recipients, setRecipients] = useState(initialRecipients);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [recipientError, setRecipientError] = useState("");

  const unreadCount = notifications.filter((item) => item.unread).length;
  const visibleNotifications = useMemo(
    () => (filter === "new" ? notifications.filter((item) => item.unread) : notifications),
    [filter, notifications],
  );

  const openNotification = (item) => {
    setSelected(item);
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === item.id ? { ...notification, unread: false } : notification,
      ),
    );
  };

  const addRecipient = () => {
    const name = newName.trim();
    const email = newEmail.trim().toLowerCase();
    if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setRecipientError("Enter a name and a valid email address.");
      return;
    }
    if (recipients.some((recipient) => recipient.email.toLowerCase() === email)) {
      setRecipientError("This email is already on the notification team.");
      return;
    }
    setRecipients((current) => [
      ...current,
      { id: Date.now(), name, email, role: "Member" },
    ]);
    setNewName("");
    setNewEmail("");
    setRecipientError("");
  };

  const startEdit = (recipient) => {
    setEditingId(recipient.id);
    setEditName(recipient.name);
    setEditEmail(recipient.email);
    setRecipientError("");
  };

  const saveEdit = (id) => {
    const email = editEmail.trim().toLowerCase();
    const name = editName.trim();
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setRecipientError("Enter a name and a valid email address.");
      return;
    }
    if (recipients.some((recipient) => recipient.id !== id && recipient.email.toLowerCase() === email)) {
      setRecipientError("This email is already on the notification team.");
      return;
    }
    setRecipients((current) => current.map((recipient) =>
      recipient.id === id ? { ...recipient, name, email } : recipient,
    ));
    setEditingId(null);
    setRecipientError("");
  };

  const removeRecipient = (id) => {
    setRecipients((current) => current.filter((recipient) => recipient.id !== id));
    if (editingId === id) setEditingId(null);
    setRecipientError("");
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
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === "all" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >All</button>
                <button
                  onClick={() => setFilter("new")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition-colors ${filter === "new" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >New <span className={`min-w-5 h-5 px-1 rounded-full inline-flex items-center justify-center text-[10px] ${filter === "new" ? "bg-[#1a2744] text-white" : "bg-gray-200 text-gray-600"}`}>{unreadCount}</span></button>
              </div>
            </div>

            {visibleNotifications.length ? (
              <ul className="divide-y divide-gray-100">
                {visibleNotifications.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => openNotification(item)}
                      className="w-full text-left px-5 py-4 flex items-start gap-3 hover:bg-gray-50/70 transition-colors"
                    >
                      <span className={`mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.unread ? "bg-blue-50 text-[#1a4b82]" : "bg-gray-100 text-gray-500"}`}>
                        {item.category === "Service ticket" ? <ClipboardList className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
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

            <ul className="px-4 divide-y divide-gray-100">
              {recipients.map((recipient) => (
                <li key={recipient.id} className="py-3">
                  {editingId === recipient.id ? (
                    <div className="space-y-2">
                      <input aria-label="Recipient name" value={editName} onChange={(event) => setEditName(event.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-100" placeholder="Name" />
                      <input aria-label="Recipient email" type="email" value={editEmail} onChange={(event) => setEditEmail(event.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-100" placeholder="Email address" />
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setEditingId(null)} className="px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-100 rounded-lg">Cancel</button>
                        <button onClick={() => saveEdit(recipient.id)} className="px-3 py-1.5 text-xs text-white bg-[#1a2744] hover:bg-[#243556] rounded-lg">Save</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-semibold shrink-0">{recipient.name.charAt(0).toUpperCase()}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{recipient.name}</p>
                        <p className="text-xs text-gray-400 truncate mt-0.5">{recipient.email}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${recipient.role === "Admin" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>{recipient.role}</span>
                      <div className="flex items-center gap-0.5">
                        <button onClick={() => startEdit(recipient)} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg" aria-label={`Edit ${recipient.email}`} title="Edit"><Pencil className="w-3.5 h-3.5" /></button>
                        <button onClick={() => removeRecipient(recipient.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg" aria-label={`Remove ${recipient.email}`} title="Remove"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="m-4 mt-2 p-4 bg-[#f4f7f5] rounded-xl">
              <h3 className="text-sm font-medium text-gray-800">Add a team member</h3>
              <p className="text-xs text-gray-400 mt-1">They’ll receive email alerts for new notifications.</p>
              <div className="mt-3 flex gap-2">
                <label className="sr-only" htmlFor="notification-recipient-name">Recipient name</label>
                <input id="notification-recipient-name" type="text" value={newName} onChange={(event) => { setNewName(event.target.value); setRecipientError(""); }} onKeyDown={(event) => event.key === "Enter" && addRecipient()} placeholder="Name" className="min-w-0 flex-1 px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100" />
                <label className="sr-only" htmlFor="notification-recipient-email">Recipient email</label>
                <input id="notification-recipient-email" type="email" value={newEmail} onChange={(event) => { setNewEmail(event.target.value); setRecipientError(""); }} onKeyDown={(event) => event.key === "Enter" && addRecipient()} placeholder="name@guardwell.co.uk" className="min-w-0 flex-1 px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100" />
              </div>
              {recipientError && <p className="text-xs text-red-600 mt-2" role="alert">{recipientError}</p>}
              <button onClick={addRecipient} className="w-full mt-2 px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"><Plus className="w-4 h-4" />Add recipient</button>
              <p className="text-[11px] text-gray-400 mt-2 flex items-center gap-1.5"><Mail className="w-3 h-3" />All team members receive new notification alerts.</p>
            </div>
          </section>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center p-4" onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}>
          <section role="dialog" aria-modal="true" aria-labelledby="notification-detail-title" className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700"><Bell className="w-4 h-4" />Notification details</div>
              <button onClick={() => setSelected(null)} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full" aria-label="Close notification details"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6">
              <span className="inline-flex px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">{selected.category}</span>
              <h2 id="notification-detail-title" className="text-xl font-semibold text-gray-900 mt-3">{selected.title}</h2>
              <p className="text-sm text-gray-600 leading-relaxed mt-3">{selected.detail}</p>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <span className="inline-flex items-center gap-1.5"><UserRound className="w-3.5 h-3.5" />{selected.from}</span>
                <span className="inline-flex items-center gap-1.5"><Clock3 className="w-3.5 h-3.5" />{selected.time}</span>
              </div>
            </div>
            <div className="px-5 py-3 bg-gray-50 flex justify-end"><button onClick={() => setSelected(null)} className="px-4 py-2 text-sm font-medium text-white bg-[#1a2744] hover:bg-[#243556] rounded-xl">Done</button></div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Notifications;
