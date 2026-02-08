import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JAD AUTO | Premium Car Trading",
  description: "Your trusted platform for luxury and certified pre-owned vehicles.",
  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header style={{ 
          padding: '15px', 
          textAlign: 'center', 
          backgroundColor: '#1a1a1a', 
          borderBottom: '3px solid #facc15' 
        }}>
          <img src="/logo.jpg" alt="JAD AUTO" style={{ height: '80px', borderRadius: '8px' }} />
        </header>
        {children}
      </body>
    </html>
  );
}