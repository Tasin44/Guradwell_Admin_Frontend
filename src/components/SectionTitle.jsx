import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";

const notifications = [
  {
    id: 1,
    title: "New service request",
    meta: "Jamie Morgan · 12 min ago",
    unread: true,
  },
  {
    id: 2,
    title: "Post waiting for review",
    meta: "Community feed · 26 min ago",
    unread: true,
  },
  {
    id: 3,
    title: "Inspection form submitted",
    meta: "Olivia Bennett · 41 min ago",
    unread: true,
  },
];

const SectionTitle = ({ title, description }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="hidden md:flex sticky top-0 z-20 p-5 bg-white items-center justify-between border-b border-gray-200">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-[#4A5565] text-sm">{description}</p>
      </div>

      {/* Notification Bell + Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex items-center justify-center border border-gray-300 p-2 rounded-full transition-colors ${
            isOpen ? "bg-gray-100 border-gray-400" : "hover:bg-gray-50"
          }`}
        >
          <Bell size={20} className="text-gray-700" />
          {/* Unread indicator */}
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="text-base font-semibold text-gray-900">
                Notifications
              </h3>
              <Link
                to="/notifications"
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-[#002457] hover:underline"
              >
                Manage
              </Link>
            </div>

            {/* List */}
            <ul className="py-2 max-h-80 overflow-y-auto">
              {notifications.map((item) => (
                <li
                  key={item.id}
                  className="px-5 py-3.5 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <Link to="/notifications" className="flex items-start gap-3">
                    {/* Pink dot */}
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-red-500 shrink-0" />

                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {item.meta}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionTitle;
