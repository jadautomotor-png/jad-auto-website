import type { Metadata } from "next";
import "./globals.css";

export const metadata = {
  // العنوان الجديد يركز على اسم الشركة الكامل ومجال العمل
  title: 'Jad Auto Selection | Quality Used Cars Montreal & Laval',
  description: 'Jad Auto Selection specializes in high-quality pre-owned vehicles in Montreal. Best prices and financing options available.',
  keywords: 'Jad Auto Selection, Jad Auto Montreal, used cars for sale Montreal, voitures d\'occasion Montréal',
  verification: {
    google: 'Pk-jrCpSlyiSiLbxpG0fN0-o9P7f3XzV9W2V9V9V9V9', // كودك الخاص لا تغيره
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