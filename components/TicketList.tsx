import { Ticket } from "@/interfaces/ticket"
import TicketCard from "./TicketCard"

interface TicketListProps {
  tickets: Ticket[]
  statusOptions: string[]
  updatingStatus: number | null
  onStatusChange: (ticketId: number, newStatus: string) => void
  onDeleteClick: (ticketId: number) => void
}

export default function TicketList({
  tickets,
  statusOptions,
  updatingStatus,
  onStatusChange,
  onDeleteClick,
}: TicketListProps) {
  if (tickets.length === 0) {
    return (
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-12 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="text-xl font-semibold text-white mb-2">
          No tickets found
        </h3>
        <p className="text-gray-400">Get started by creating your first ticket.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.ticket_id}
          ticket={ticket}
          statusOptions={statusOptions}
          isUpdatingStatus={updatingStatus === ticket.ticket_id}
          onStatusChange={onStatusChange}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </div>
  )
}
