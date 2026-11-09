import { createBrowserRouter } from "react-router";
import Dashboard from "../Layouts/Dashboard";
import SignIn from "../Pages/Authentication/SignIn";
import DashboardOverview from "../Pages/DashboardOverview/DashboardOverview";
import ForgotPassword from "../Pages/Authentication/ForgotPassword";
import OtpVerification from "../Pages/Authentication/OtpVerification";
import ResetPassword from "../Pages/Authentication/ResetPassword";
import CustomerManagement from "../Pages/CustomerManagement/CustomerManagement";
import ServiceTickets from "../Pages/ServiceTickets/ServiceTickets";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";
import FeedModeration from "../Pages/FeedModeration/FeedModeration";
import UserReports from "../Pages/UserReports/UserReports";
import ReferralsCoupons from "../Pages/ReferralsCoupons/ReferralsCoupons";
import ContactForms from "../Pages/ContactForms/ContactForms";
import Notifications from "../Pages/Notifications/Notifications";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/",
        element: <DashboardOverview/>
      },
      {
        path: "/customers-management",
        element: <CustomerManagement/>
      },
      {
        path: "/tickets",
        element: <ServiceTickets/>
      },
      {
        path: "/contact-form",
        element: <ContactForms/>
      },
      {
        path: "/feed-moderation",
        element: <FeedModeration/>
      },
      {
        path: "/referrals",
        element: <ReferralsCoupons/>
      },
      {
        path: "/user-reports",
        element: <UserReports/>
      },
      {
        path: "/notifications",
        element: <Notifications/>
      },
      {
        path: "/policy",
        element: <PrivacyPolicy/>
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/forget-password",
    element: <ForgotPassword />,
  },
  {
    path: "/otp-verification",
    element: <OtpVerification />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
]);

export default router;
