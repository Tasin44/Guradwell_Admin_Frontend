import { useState, useMemo, useEffect, useRef } from "react";
import { MoreHorizontal, Check, Shield } from "lucide-react";
import SectionTitle from "../../components/SectionTitle";

const initialPosts = [
  {
    id: 1,
    author: "Jamie Morgan",
    initials: "JM",
    avatarBg: "bg-emerald-100 text-emerald-700",
    time: "12 min ago",
    content:
      "Really pleased with the new gutter installation. The Guardwell team were quick, tidy and explained everything clearly.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9OhkjgC-rlKYECqZu2CepOvBbZImjAjaN2rckldlfwxVBOuChjnc_QJB0&s=10",
    likes: 10,
    comments: 2,
    status: "Pending",
  },
  {
    id: 2,
    author: "Noah Williams",
    initials: "NW",
    avatarBg: "bg-slate-200 text-slate-600",
    time: "36 min ago",
    content:
      "Does anyone have advice for cleaning gutters safely from a two-storey home?",
    image: null,
    likes: 10,
    comments: 1,
    status: "Pending",
  },
  {
    id: 3,
    author: "Sam Patel",
    initials: "SP",
    avatarBg: "bg-violet-100 text-violet-700",
    time: "2 hrs ago",
    content:
      "Just booked my annual inspection. Looking forward to peace of mind before the rainy season.",
    image: null,
    likes: 5,
    comments: 0,
    status: "Approved",
  },
  {
    id: 4,
    author: "Riley Lewis",
    initials: "RL",
    avatarBg: "bg-rose-100 text-rose-700",
    time: "1 day ago",
    content: "This product is a scam, don't trust Guardwell!!",
    image: null,
    likes: 0,
    comments: 3,
    status: "Rejected",
  },
  {
    id: 5,
    author: "Maya Thompson",
    initials: "MT",
    avatarBg: "bg-amber-100 text-amber-700",
    time: "3 hrs ago",
    content:
      "Our new solar-compatible gutter guards look amazing. Sharing a photo from the install day!",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=400&fit=crop",
    likes: 24,
    comments: 6,
    status: "Approved",
  },
];

const tabs = [
  { key: "Pending", label: "Pending" },
  { key: "Approved", label: "Approved" },
  { key: "Rejected", label: "Rejected" },
];

const actionLabels = {
  approve: {
    title: "Approve post?",
    desc: "This post will be visible in the community feed.",
    btn: "Approve",
    color: "bg-emerald-700 hover:bg-emerald-800",
  },
  reject: {
    title: "Reject post?",
    desc: "This post will be removed from the pending queue.",
    btn: "Reject",
    color: "bg-gray-800 hover:bg-gray-900",
  },
  restrict: {
    title: "Restrict user?",
    desc: "This user will have restricted feed access. Their post will also be rejected.",
    btn: "Restrict",
    color: "bg-red-500 hover:bg-red-600",
  },
};

