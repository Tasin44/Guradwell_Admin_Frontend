import { useState, useEffect } from "react";
import SectionTitle from "../../components/SectionTitle";
import ServiceTicketDrawer from "./ServiceTicketDrawer";
import ServiceTicketsTable from "./ServiceTicketsTable";
import adminApi from "../../lib/admin-api";
import Swal from "sweetalert2";

const avatarBgs = [
  "bg-emerald-100 text-emerald-700",
  "bg-violet-100 text-violet-700",
  "bg-rose-100 text-rose-700",
  "bg-amber-100 text-amber-700",
  "bg-teal-100 text-teal-700",
];

const mapApiTicket = (ticket, index) => {
  const statusMap = {
    submitted: "New",
    in_progress: "In progress",
    completed: "Completed",
  };

  const statusLabel = statusMap[ticket.status] || ticket.status || "New";

  const initials = ticket.customer_name
    ? ticket.customer_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "CU";

  const formattedDate = ticket.created_at
    ? new Date(ticket.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "-";

  return {
    rawId: ticket.id,
    id: ticket.request_code || `REQ-${ticket.id}`,
    title: ticket.description
      ? ticket.description.slice(0, 50) + (ticket.description.length > 50 ? "..." : "")
      : `${ticket.service_category || "Service"} Request`,
    attachment: ticket.image_url ? "1 attachment" : null,
    customer: ticket.customer_name || "Customer",
    customerEmail: ticket.customer_email,
    customerPhone: ticket.customer_phone,
    address: `${ticket.full_address || ""} ${ticket.postcode || ""}`.trim(),
    serviceCategory: ticket.service_category,
    initials,
    avatarBg: avatarBgs[index % avatarBgs.length],
    submitted: formattedDate,
    status: statusLabel,
    rawStatus: ticket.status,
    image: ticket.image_url || null,
    notes: ticket.description || "No customer notes provided.",
    assignedRep: ticket.assigned_rep || "",
  };
};

const ServiceTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getTickets({ limit: 100 });
      const mapped = (data || []).map((t, idx) => mapApiTicket(t, idx));
      setTickets(mapped);
    } catch (err) {
      console.error("Failed to load tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const selectedTicket =
    tickets.find((ticket) => ticket.id === selectedTicketId) ?? null;

  const handleStatusUpdate = async (newStatusLabel) => {
    if (!selectedTicket) return;

    const reverseStatusMap = {
      New: "submitted",
      "In progress": "in_progress",
      Completed: "completed",
    };

    const backendStatus = reverseStatusMap[newStatusLabel] || "submitted";

    try {
      await adminApi.updateTicketStatus(selectedTicket.rawId, {
        status: backendStatus,
      });

      setTickets((currentTickets) =>
        currentTickets.map((ticket) =>
          ticket.id === selectedTicketId
            ? { ...ticket, status: newStatusLabel, rawStatus: backendStatus }
            : ticket,
        ),
      );

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `Status updated to ${newStatusLabel}`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.error("Failed to update ticket status:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Failed to update ticket status",
      });
    }
  };

  return (
    <div>
      <SectionTitle
        title="Service Tickets"
        description="Manage and track customer service requests"
      />
      <div className="p-5">
        <ServiceTicketsTable
          tickets={tickets}
          loading={loading}
          onSelectTicket={(ticket) => setSelectedTicketId(ticket.id)}
        />
      </div>
      <ServiceTicketDrawer
        ticket={selectedTicket}
        onClose={() => setSelectedTicketId(null)}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
};

export default ServiceTickets;
