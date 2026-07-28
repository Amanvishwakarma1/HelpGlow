import React from 'react';

const PaymentQRCard = ({ amount }) => {
  const upiId = '8528220733@ucobank';
  const accountName = 'HELPGLOW FOUNDATION';
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(`upi://pay?pa=${upiId}&pn=${accountName}&am=${amount}&cu=INR`)}`;

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      border: '2px solid #E67E22',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      textAlign: 'center',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* UCO Bank Header Banner */}
      <div style={{ backgroundColor: '#00529C', color: '#FFFFFF', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <div style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '1px' }}>UCO BANK</div>
        <div style={{ fontSize: '12px', opacity: 0.9 }}>| HELPGLOW FOUNDATION</div>
      </div>

      <div style={{ backgroundColor: '#FFF8E7', padding: '8px', fontSize: '12px', fontWeight: 800, color: '#D97706', textTransform: 'uppercase', letterSpacing: '1px' }}>
        BHIM UPI PAYMENT ACCEPTED • SCAN QR CODE TO PAY
      </div>

      {/* QR Code Frame */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ border: '4px solid #00529C', padding: '10px', borderRadius: '16px', backgroundColor: '#FFFFFF', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <img 
            src={qrUrl} 
            alt="UCO Bank UPI QR Code" 
            style={{ width: '220px', height: '220px', display: 'block' }}
          />
        </div>

        <div style={{ marginTop: '14px', fontSize: '15px', fontWeight: 800, color: '#1E293B' }}>
          Pay to UPI ID: <span style={{ color: '#00529C', userSelect: 'all' }}>{upiId}</span>
        </div>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#0A90B5', marginTop: '4px' }}>
          Total Amount: ₹{amount?.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default PaymentQRCard;
