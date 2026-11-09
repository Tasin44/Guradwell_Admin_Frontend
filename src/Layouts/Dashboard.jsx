import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  LogOut,
  LayoutGrid,
  UsersRound,
  Ticket,
  Bookmark,
  Share2,
  ShieldCheck,
  ClipboardList,
  Bell,
  Shield,
  ArrowRight,
  Menu,
  X,
  BellDot,
} from "lucide-react";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileNotificationsOpen, setIsMobileNotificationsOpen] = useState(false);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
    setIsMobileNotificationsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    setIsSidebarOpen(false);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Logged out successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/signin");
  };

  const Menus = [
    {
      title: "Overview",
      path: "/",
      icon: LayoutGrid,
    },
    {
      title: "Customers",
      path: "/customers-management",
      icon: UsersRound,
    },
    {
      title: "Service tickets",
      path: "/tickets",
      icon: Ticket,
    },
    {
      title: "Referrals & coupons",
      path: "/referrals",
      icon: Share2,
    },
    {
      title: "User reports",
      path: "/user-reports",
      icon: ClipboardList,
    },
    {
      title: "Notifications",
      path: "/notifications",
      icon: Bell,
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* ===== Mobile Overlay ===== */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ===== Sidebar ===== */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-60 bg-white border-r border-gray-200
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between gap-1 px-5 pt-6 pb-2">
          <div className="flex items-center gap-1">
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
              <img src="/src/assets/logo/icon.svg" alt="Guardwell" />
            </div>
            <span className="text-xl font-semibold text-[#002457]">
              Guardwell
            </span>
          </div>
          {/* Close button — mobile only */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Portal Label */}
        <p className="px-5 pt-5 pb-2 text-[11px] font-medium tracking-wider text-gray-400 uppercase">
          Admin Portal
        </p>

        {/* Menu */}
        <ul className="px-3 flex-1 overflow-y-auto space-y-0.5">
          {Menus.map((Menu, index) => {
            const isActive = location.pathname === Menu.path;
            const Icon = Menu.icon;

            return (
              <Link
                to={Menu.path}
                key={index}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex rounded-xl py-2.5 px-3 cursor-pointer text-sm items-center transition-colors ${
                  isActive
                    ? "bg-[#EDF3F8] text-[#002457]"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                }`}
              >
                <li className="flex items-center gap-x-3 w-full">
                  <Icon
                    className="w-[18px] h-[18px] shrink-0"
                    strokeWidth={1.75}
                  />
                  <span className="font-medium">{Menu.title}</span>
                </li>
              </Link>
            );
          })}
        </ul>

        {/* User Profile + Logout */}
        <div className="px-3 pb-4 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-xs font-semibold text-gray-600">
              AT
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Alex Turner
              </p>
              <p className="text-xs text-gray-400 truncate">Operations admin</p>
            </div>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors shrink-0"
              title="Logout"
            >
              <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </aside>

      {/* ===== Main Content ===== */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-60">
        {/* Mobile Top Bar */}
        <header className="sticky top-0 z-30 flex items-center gap-3 bg-white border-b border-gray-200 px-4 py-3 md:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-1 rounded-lg hover:bg-gray-100 text-gray-700"
            aria-label="Open sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 flex items-center justify-center">
              <img src="/src/assets/logo/icon.svg" alt="" className="w-full h-full" />
            </div>
            <span className="text-base font-semibold text-[#002457]">
              Guardwell
            </span>
          </div>
          <div className="relative ml-auto">
            <button
              onClick={() => setIsMobileNotificationsOpen((open) => !open)}
              className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-700"
              aria-label="Open notifications"
              aria-expanded={isMobileNotificationsOpen}
            >
              <BellDot className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
            </button>
            {isMobileNotificationsOpen && (
              <div className="absolute right-0 top-full mt-2 w-[min(20rem,calc(100vw-1.5rem))] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <h2 className="text-sm font-semibold text-gray-900">Notifications</h2>
                  <Link
                    to="/notifications"
                    onClick={() => setIsMobileNotificationsOpen(false)}
                    className="text-xs font-medium text-[#002457] hover:underline"
                  >
                    Manage
                  </Link>
                </div>
                <ul className="py-1 max-h-72 overflow-y-auto">
                  {[
                    ["New service request", "Jamie Morgan · 12 min ago"],
                    ["Post waiting for review", "Community feed · 26 min ago"],
                    ["Inspection form submitted", "Olivia Bennett · 41 min ago"],
                  ].map(([title, meta]) => (
                    <li key={title}>
                      <Link
                        to="/notifications"
                        onClick={() => setIsMobileNotificationsOpen(false)}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50"
                      >
                        <span className="w-2 h-2 mt-1.5 rounded-full bg-red-500 shrink-0" />
                        <span>
                          <span className="block text-sm font-medium text-gray-900">{title}</span>
                          <span className="block text-xs text-gray-400 mt-0.5">{meta}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto h-[100vh] md:h-auto bg-[#F7F8F7]">
          <Outlet />
        </main>
      </div>

      {/* ===== Logout Modal ===== */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white p-6 sm:p-10 text-center rounded-lg shadow-lg max-w-sm w-full">
            <div className="flex justify-center mb-3">
              <div className="bg-red-50 h-12 w-12 flex items-center justify-center text-red-400 rounded-full">
                <LogOut />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Are you sure?</h3>
            <p className="text-sm text-gray-600 mb-4">You want to logout!</p>
            <div className="flex flex-col-reverse sm:flex-row justify-center gap-3 mt-8 sm:mt-10">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2.5 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                No, Cancel!
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="px-4 py-2.5 bg-[#fa5252] text-white rounded-md hover:bg-[#e04742] transition-colors"
              >
                Yes, Logout!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
