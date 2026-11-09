import { useState, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Edit, X, Check } from "lucide-react";
import SectionTitle from "../../components/SectionTitle";
import { showToast } from "../../lib/toast";

const INITIAL_CONTENT = `
  <h1>Privacy Policy</h1>
  <p>Last updated: October 18, 2026</p>

  <h2>1. Introduction</h2>
  <p>
    Welcome to our platform. We respect your privacy and are committed to protecting your personal data.
    This Privacy Policy explains how we collect, use, store, and share your information when you use our services.
  </p>

  <h2>2. Information We Collect</h2>
  <h3>2.1 Information you provide</h3>
  <ul>
    <li>Account details such as name, email address, and password</li>
    <li>Profile information you choose to add</li>
    <li>Communications you send to us (support requests, feedback)</li>
  </ul>

  <h3>2.2 Information collected automatically</h3>
  <ul>
    <li>Device and browser information</li>
    <li>IP address and approximate location</li>
    <li>Usage data, such as pages visited and actions taken</li>
    <li>Cookies and similar tracking technologies</li>
  </ul>

  <h2>3. How We Use Your Information</h2>
  <p>We use the information we collect to:</p>
  <ol>
    <li>Provide, operate, and maintain our services</li>
    <li>Improve and personalize your experience</li>
    <li>Communicate with you about updates, security, and support</li>
    <li>Detect, prevent, and address fraud or security issues</li>
    <li>Comply with legal obligations</li>
  </ol>

  <h2>4. Sharing of Information</h2>
  <p>
    We do not sell your personal data. We may share information only in the following cases:
  </p>
  <ul>
    <li>With service providers who help us operate the platform (under strict confidentiality)</li>
    <li>When required by law or to protect our legal rights</li>
    <li>In connection with a business transfer (merger, acquisition, etc.)</li>
    <li>With your explicit consent</li>
  </ul>

  <h2>5. Data Security</h2>
  <p>
    We implement appropriate technical and organizational measures to protect your personal data
    against unauthorized access, loss, or misuse. However, no method of transmission over the
    internet is 100% secure.
  </p>

  <h2>6. Your Rights</h2>
  <p>Depending on your location, you may have the right to:</p>
  <ul>
    <li>Access the personal data we hold about you</li>
    <li>Request correction or deletion of your data</li>
    <li>Object to or restrict certain processing</li>
    <li>Request data portability</li>
    <li>Withdraw consent where processing is based on consent</li>
  </ul>

  <h2>7. Cookies</h2>
  <p>
    We use cookies and similar technologies to improve functionality, analyze usage, and
    personalize content. You can manage cookie preferences through your browser settings.
  </p>

  <h2>8. Changes to This Policy</h2>
  <p>
    We may update this Privacy Policy from time to time. We will notify you of any material
    changes by posting the new policy on this page and updating the “Last updated” date.
  </p>

  <h2>9. Contact Us</h2>
  <p>
    If you have any questions about this Privacy Policy, please contact us at
    <a href="mailto:privacy@example.com">privacy@example.com</a>.
  </p>
`;

