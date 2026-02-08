'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://aqxcwfvqpljqpfwlkcce.supabase.co',
  'sb_publishable_fPVGiki2mMqSDaFiHPdpyA_GLyLeqcF'
);

export default function InventoryPage() {
  const [cars, setCars] = useState<any[]>([]);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [activeImg, setActiveImg] = useState(1);
  const [lang, setLang] = useState<'EN' | 'FR'>('EN'); 
  
  const [downPayment, setDownPayment] = useState(5000);
  const [loanTerm, setLoanTerm] = useState(24); 
  const [interestRate, setInterestRate] = useState(6.99);

  const t = {
    heroSub: lang === 'EN' ? 'Excellence in motion' : 'Excellence en mouvement',
    viewDetails: lang === 'EN' ? 'VIEW DETAILS' : 'VOIR DÉTAILS',
    back: lang === 'EN' ? '← BACK' : '← RETOUR',
    specsTitle: lang === 'EN' ? 'SPECIFICATIONS' : 'SPÉCIFICATIONS',
    contactTitle: lang === 'EN' ? 'CONTACT US' : 'CONTACTEZ-NOUS',
    finTitle: lang === 'EN' ? 'FINANCING' : 'FINANCEMENT',
    downPay: lang === 'EN' ? 'DOWN PAYMENT' : 'ACOMPTE',
    term: lang === 'EN' ? 'TERM' : 'DURÉE',
    months: lang === 'EN' ? 'Months' : 'Mois',
    rate: lang === 'EN' ? 'INTEREST RATE' : "TAUX D'INTÉRÊT",
    monthly: lang === 'EN' ? 'MONTHLY' : 'MENSUALITÉ',
    getApproved: lang === 'EN' ? 'GET APPROVED' : 'OBTENIR UNE APPROBATION',
    km: lang === 'EN' ? 'MILEAGE' : 'KILOMÉTRAGE',
    fuel: lang === 'EN' ? 'FUEL TYPE' : 'CARBURANT',
    color: lang === 'EN' ? 'COLOR' : 'COULEUR',
    engine: lang === 'EN' ? 'ENGINE' : 'MOTEUR',
    traction: lang === 'EN' ? 'DRIVETRAIN' : 'TRACTION',
    doors: lang === 'EN' ? 'DOORS' : 'PORTES',
    seats: lang === 'EN' ? 'SIÈGES' : 'SIÈGES',
    features: lang === 'EN' ? 'FEATURES' : 'OPTIONS',
    tax: '+ Tax & Lic'
  };

  useEffect(() => {
    async function getInventory() {
      const { data } = await supabase.from('cars').select('*');
      if (data) setCars(data);
    }
    getInventory();
  }, []);

  const calculateMonthly = (price: number) => {
    const loanAmount = price - downPayment;
    const monthlyRate = (interestRate / 100) / 12;
    if (loanAmount <= 0) return 0;
    const monthly = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanTerm));
    return Math.max(0, Math.round(monthly));
  };

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', color: '#000', fontFamily: 'Arial, sans-serif' }}>
      
      <style>{`
        @keyframes scrollText { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .moving-text { animation: scrollText 20s linear infinite; }
        .brand-glow {
          background: linear-gradient(to right, #ffffff, #e31e24, #ffd700, #ffffff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 900;
          padding: 0 10px;
        }
        /* Mobile Optimization Fixes */
        @media (max-width: 768px) {
          .hero-title { font-size: 40px !important; }
          .hero-section { height: 50vh !important; }
          .specs-grid { grid-template-columns: 1fr 1fr !important; gap: 15px !important; }
          .finance-grid { grid-template-columns: 1fr !important; }
          .nav-title { font-size: 16px !important; }
        }
      `}</style>

      {/* Language Toggle Button */}
      <div style={{ position: 'fixed', top: '80px', right: '10px', zIndex: 1000 }}>
        <button onClick={() => setLang(lang === 'EN' ? 'FR' : 'EN')} style={{ backgroundColor: '#e31e24', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>
          {lang === 'EN' ? 'FR 🇫🇷' : 'EN 🇨🇦'}
        </button>
      </div>

      {!selectedCar && (
        <section className="hero-section" style={{ position: 'relative', height: '65vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: '50px', backgroundColor: '#111', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', borderBottom: '2px solid #ffd700' }}>
            <div className="moving-text" style={{ whiteSpace: 'nowrap', position: 'absolute', color: '#fff', fontSize: '14px', display: 'flex', gap: '40px' }}>
              <span><span className="brand-glow">JAD AUTO</span> • 📞 +1 514 978 8910 • ✉️ Jadauto.motor@gmail.com</span>
              <span><span className="brand-glow">JAD AUTO</span> • 📞 +1 514 978 8910 • ✉️ Jadauto.motor@gmail.com</span>
            </div>
          </div>

          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.4, backgroundImage: 'url("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <div style={{ position: 'relative', textAlign: 'center', color: '#fff' }}>
              <h1 className="hero-title" style={{ fontSize: '70px', fontWeight: '900', margin: 0 }}>JAD <span style={{ color: '#e31e24' }}>AUTO</span></h1>
              <p style={{ fontSize: '18px', fontWeight: '300', marginTop: '10px' }}>{t.heroSub}</p>
            </div>
          </div>
        </section>
      )}

      <nav style={{ padding: '15px 20px', borderBottom: '1px solid #eee', textAlign: 'center', backgroundColor: '#fff', position: 'sticky', top: 0, zIndex: 100 }}>
        <h2 className="nav-title" style={{ margin: 0, fontSize: '20px', fontWeight: '900' }}>JAD AUTO <span style={{ color: '#e31e24' }}>SELECTION</span></h2>
      </nav>

      {!selectedCar ? (
        <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {cars.map((car) => (
<div key={car.id} style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', position: 'relative' }}>             {/* Jad Auto Badges */}
{car.status && (
  <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10 }}>
    {car.status.toLowerCase() === 'sold' && (
      <span style={{ backgroundColor: '#e31e24', color: '#fff', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
        SOLD
      </span>
    )}
    {car.status.toLowerCase() === 'new' && (
      <span style={{ backgroundColor: '#10b981', color: '#fff', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
        NEW ARRIVAL
      </span>
    )}
  </div>
)}              <img src={`https://aqxcwfvqpljqpfwlkcce.supabase.co/storage/v1/object/public/car-photos/${car.folder}/1.jpg`} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '800' }}>{car.year} {car.model}</h2>
                <div style={{ marginBottom: '15px' }}>
                  <span style={{ fontSize: '26px', fontWeight: 'bold', color: '#e31e24' }}>${Number(car.price).toLocaleString()}</span>
                  <span style={{ fontSize: '12px', color: '#888', marginLeft: '5px' }}>{t.tax}</span>
                </div>
                <button onClick={() => { setSelectedCar(car); window.scrollTo(0,0); }} style={{ width: '100%', padding: '12px', backgroundColor: '#000', color: '#fff', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}>{t.viewDetails}</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ maxWidth: '1050px', margin: '0 auto', padding: '20px' }}>
          <button onClick={() => setSelectedCar(null)} style={{ marginBottom: '20px', cursor: 'pointer', background: '#000', color: '#fff', padding: '10px 20px', borderRadius: '8px', border: 'none' }}>{t.back}</button>
          
          <h1 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '10px' }}>{selectedCar.year} {selectedCar.model}</h1>
          <p style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '36px', fontWeight: 'bold', color: '#e31e24' }}>${Number(selectedCar.price).toLocaleString()}</span>
            <span style={{ fontSize: '16px', color: '#888', marginLeft: '10px' }}>{t.tax}</span>
          </p>
          {/* WhatsApp Button - Jad Auto */}
<a  href={`https://wa.me/15149788910?text=${encodeURIComponent(`Hello Jad Auto, I am interested in the ${selectedCar.name}`)}`} 
  rel="noopener noreferrer"
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: '#25D366', 
    color: '#fff',
    padding: '12px',
    borderRadius: '12px',
    textDecoration: 'none',
    marginTop: '15px',
    fontWeight: 'bold',
    fontSize: '14px',
    width: '100%',
    boxShadow: '0 4px 10px rgba(37, 211, 102, 0.2)'
  }}
>
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.224-3.82l.303.18c1.397.831 2.956 1.27 4.557 1.271 5.035 0 9.132-4.097 9.135-9.134.002-2.438-.949-4.731-2.677-6.46s-4.022-2.678-6.461-2.679c-5.035 0-9.132 4.097-9.135 9.134-.001 1.737.491 3.426 1.423 4.898l.213.335-1.003 3.666 3.75-.985z"/>
  </svg>
  Contact on WhatsApp
</a>
{/* Email Button - Jad Auto */}
<a 
  href={`mailto:Jadauto.motor@gmail.com?subject=${encodeURIComponent(`Inquiry about ${selectedCar.name}`)}&body=${encodeURIComponent(`Hello Jad Auto,\n\nI saw the ${selectedCar.name} on your website and I would like to get more information about it.\n\nThank you.`)}`}
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: '#333', // لون رمادي غامق احترافي
    color: '#fff',
    padding: '12px',
    borderRadius: '12px',
    textDecoration: 'none',
    marginTop: '10px',
    fontWeight: 'bold',
    fontSize: '14px',
    width: '100%',
    transition: '0.3s'
  }}
