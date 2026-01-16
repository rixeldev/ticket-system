import SEO from "@/components/SEO"
import "./globals.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html data-scroll-behavior="smooth" lang="en">
      <head>
        <SEO title="Ticket System" description="" />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
