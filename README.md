# 🎫 Modern Ticket System

A sophisticated, full-stack ticketing management solution built with **Next.js 15+**, **TypeScript**, and **Tailwind CSS**, featuring a robust backend powered by **Oracle Database** and advanced **PL/SQL** logic.

---

## 🚀 Key Features

-   **✨ Dynamic Ticket Management**: Create, list, update, and delete tickets with real-time optimistic UI updates.
-   **📊 Status Lifecycle**: Track tickets through various stages: `OPEN`, `IN PROGRESS`, `PENDING`, and `CLOSED`.
-   **📜 Advanced DB Logic**: Utilizes PL/SQL Procedures for data integrity and Triggers for automated history tracking.
-   **🎨 Premium UI/UX**: Designed with Tailwind CSS 4, featuring smooth transitions, glassmorphism elements, and responsive layouts.
-   **🛡️ Type Safety**: Full TypeScript implementation across the entire stack.

---

## 🏗️ Project Structure

```text
ticket-system/
├── app/                  # Next.js App Router (Pages & API)
│   ├── api/              # Backend endpoints (Oracle DB integration)
│   └── globals.css       # Global styles & Tailwind config
├── components/           # Reusable UI components
├── interfaces/           # TypeScript interfaces & types
├── lib/                  # Database configuration & utilities
├── public/               # Static assets
├── sql/                  # Oracle PL/SQL database layer 🚀
│   ├── tables.sql        # Schema definitions
│   ├── procedures.sql    # Business logic (Create/Read)
│   ├── triggers.sql      # Automated history tracking
│   └── functions.sql     # Utility functions
├── package.json          # Dependencies & scripts
└── tsconfig.json         # TypeScript configuration
```

---

## 💾 Database Layer (PL/SQL)

The core of the application's data integrity resides in the `sql/` folder. We leverage Oracle's powerful PL/SQL engine to handle complex logic directly at the database level.

### 📋 Tables (`sql/tables.sql`)
Defines the core schema including `users`, `tickets`, and `ticket_history`.
-   **Ticket History**: Automatically captures every status change for audit purposes.

### ⚙️ Procedures (`sql/procedures.sql`)
Encapsulated business logic for better performance and security.
-   `create_ticket`: A streamlined procedure to insert new tickets.
-   `get_tickets`: Optimized cursor-based retrieval of ticket data.

### ⚡ Triggers (`sql/triggers.sql`)
-   `trg_ticket_status`: An **AFTER UPDATE** trigger that automatically logs the transition of a ticket's status into the `ticket_history` table, ensuring a perfect audit trail without manual intervention.

---

## 🛠️ Technology Stack

| Layer      | Technology                                                                 |
| ---------- | -------------------------------------------------------------------------- |
| **Frontend** | [Next.js](https://nextjs.org/) (App Router), [React 19](https://react.dev/) |
| **Styling**  | [Tailwind CSS 4](https://tailwindcss.com/)                                 |
| **Backend**  | Next.js API Routes                                                         |
| **Database** | [Oracle Database](https://www.oracle.com/database/)                        |
| **Driver**   | [node-oracledb](https://oracle.github.io/node-oracledb/)                   |
| **Language** | [TypeScript](https://www.typescriptlang.org/)                              |

---

## ⚡ Getting Started

### Prerequisites
-   Node.js 20+
-   Oracle Database (XE or Cloud)
-   Oracle Instant Client (if required by your OS)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd ticket-system
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Database Setup**:
    Execute the scripts in the `sql/` folder in the following order:
    1.  `tables.sql`
    2.  `procedures.sql`
    3.  `triggers.sql`

4.  **Configure Environment**:
    Update `lib/db.ts` with your Oracle credentials:
    ```typescript
    export const dbConfig = {
      user: "YOUR_USER",
      password: "YOUR_PASSWORD",
      connectString: "localhost:1521/XE",
    };
    ```

5.  **Run Dev Server**:
    ```bash
    npm run dev
    ```

---

## 👨‍💻 Functionality Overview

### Creating Tickets
Users can create tickets via the `TicketFormModal`, which interacts with the `POST /api/tickets` endpoint. This endpoint calls the `create_ticket` PL/SQL procedure.

### Status Updates
The status of a ticket can be changed directly from the dashboard. When a status is updated, the `trg_ticket_status` trigger automatically records the previous and new status in the history table.

### Real-time UI
The application uses optimistic updates and React state management to ensure a snappy user experience, even when interacting with a heavy-duty enterprise database.

---

*Built with ❤️ by RixelDev.*
