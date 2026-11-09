import SectionTitle from "../../components/SectionTitle";
import RecentSubmissions from "./RecentSubmissions";
import EmailRecipients from "./EmailRecipients";

const ContactForms = () => (
  <div>
    <SectionTitle title="Inspection & contact forms" description="Manage submissions and email alert recipients." />
    <div className="p-5">
      <div className="flex flex-col lg:flex-row gap-5 sm:gap-6 items-start">
        <RecentSubmissions />
        <EmailRecipients />
      </div>
    </div>
  </div>
);

export default ContactForms;
