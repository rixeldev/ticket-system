interface TicketHeaderProps {
  ticketCount: number
  onNewTicketClick: () => void
}

export default function TicketHeader({
  ticketCount,
  onNewTicketClick,
}: TicketHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Ticket System</h1>
        <p className="text-gray-400">
          {ticketCount} {ticketCount === 1 ? "ticket" : "tickets"} in total
        </p>
      </div>
      <button
        onClick={onNewTicketClick}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
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
            d="M12 4v16m8-8H4"
          />
        </svg>
        New Ticket
      </button>
    </div>
  )
}
