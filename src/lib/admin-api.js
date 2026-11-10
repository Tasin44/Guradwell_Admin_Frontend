import apiClient from "./api-client";

export const adminApi = {
  // 1. Dashboard Overview
  getDashboardOverview: async () => {
    const res = await apiClient.get("/admin/dashboard/overview");
    return res.data?.data;
  },

  // 2. Customers
  getCustomers: async (params = {}) => {
    const res = await apiClient.get("/admin/customers", { params });
    return res.data?.data;
  },
  getCustomerDetail: async (userId) => {
    const res = await apiClient.get(`/admin/customers/${userId}`);
    return res.data?.data;
  },
  updateCustomerStatus: async (userId, payload) => {
    const res = await apiClient.patch(`/admin/customers/${userId}/status`, payload);
    return res.data?.data;
  },

  // 3. Service Tickets
  getTickets: async (params = {}) => {
    const res = await apiClient.get("/admin/tickets", { params });
    return res.data?.data;
  },
  updateTicketStatus: async (ticketId, payload) => {
    const res = await apiClient.patch(`/admin/tickets/${ticketId}/status`, payload);
    return res.data?.data;
  },

  // 4. Referrals & Coupons
  getReferrals: async (params = {}) => {
    const res = await apiClient.get("/admin/referrals", { params });
    return res.data?.data;
  },
  updateReferralStatus: async (referralId, payload) => {
    const res = await apiClient.patch(`/admin/referrals/${referralId}/status`, payload);
    return res.data?.data;
  },
  getCouponAmount: async () => {
    const res = await apiClient.get("/admin/coupons/amount");
    return res.data?.data;
  },
  setCouponAmount: async (payload) => {
    const res = await apiClient.post("/admin/coupons/amount", payload);
    return res.data?.data;
  },

  // 5. User Reports
  getReports: async (params = {}) => {
    const res = await apiClient.get("/admin/reports", { params });
    return res.data?.data;
  },
  handleReportAction: async (reportId, payload) => {
    const res = await apiClient.post(`/admin/reports/${reportId}/action`, payload);
    return res.data?.data;
  },

  // 6. Notification Recipients
  getNotificationRecipients: async () => {
    const res = await apiClient.get("/quotes/recipients/all");
    return res.data?.data;
  },
  createNotificationRecipient: async (payload) => {
    const res = await apiClient.post("/quotes/recipients/create", payload);
    return res.data?.data;
  },

  // 7. Auth
  login: async (email, password) => {
    const res = await apiClient.post("/auth/login", { email, password });
    return res.data?.data;
  },
  forgotPassword: async (email) => {
    const res = await apiClient.post("/auth/forgot-password", { email });
    return res.data;
  },
  verifyForgotOtp: async (email, otpCode) => {
    const res = await apiClient.post("/auth/verify-forgot-otp", { email, otp_code: otpCode });
    return res.data?.data || res.data;
  },
  resetPassword: async (resetToken, newPassword) => {
    const res = await apiClient.post(
      "/auth/reset-password",
      { new_password: newPassword },
      { headers: { Authorization: `Bearer ${resetToken}` } }
    );
    return res.data;
  },
};

export default adminApi;

