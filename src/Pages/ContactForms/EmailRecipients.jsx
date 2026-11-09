import { useState } from "react";
import { X, Pencil, Trash2, Check } from "lucide-react";

const initialRecipients = [
  {
    id: 1,
    email: "alex@guardwell.co.uk",
    role: "Primary recipient",
    isPrimary: true,
    active: true,
  },
  {
    id: 2,
    email: "service@guardwell.co.uk",
    role: "Team member",
    isPrimary: false,
    active: true,
  },
];



const EmailRecipients = () => {
  const [recipients, setRecipients] = useState(initialRecipients);
  const [newEmail, setNewEmail] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleAddEmail = () => {
    const email = newEmail.trim().toLowerCase();
    if (!email || !email.includes("@") || recipients.some((item) => item.email === email)) return;
    setRecipients((current) => [...current, { id: Date.now(), email, role: "Team member", isPrimary: false, active: true }]);
    setNewEmail("");
  };
  const handleRemove = (id) => setRecipients((current) => current.filter((item) => item.id !== id || item.isPrimary));
  const handleToggleActive = (id) => setRecipients((current) => current.map((item) => item.id === id && !item.isPrimary ? { ...item, active: !item.active } : item));
  const startEdit = (recipient) => { setEditingId(recipient.id); setEditValue(recipient.email); };
  const saveEdit = () => {
    const email = editValue.trim().toLowerCase();
    if (!email || !email.includes("@")) return;
    setRecipients((current) => current.map((item) => item.id === editingId ? { ...item, email } : item));
    setEditingId(null); setEditValue("");
  };
  const cancelEdit = () => { setEditingId(null); setEditValue(""); };

  return (

          <div className="w-full lg:w-80 shrink-0 rounded-xl border border-[#EAEDEB] bg-white shadow-[0_1px_2px_rgba(16,34,40,0.05)] overflow-hidden">
            <div className="px-4 sm:px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900">
                Email recipients
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                People notified on submission
              </p>
            </div>

            <ul className="divide-y divide-gray-50">
              {recipients.map((r) => (
                <li key={r.id} className="px-4 sm:px-5 py-3">
                  {editingId === r.id ? (
                    /* Edit mode */
                    <div className="flex items-center gap-2">
                      <input
                        type="email"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
                        autoFocus
                      />
                      <button
                        onClick={saveEdit}
                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="p-1.5 text-gray-400 hover:bg-gray-50 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      {/* Avatar letter */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
                          r.active
                            ? "bg-slate-100 text-slate-600"
                            : "bg-gray-50 text-gray-300"
                        }`}
                      >
                        {r.email.charAt(0).toUpperCase()}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-medium truncate ${
                            r.active
                              ? "text-gray-900"
                              : "text-gray-400 line-through"
                          }`}
                        >
                          {r.email}
                        </p>
                        <p className="text-xs text-gray-400">
                          {r.role}
                          {!r.active && " · Inactive"}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 shrink-0">
                        {/* Edit */}
                        <button
                          onClick={() => startEdit(r)}
                          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>

                        {/* Toggle active (non-primary only) */}
                        {!r.isPrimary && (
                          <button
                            onClick={() => handleToggleActive(r.id)}
                            className={`text-[10px] font-medium px-2 py-1 rounded-md transition-colors ${
                              r.active
                                ? "text-amber-600 bg-amber-50 hover:bg-amber-100"
                                : "text-emerald-600 bg-emerald-50 hover:bg-emerald-100"
                            }`}
                          >
                            {r.active ? "Off" : "On"}
                          </button>
                        )}

                        {/* Remove (non-primary only) */}
                        {!r.isPrimary && (
                          <button
                            onClick={() => handleRemove(r.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Add email */}
            <div className="px-4 sm:px-5 py-4 border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddEmail()}
                  placeholder="team@guardwell.co.uk"
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                />
                <button
                  onClick={handleAddEmail}
                  className="px-4 py-2 bg-[#1a2744] text-white text-sm font-medium rounded-xl hover:bg-[#243556] transition-colors shrink-0"
                >
                  Add
                </button>
              </div>
              <p className="text-[11px] text-gray-400 mt-2">
                All active recipients receive an email as soon as a form is
                submitted.
              </p>
            </div>
          </div>
  );
};

export default EmailRecipients;