const PrivacyPolicy = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [description, setDescription] = useState(INITIAL_CONTENT);
  const [draft, setDraft] = useState(INITIAL_CONTENT);

  const handleEditClick = () => {
    setDraft(description);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraft(description);
    setIsEditing(false);
  };

  const handleUpdate = async () => {
    if (!draft.trim() || draft === "<p><br></p>") return;

    setIsSaving(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 600));
      setDescription(draft);
      setIsEditing(false);
      showToast("success", "Privacy policy updated successfully");
    } catch {
      showToast("error", "Unable to update privacy policy");
    } finally {
      setIsSaving(false);
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ align: [] }],
        ["link"],
        ["clean"],
      ],
    }),
    [],
  );

  return (
    <div>
      <SectionTitle
        title="Privacy Policy"
        description="Manage your platform privacy policy content"
      />

      <div className="p-4 sm:p-5 pb-10">
        {/* Header actions */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            {isEditing
              ? "Editing mode — changes are not saved until you click Update."
              : "View and update the privacy policy shown to users."}
          </p>

          {!isEditing ? (
            <button
              onClick={handleEditClick}
              className="flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium bg-[#0024571A] text-[#002457] cursor-pointer w-full sm:w-auto"
            >
              <Edit className="w-4 h-4" />
              Edit Policy
            </button>
          ) : (
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={handleCancel}
                className="flex flex-1 sm:flex-none items-center justify-center gap-1.5 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 cursor-pointer"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={isSaving}
                className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full bg-[#0024571A] px-4 py-2.5 text-sm font-medium text-[#002457] disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
              >
                <Check className="w-4 h-4" />
                {isSaving ? "Updating..." : "Update Policy"}
              </button>
            </div>
          )}
        </div>

        {/* Content card */}
        <div className="rounded-xl border border-[#EAEDEB] bg-white shadow-[0_1px_2px_rgba(16,34,40,0.05)] shadow-sm">
          {!isEditing ? (
            <div
              className="privacy-html p-5 sm:p-8"
              dangerouslySetInnerHTML={{
                __html: description || "<p>No content available</p>",
              }}
            />
          ) : (
            <div className="quill-light">
              <ReactQuill
                value={draft}
                onChange={setDraft}
                theme="snow"
                modules={modules}
                placeholder="Write your privacy policy here..."
              />
            </div>
          )}
        </div>
      </div>

      <style>{`
        /* ── View mode HTML styles ── */
        .privacy-html h1 {
          color: #0f172a;
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0 0 1rem;
          line-height: 1.3;
        }
        .privacy-html h2 {
          color: #0f172a;
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 0.75rem;
          line-height: 1.3;
        }
        .privacy-html h3 {
          color: #334155;
          font-size: 1.05rem;
          font-weight: 600;
          margin: 1.5rem 0 0.5rem;
          line-height: 1.4;
        }
        .privacy-html h4,
        .privacy-html h5,
        .privacy-html h6 {
          color: #475569;
          font-size: 0.95rem;
          font-weight: 600;
          margin: 1.25rem 0 0.4rem;
        }
        .privacy-html p {
          color: #475569;
          font-size: 0.9rem;
          line-height: 1.75;
          margin: 0 0 1rem;
        }
        .privacy-html ul,
        .privacy-html ol {
          color: #475569;
          font-size: 0.9rem;
          line-height: 1.75;
          margin: 0 0 1rem;
          padding-left: 1.5rem;
        }
        .privacy-html ul {
          list-style-type: disc;
        }
        .privacy-html ol {
          list-style-type: decimal;
        }
        .privacy-html li {
          margin-bottom: 0.35rem;
          color: #475569;
        }
        .privacy-html a {
          color: #002457;
          text-decoration: none;
        }
        .privacy-html a:hover {
          text-decoration: underline;
        }
        .privacy-html strong,
        .privacy-html b {
          color: #0f172a;
          font-weight: 600;
        }
        .privacy-html em,
        .privacy-html i {
          font-style: italic;
        }
        .privacy-html u {
          text-decoration: underline;
        }
        .privacy-html s,
        .privacy-html strike {
          text-decoration: line-through;
          color: #94a3b8;
        }
        .privacy-html blockquote {
          border-left: 3px solid #002457;
          padding-left: 1rem;
          margin: 1rem 0;
          color: #64748b;
          font-style: italic;
        }
        .privacy-html hr {
          border: none;
          border-top: 1px solid #e2e8f0;
          margin: 1.5rem 0;
        }

        /* ── Quill light theme ── */
        .quill-light .ql-toolbar.ql-snow {
          border: none;
          border-bottom: 1px solid #e2e8f0;
          background: #f8fafc;
          padding: 10px 12px;
        }
        .quill-light .ql-container.ql-snow {
          border: none;
          background: #ffffff;
          color: #334155;
          font-size: 14px;
          min-height: 420px;
        }
        @media (min-width: 640px) {
          .quill-light .ql-container.ql-snow {
            min-height: 500px;
          }
        }
        .quill-light .ql-editor {
          min-height: 420px;
          padding: 1.25rem 1.5rem;
          line-height: 1.75;
          color: #334155;
        }
        @media (min-width: 640px) {
          .quill-light .ql-editor {
            min-height: 500px;
            padding: 2rem;
          }
        }
        .quill-light .ql-editor.ql-blank::before {
          color: #94a3b8;
          font-style: normal;
        }
        .quill-light .ql-snow .ql-stroke {
          stroke: #64748b;
        }
        .quill-light .ql-snow .ql-fill {
          fill: #64748b;
        }
        .quill-light .ql-snow .ql-picker {
          color: #64748b;
        }
        .quill-light .ql-snow .ql-picker-options {
          background: #ffffff;
          border-color: #e2e8f0;
        }
        .quill-light .ql-snow.ql-toolbar button:hover .ql-stroke,
        .quill-light .ql-snow.ql-toolbar button.ql-active .ql-stroke {
          stroke: #002457;
        }
        .quill-light .ql-snow.ql-toolbar button:hover .ql-fill,
        .quill-light .ql-snow.ql-toolbar button.ql-active .ql-fill {
          fill: #002457;
        }
        .quill-light .ql-editor h1,
        .quill-light .ql-editor h2,
        .quill-light .ql-editor h3 {
          color: #0f172a;
        }
        .quill-light .ql-editor a {
          color: #002457;
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicy;