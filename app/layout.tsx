import type { Metadata } from "next";
import "./globals.css";

export const metadata = {
  title: 'Jad Auto Selection | Used Cars Montreal & Laval | Voitures d\'occasion',
  description: 'Best used cars in Montreal and Laval. Financing available. | Les meilleures voitures d\'occasion à Montréal et Laval. Financement disponible.',
  keywords: 'Used cars Montreal, Voitures d\'occasion Montréal, Jad Auto, Car dealer Laval, Ram 1500 Quebec',
  // أضف السطر التالي هنا لربط جوجل
  verification: {
    google: 'Pk-jrCpSlyiSiLbxpG5pw3NlUhH194T4olz7EDCxiMQ',
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