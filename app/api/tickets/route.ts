import { NextResponse } from "next/server"
import oracledb from "oracledb"
import { dbConfig } from "@/lib/db"
import { OracleTicketRow, Ticket } from "@/interfaces/ticket"

export async function POST(req: Request) {
  let conn

  try {
    const body = await req.json()
    const { title, description, userId } = body

    conn = await oracledb.getConnection(dbConfig)

    await conn.execute(
      `BEGIN create_ticket(:t, :d, :u); END;`,
      {
        t: title,
        d: description,
        u: userId,
      },
      { autoCommit: true }
    )

    return NextResponse.json({ message: "Ticket creado" }, { status: 201 })
  } catch (err) {
    console.error("POST ERROR:", err)
    return NextResponse.json({ error: "Error" }, { status: 500 })
  } finally {
    if (conn) await conn.close()
  }
}

export async function GET() {
  let connection

  try {
    connection = await oracledb.getConnection(dbConfig)

    const result = await connection.execute<OracleTicketRow>(
      `
      SELECT
        ticket_id,
        title,
        DBMS_LOB.SUBSTR(description, 4000, 1) AS description,
        status
      FROM tickets
      `,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    )

    const rows: Ticket[] = (result.rows ?? []).map((row) => ({
      ticket_id: row.TICKET_ID,
      title: row.TITLE,
      description: row.DESCRIPTION,
      status: row.STATUS,
    }))

    return NextResponse.json(rows)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "DB error" }, { status: 500 })
  } finally {
    if (connection) await connection.close()
  }
}

export async function PATCH(req: Request) {
  let conn

  try {
    const body = await req.json()
    const { ticketId, status } = body

    if (!ticketId || !status) {
      return NextResponse.json(
        { error: "Ticket ID and status are required" },
        { status: 400 }
      )
    }

    conn = await oracledb.getConnection(dbConfig)

    await conn.execute(
      `UPDATE tickets SET status = :s WHERE ticket_id = :id`,
      {
        s: status,
        id: ticketId,
      },
      { autoCommit: true }
    )

    return NextResponse.json(
      { message: "Ticket status updated" },
      { status: 200 }
    )
  } catch (err) {
    console.error("PATCH ERROR:", err)
    return NextResponse.json({ error: "Error updating ticket" }, { status: 500 })
  } finally {
    if (conn) await conn.close()
  }
}

export async function DELETE(req: Request) {
  let conn

  try {
    const { searchParams } = new URL(req.url)
    const ticketId = searchParams.get("ticketId")

    if (!ticketId) {
      return NextResponse.json(
        { error: "Ticket ID is required" },
        { status: 400 }
      )
    }

    conn = await oracledb.getConnection(dbConfig)

    await conn.execute(
      `DELETE FROM tickets WHERE ticket_id = :id`,
      {
        id: parseInt(ticketId),
      },
      { autoCommit: true }
    )

    return NextResponse.json({ message: "Ticket deleted" }, { status: 200 })
  } catch (err) {
    console.error("DELETE ERROR:", err)
    return NextResponse.json({ error: "Error deleting ticket" }, { status: 500 })
  } finally {
    if (conn) await conn.close()
  }
}
