interface ErrorDisplayProps {
  message: string
}

export default function ErrorDisplay({ message }: ErrorDisplayProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 max-w-md">
        <h2 className="text-red-400 text-xl font-semibold mb-2">Error</h2>
        <p className="text-gray-300">{message}</p>
      </div>
    </div>
  )
}