>
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
  </svg>
  Send Email
</a>
{/* Test Drive Button - Jad Auto */}
<a 
  href={`https://wa.me/15149788910?text=${encodeURIComponent(`Hello Jad Auto, I would like to book a Test Drive for: ${selectedCar.name}.\n\nMy Name: \nMy Phone: \nPreferred Date: `)}`} 
  target="_blank" 
  rel="noopener noreferrer"
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: '#0070f3', 
    color: '#fff',
    padding: '12px',
    borderRadius: '12px',
    textDecoration: 'none',
    marginTop: '10px',
    fontWeight: 'bold',
    fontSize: '14px',
    width: '100%',
    boxShadow: '0 4px 10px rgba(0, 112, 243, 0.2)'
  }}
>
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
  Book a Test Drive
</a>
{/* CARFAX Button - Jad Auto */}
{selectedCar.carfax_url && (
  <a 
    href={selectedCar.carfax_url} 
    target="_blank" 
    rel="noopener noreferrer"
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      backgroundColor: '#003366', 
      color: '#fff',
      padding: '12px',
      borderRadius: '12px',
      textDecoration: 'none',
      marginTop: '10px',
      fontWeight: 'bold',
      fontSize: '14px',
      width: '100%'
    }}
  >
    View CARFAX Report (PDF)
  </a>
)}

          <img src={`https://aqxcwfvqpljqpfwlkcce.supabase.co/storage/v1/object/public/car-photos/${selectedCar.folder}/${activeImg === 23 ? '23.webp' : activeImg + '.jpg'}`} style={{ width: '100%', borderRadius: '20px', marginBottom: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />

          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '30px' }}>
            {Array.from({ length: 23 }, (_, i) => i + 1).map(n => (
              <img key={n} src={`https://aqxcwfvqpljqpfwlkcce.supabase.co/storage/v1/object/public/car-photos/${selectedCar.folder}/${n === 23 ? '23.webp' : n + '.jpg'}`} onClick={() => setActiveImg(n)} style={{ width: '100px', height: '70px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer', border: activeImg === n ? '3px solid #e31e24' : '1px solid #eee', flexShrink: 0 }} />
            ))}
          </div>

          <section style={{ marginBottom: '40px', backgroundColor: '#f9f9f9', padding: '25px', borderRadius: '20px' }}>
            <h3 style={{ fontSize: '22px', borderBottom: '3px solid #e31e24', paddingBottom: '10px', marginBottom: '25px' }}>{t.specsTitle}</h3>
            <div className="specs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '25px' }}>
              <div><span style={{ color: '#888', fontSize: '12px', display: 'block' }}>{t.km}</span><span style={{ fontWeight: 'bold' }}>{selectedCar.km} km</span></div>
              <div><span style={{ color: '#888', fontSize: '12px', display: 'block' }}>NIV / VIN</span><span style={{ fontWeight: 'bold', fontSize: '14px' }}>{selectedCar.vin}</span></div>
              <div><span style={{ color: '#888', fontSize: '12px', display: 'block' }}>{t.engine}</span><span style={{ fontWeight: 'bold' }}>{selectedCar.engine || '---'}</span></div>
              <div><span style={{ color: '#888', fontSize: '12px', display: 'block' }}>{t.traction}</span><span style={{ fontWeight: 'bold' }}>{selectedCar.drivetrain || '---'}</span></div>
              <div><span style={{ color: '#888', fontSize: '12px', display: 'block' }}>{t.color}</span><span style={{ fontWeight: 'bold' }}>{selectedCar.colour || '---'}</span></div>
              <div><span style={{ color: '#888', fontSize: '12px', display: 'block' }}>{t.fuel}</span><span style={{ fontWeight: 'bold' }}>{selectedCar['fuel type'] || '---'}</span></div>
              <div><span style={{ color: '#888', fontSize: '12px', display: 'block' }}>{t.doors}</span><span style={{ fontWeight: 'bold' }}>{selectedCar.doors || '---'}</span></div>
              <div><span style={{ color: '#888', fontSize: '12px', display: 'block' }}>{t.seats}</span><span style={{ fontWeight: 'bold' }}>{selectedCar.seats || '---'}</span></div>
              <div><span style={{ color: '#888', fontSize: '12px', display: 'block' }}>{t.features}</span><span style={{ fontWeight: 'bold' }}>{selectedCar.features || '---'}</span></div>
            </div>
          </section>

          <section style={{ marginBottom: '40px', textAlign: 'center', padding: '30px', backgroundColor: '#000', color: '#fff', borderRadius: '20px' }}>
            <h2 style={{ color: '#e31e24', fontSize: '22px' }}>{t.contactTitle}</h2>
            <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '15px 0' }}>📞 +1 514 978 8910</p>
            <p style={{ fontSize: '14px' }}>✉️ Jadauto.motor@gmail.com</p>
          </section>

          <section style={{ marginBottom: '50px', padding: '25px', border: '3px solid #2ecc71', borderRadius: '20px' }}>
            <h3 style={{ color: '#2ecc71', fontSize: '22px', marginBottom: '25px' }}>{t.finTitle}</h3>
            <div className="finance-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <label style={{ fontWeight: 'bold', fontSize: '14px' }}>{t.downPay} ($)</label>
                <input type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                
                <label style={{ fontWeight: 'bold', fontSize: '14px' }}>{t.term} ({t.months})</label>
                <select value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}>
                  {[6, 12, 18, 24, 36, 48, 60].map(m => <option key={m} value={m}>{m} {t.months}</option>)}
                </select>
                
                <label style={{ fontWeight: 'bold', fontSize: '14px' }}>{t.rate} (%)</label>
                <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
              </div>
              
              <div style={{ textAlign: 'center', backgroundColor: '#f9f9f9', padding: '30px', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p style={{ fontSize: '14px', fontWeight: 'bold' }}>{t.monthly}</p>
                <h2 style={{ fontSize: '50px', color: '#2ecc71', fontWeight: '900', margin: '10px 0' }}>${calculateMonthly(selectedCar.price)}</h2>
                <button style={{ backgroundColor: '#2ecc71', color: '#fff', padding: '15px', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>{t.getApproved}</button>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}