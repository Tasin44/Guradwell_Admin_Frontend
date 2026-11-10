import { useState, useEffect } from "react";
import SectionTitle from "../../components/SectionTitle";
import adminApi from "../../lib/admin-api";
import giftImg from "../../assets/image/gift.svg";
import Swal from "sweetalert2";

const statusStyles = {
  Paid: "bg-emerald-50 text-emerald-600",
  Pending: "bg-amber-50 text-amber-600",
};

const avatarBgs = [
  "bg-emerald-100 text-emerald-700",
  "bg-blue-100 text-blue-700",
  "bg-rose-100 text-rose-700",
  "bg-violet-100 text-violet-700",
  "bg-amber-100 text-amber-700",
];

const ReferralsCoupons = () => {
  const [couponAmount, setCouponAmount] = useState(100);
  const [inputAmount, setInputAmount] = useState("100");
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingCoupon, setSavingCoupon] = useState(false);
  const [confirmPaid, setConfirmPaid] = useState(null);

  const fetchCouponAndReferrals = async () => {
    setLoading(true);
    try {
      const [couponRes, refsRes] = await Promise.all([
        adminApi.getCouponAmount(),
        adminApi.getReferrals({ limit: 100 }),
      ]);

      if (couponRes && couponRes.coupon_amount !== undefined) {
        setCouponAmount(couponRes.coupon_amount);
        setInputAmount(couponRes.coupon_amount.toString());
      }

      if (refsRes) {
        const mapped = refsRes.map((r, idx) => {
          const initials = r.referrer_name
            ? r.referrer_name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()
            : "RF";

          const formattedDate = r.qualified_date
            ? new Date(r.qualified_date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            : "-";

          return {
            id: r.id,
            name: r.referrer_name,
            initials,
            avatarBg: avatarBgs[idx % avatarBgs.length],
            code: r.referral_code,
            qualified: formattedDate,
            bonus: r.bonus,
            status: r.status || (r.bonus_status === "paid" ? "Paid" : "Pending"),
            bonus_status: r.bonus_status,
          };
        });
        setReferrals(mapped);
      }
    } catch (err) {
      console.error("Failed to fetch referral data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCouponAndReferrals();
  }, []);

  const pendingCount = referrals.filter((r) => r.status === "Pending").length;

  const handleSaveAmount = async () => {
    const value = parseFloat(inputAmount);
    if (isNaN(value) || value <= 0) {
      Swal.fire({ icon: "error", title: "Invalid Amount", text: "Please enter a valid amount greater than 0" });
      return;
    }

    setSavingCoupon(true);
    try {
      await adminApi.setCouponAmount({ coupon_amount: value });
      setCouponAmount(value);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Coupon amount updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.error("Failed to update coupon amount:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Failed to update coupon amount",
      });
    } finally {
      setSavingCoupon(false);
    }
  };

  const handleMarkPaid = (referral) => {
    setConfirmPaid(referral);
  };

  const confirmMarkPaid = async () => {
    if (!confirmPaid) return;

    try {
      await adminApi.updateReferralStatus(confirmPaid.id, {
        bonus_status: "paid",
      });

      setReferrals((prev) =>
        prev.map((r) =>
          r.id === confirmPaid.id
            ? { ...r, status: "Paid", bonus_status: "paid" }
            : r,
        ),
      );

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Bonus marked as paid",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.error("Failed to mark referral as paid:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Failed to update referral status",
      });
    } finally {
      setConfirmPaid(null);
    }
  };

  return (
    <div>
      <SectionTitle
        title={"Referrals & coupons"}
        description={"Manage referral rewards and coupon amounts"}
      />
      <div className="p-5">
        {/* Top cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-5 sm:mb-6">
          {/* Current coupon reward */}
          <div className="bg-[#FFE0E0] rounded-xl shadow-[0_1px_2px_rgba(16,34,40,0.05)] p-5 sm:p-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-medium tracking-wider text-rose-400 uppercase mb-1">
                Current Coupon Reward
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-gray-900">
                ${couponAmount}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Applied to each qualified referral
              </p>
            </div>
            <div className="w-14 h-14 sm:w-16 sm:h-16">
              <img src={giftImg} alt="Gift" />
            </div>
          </div>

          {/* Coupon amount input */}
          <div className="rounded-xl border border-[#EAEDEB] bg-white shadow-[0_1px_2px_rgba(16,34,40,0.05)] p-5 sm:p-6">
            <h3 className="text-base font-semibold text-gray-900">
              Coupon amount
            </h3>
            <p className="text-xs text-gray-500 mt-0.5 mb-4">
              Set the value for new referral coupons.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  $
                </span>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={inputAmount}
                  onChange={(e) => setInputAmount(e.target.value)}
                  className="w-full pl-7 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all"
                  placeholder="100"
                />
              </div>
              <button
                onClick={handleSaveAmount}
                disabled={savingCoupon}
                className="px-5 py-2.5 bg-[#1a2744] text-white text-sm font-medium rounded-xl hover:bg-[#243556] transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
              >
                {savingCoupon ? "Saving..." : "Save amount"}
              </button>
            </div>
          </div>
        </div>

        {/* Referral bonuses table */}
        <div className="rounded-xl border border-[#EAEDEB] bg-white shadow-[0_1px_2px_rgba(16,34,40,0.05)] overflow-hidden">
          {/* Table header */}
          <div className="px-4 sm:px-5 py-4 flex items-center justify-between gap-3 border-b border-gray-100">
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900">
                Referral bonuses
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Mark rewards as paid once processed
              </p>
            </div>
            {pendingCount > 0 && (
              <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-600 whitespace-nowrap shrink-0">
                {pendingCount} pending
              </span>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-gray-50">
                  {[
                    "Referrer",
                    "Referral Code",
                    "Qualified",
                    "Bonus",
                    "Status",
                    "",
                  ].map((col, i) => (
                    <th
                      key={i}
                      className="px-4 sm:px-5 py-3 text-[11px] font-medium tracking-wider text-gray-400 uppercase whitespace-nowrap"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-sm text-gray-400">
                      Loading referrals...
                    </td>
                  </tr>
                ) : referrals.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-sm text-gray-400">
                      No referral records found
                    </td>
                  </tr>
                ) : (
                  referrals.map((ref) => (
                    <tr
                      key={ref.id}
                      className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
                    >
                      {/* Referrer */}
                      <td className="px-4 sm:px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0 ${ref.avatarBg}`}
                          >
                            {ref.initials}
                          </div>
                          <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                            {ref.name}
                          </span>
                        </div>
                      </td>

                      {/* Code */}
                      <td className="px-4 sm:px-5 py-4 text-sm font-medium text-[#1a2744] whitespace-nowrap">
                        {ref.code}
                      </td>

                      {/* Qualified */}
                      <td className="px-4 sm:px-5 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {ref.qualified}
                      </td>

                      {/* Bonus */}
                      <td className="px-4 sm:px-5 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                        ${ref.bonus}
                      </td>

                      {/* Status */}
                      <td className="px-4 sm:px-5 py-4">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                            statusStyles[ref.status] || statusStyles.Pending
                          }`}
                        >
                          {ref.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-4 sm:px-5 py-4 text-right">
                        {ref.status === "Pending" ? (
                          <button
                            onClick={() => handleMarkPaid(ref)}
                            className="text-sm font-medium text-[#1a2744] hover:underline whitespace-nowrap cursor-pointer"
                          >
                            Mark paid
                          </button>
                        ) : (
                          <span className="text-sm text-gray-400">Processed</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mark Paid Confirmation Modal */}
        {confirmPaid && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Mark as paid?
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                Confirm that the{" "}
                <span className="font-medium text-gray-700">
                  ${confirmPaid.bonus}
                </span>{" "}
                bonus for{" "}
                <span className="font-medium text-gray-700">
                  {confirmPaid.name}
                </span>{" "}
                has been processed.
              </p>
              <p className="text-xs text-gray-400 mb-6">
                Code: {confirmPaid.code}
              </p>
              <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={() => setConfirmPaid(null)}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmMarkPaid}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-emerald-700 rounded-xl hover:bg-emerald-800 transition-colors cursor-pointer"
                >
                  Yes, mark paid
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferralsCoupons;
