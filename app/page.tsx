"use client"

import { useEffect, useState } from "react"
import { Ticket } from "@/interfaces/ticket"
import TicketHeader from "@/components/TicketHeader"
import TicketList from "@/components/TicketList"
import TicketFormModal from "@/components/TicketFormModal"
import DeleteConfirmModal from "@/components/DeleteConfirmModal"
import LoadingSpinner from "@/components/LoadingSpinner"
import ErrorDisplay from "@/components/ErrorDisplay"

export default function Home() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [ticketToDelete, setTicketToDelete] = useState<number | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    userId: "",
  })

  const statusOptions = ["OPEN", "IN PROGRESS", "PENDING", "CLOSED"]

  const fetchTickets = () => {
    fetch("/api/tickets")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tickets")
        return res.json()
      })
      .then((data) => {
        setTickets(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchTickets()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setFormError(null)

    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          userId: parseInt(formData.userId) || 1,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create ticket")
      }

      // Reset form and close modal
      setFormData({ title: "", description: "", userId: "" })
      setFormError(null)
      setIsModalOpen(false)

      // Refresh tickets list
      fetchTickets()
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Failed to create ticket"
      )
    } finally {
      setSubmitting(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = async (ticketId: number, newStatus: string) => {
    setUpdatingStatus(ticketId)
    setError(null)

    try {
      const response = await fetch("/api/tickets", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticketId,
          status: newStatus,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update ticket status")
      }

      // Update local state optimistically
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.ticket_id === ticketId
            ? { ...ticket, status: newStatus }
            : ticket
        )
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status")
    } finally {
      setUpdatingStatus(null)
    }
  }

  const handleDeleteClick = (ticketId: number) => {
    setTicketToDelete(ticketId)
    setDeleteConfirmOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!ticketToDelete) return

    setDeleting(true)
    setError(null)

    try {
      const response = await fetch(`/api/tickets?ticketId=${ticketToDelete}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete ticket")
      }

      // Remove ticket from local state
      setTickets((prev) =>
        prev.filter((ticket) => ticket.ticket_id !== ticketToDelete)
      )

      // Close confirmation modal
      setDeleteConfirmOpen(false)
      setTicketToDelete(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete ticket")
    } finally {
      setDeleting(false)
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setFormData({ title: "", description: "", userId: "" })
    setFormError(null)
  }

  const handleDeleteModalClose = () => {
    setDeleteConfirmOpen(false)
    setTicketToDelete(null)
    setError(null)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error && !isModalOpen && !deleteConfirmOpen) {
    return <ErrorDisplay message={error} />
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <TicketHeader
          ticketCount={tickets.length}
          onNewTicketClick={() => setIsModalOpen(true)}
        />

        <TicketList
          tickets={tickets}
          statusOptions={statusOptions}
          updatingStatus={updatingStatus}
          onStatusChange={handleStatusChange}
          onDeleteClick={handleDeleteClick}
        />
      </div>

      <TicketFormModal
        isOpen={isModalOpen}
        formData={formData}
        formError={formError}
        submitting={submitting}
        onClose={handleModalClose}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
      />

      <DeleteConfirmModal
        isOpen={deleteConfirmOpen}
        ticketId={ticketToDelete}
        deleting={deleting}
        error={error}
        onClose={handleDeleteModalClose}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