const FeedModeration = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [activeTab, setActiveTab] = useState("Pending");
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const menuRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpenId(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const counts = useMemo(
    () => ({
      Pending: posts.filter((p) => p.status === "Pending").length,
      Approved: posts.filter((p) => p.status === "Approved").length,
      Rejected: posts.filter((p) => p.status === "Rejected").length,
    }),
    [posts],
  );

  const filteredPosts = useMemo(
    () => posts.filter((p) => p.status === activeTab),
    [posts, activeTab],
  );

  const handleAction = (postId, type) => {
    setConfirmAction({ postId, type });
    setMenuOpenId(null);
  };

  const confirmActionHandler = () => {
    if (!confirmAction) return;
    const { postId, type } = confirmAction;

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        if (type === "approve") return { ...p, status: "Approved" };
        if (type === "reject") return { ...p, status: "Rejected" };
        if (type === "restrict")
          return { ...p, status: "Rejected", restricted: true };
        return p;
      }),
    );
    setConfirmAction(null);
  };

  return (
    <div>
      <SectionTitle
        title={"Feed moderation"}
        description={"Review community posts before they go live"}
      />

      <div className="p-5">
        {/* Tabs */}
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

        {/* Content layout */}
        <div className="flex flex-col lg:flex-row gap-5 sm:gap-6 items-start">
          {/* Posts list */}
          <div className="flex-1 space-y-4 min-w-0 w-full">
            {filteredPosts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-10 sm:p-12 text-center text-sm text-gray-400">
                No {activeTab.toLowerCase()} posts
              </div>
            ) : (
              filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="rounded-xl border border-[#EAEDEB] bg-white shadow-[0_1px_2px_rgba(16,34,40,0.05)] overflow-hidden"
                >
                  {/* Post header */}
                  <div className="px-4 sm:px-5 pt-4 sm:pt-5 flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-semibold shrink-0 ${post.avatarBg}`}
                      >
                        {post.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {post.author}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {post.time}
                          {post.status === "Pending" && " · Pending review"}
                        </p>
                      </div>
                    </div>

                    {/* More menu */}
                    <div
                      className="relative shrink-0"
                      ref={menuOpenId === post.id ? menuRef : null}
                    >
                      <button
                        onClick={() =>
                          setMenuOpenId(menuOpenId === post.id ? null : post.id)
                        }
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>

                      {menuOpenId === post.id && (
                        <div className="absolute right-0 mt-1 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10">
                          {post.status === "Pending" && (
                            <>
                              <button
                                onClick={() => handleAction(post.id, "approve")}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleAction(post.id, "reject")}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleAction(post.id, "restrict")}
                            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                          >
                            Restrict user
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content text */}
                  <div className="px-4 sm:px-5 pt-3 pb-2">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {post.content}
                    </p>
                  </div>

                  {/* Image — only if exists */}
                  {post.image && (
                    <div className="px-4 sm:px-5 pb-3">
                      <img
                        src={post.image}
                        alt=""
                        className="w-full rounded-xl object-cover max-h-56 sm:max-h-72 border border-gray-100"
                      />
                    </div>
                  )}

                  {/* Likes / Comments — only for Approved */}
                  {post.status === "Approved" && (
                    <div className="px-4 sm:px-5 pb-3 flex items-center justify-between text-xs text-gray-400">
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comments</span>
                    </div>
                  )}

                  {/* Actions — only for Pending */}
                  {post.status === "Pending" && (
                    <div className="px-4 sm:px-5 py-3 border-t border-gray-100 flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => handleAction(post.id, "approve")}
                        className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-emerald-800 text-white text-sm font-medium rounded-lg hover:bg-emerald-900 transition-colors"
                      >
                        <Check className="w-4 h-4" strokeWidth={2.5} />
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(post.id, "reject")}
                        className="px-3.5 sm:px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleAction(post.id, "restrict")}
                        className="px-2 sm:px-3 py-2 text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                      >
                        Restrict user
                      </button>
                    </div>
                  )}

                  {/* Status badge for non-pending */}
                  {post.status !== "Pending" && (
                    <div className="px-4 sm:px-5 py-3 border-t border-gray-100">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          post.status === "Approved"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-red-50 text-red-500"
                        }`}
                      >
                        {post.status}
                        {post.restricted && " · User restricted"}
                      </span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Moderation guide sidebar */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="rounded-xl border border-[#EAEDEB] bg-white shadow-[0_1px_2px_rgba(16,34,40,0.05)] m p-4 sm:p-5 lg:sticky lg:top-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-3">
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                Moderation guide
              </h3>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                Keep the community helpful, safe and focused on home protection.
              </p>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex gap-2">
                  <span className="text-gray-300">·</span>
                  Reject unsafe advice
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-300">·</span>
                  Remove abusive comments
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-300">·</span>
                  Restrict repeat offenders
                </li>
              </ul>
              <p className="text-[11px] text-gray-400 mt-4 leading-relaxed">
                Feed restrictions never block access to the Guardwell app or
                services.
              </p>
            </div>
          </div>
        </div>

        {/* Confirmation modal */}
        {confirmAction && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white rounded-2xl w-full max-w-sm p-5 sm:p-6 shadow-xl text-center">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                {actionLabels[confirmAction.type].title}
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                {actionLabels[confirmAction.type].desc}
              </p>
              <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={() => setConfirmAction(null)}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmActionHandler}
                  className={`flex-1 px-4 py-2.5 text-sm font-medium text-white rounded-xl transition-colors ${
                    actionLabels[confirmAction.type].color
                  }`}
                >
                  {actionLabels[confirmAction.type].btn}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedModeration;
