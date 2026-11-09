import { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import ServiceTicketDrawer from "./ServiceTicketDrawer";
import ServiceTicketsTable from "./ServiceTicketsTable";
import { ticketsData } from "./serviceTicketData";

const ServiceTickets = () => {
  const [tickets, setTickets] = useState(ticketsData);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const selectedTicket =
    tickets.find((ticket) => ticket.id === selectedTicketId) ?? null;

  const handleStatusUpdate = (newStatus) => {
    setTickets((currentTickets) =>
      currentTickets.map((ticket) =>
        ticket.id === selectedTicketId
          ? { ...ticket, status: newStatus }
          : ticket,
      ),
    );
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
