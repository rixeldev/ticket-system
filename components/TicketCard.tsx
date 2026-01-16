import { Ticket } from "@/interfaces/ticket"

interface TicketCardProps {
  ticket: Ticket
  statusOptions: string[]
  isUpdatingStatus: boolean
  onStatusChange: (ticketId: number, newStatus: string) => void
  onDeleteClick: (ticketId: number) => void
}

export default function TicketCard({
  ticket,
  statusOptions,
  isUpdatingStatus,
  onStatusChange,
  onDeleteClick,
}: TicketCardProps) {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10 group">
      {/* Ticket Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white mb-1 truncate group-hover:text-blue-400 transition-colors">
            {ticket.title}
          </h3>
          <p className="text-sm text-gray-400">#{ticket.ticket_id}</p>
        </div>
        <button
          onClick={() => onDeleteClick(ticket.ticket_id)}
          className="text-gray-400 hover:text-red-400 transition-colors ml-2 p-1 rounded hover:bg-red-500/10"
          title="Delete ticket"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      {/* Description */}
      <p className="text-gray-300 mb-4 line-clamp-3 text-sm leading-relaxed">
        {ticket.description || "No description provided"}
      </p>

      {/* Status and Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-700 gap-3">
        <div className="flex-1 relative">
          <select
            value={ticket.status}
            onChange={(e) => onStatusChange(ticket.ticket_id, e.target.value)}
            disabled={isUpdatingStatus}
            className={`w-full bg-gray-900 border rounded-lg px-3 py-1.5 text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              isUpdatingStatus
                ? "opacity-50 cursor-not-allowed border-gray-700"
                : "cursor-pointer border-gray-600 hover:border-gray-500"
            }`}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status} className="bg-gray-800 text-white">
                {status}
              </option>
            ))}
          </select>
          {isUpdatingStatus && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          )}
        </div>
      </div>
    </div>
  )
}
