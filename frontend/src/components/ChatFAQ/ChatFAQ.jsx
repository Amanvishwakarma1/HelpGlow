import React, { useState, useEffect, useRef } from 'react';

const faqData = [
  { id: 1, question: "How is my donation used?", answer: "100% of your donation goes directly to the field for food, medicine, and education." },
  { id: 2, question: "Is my payment secure?", answer: "Yes! We use industry-standard SSL encryption and secure payment gateways." },
  { id: 3, question: "How can I volunteer?", answer: "Visit our 'About' page or message us to join our volunteer network!" }
];

const ChatFAQ = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Hi! I'm HelpGlow's assistant. Ask me anything!" }
  ]);
  const chatEndRef = useRef(null);

  // Brand Colors
  const colors = {
    magenta: '#8e2382',
    pink: '#e61e6e',
    orange: '#f37021',
    gold: '#d4af37',
    deepText: '#2d3436'
  };

  useEffect(() => {
    if (isOpen && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ 
        behavior: "smooth", 
        block: "nearest" 
      });
    }
  }, [messages, isOpen]);

  const handleQuestionClick = (e, q) => {
    e.preventDefault(); 
    setMessages((prev) => [
      ...prev, 
      { type: 'user', text: q.question }, 
      { type: 'bot', text: q.answer }
    ]);
  };

  if (!isOpen) {
    return (
      <div style={styles.ctaWrapper}>
        <div style={styles.ctaContent}>
          <div style={styles.ctaTextSection}>
            {/* FIXED COLOR HERE */}
            <h3 style={{...styles.ctaTitle, color: colors.magenta}}>Have any questions?</h3>
            <p style={styles.ctaSubtitle}>Our assistant is here to help you 24/7.</p>
          </div>
          <button 
            style={styles.chatButton} 
            onClick={() => setIsOpen(true)}
            onMouseEnter={(e) => {
                e.target.style.background = `linear-gradient(135deg, ${colors.pink}, ${colors.magenta})`;
                e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
                e.target.style.background = `linear-gradient(135deg, ${colors.magenta}, ${colors.pink})`;
                e.target.style.transform = 'scale(1)';
            }}
          >
            Chat Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{...styles.chatContainer, border: `4px solid ${colors.gold}`}}>
      <div style={{...styles.chatHeader, background: `linear-gradient(135deg, ${colors.magenta}, ${colors.pink})`}}>
        <div style={styles.headerInfo}>
          <div style={styles.onlineDot} />
          <span>HelpGlow Assistant</span>
        </div>
        <button 
            style={styles.closeBtn} 
            onClick={() => setIsOpen(false)}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
            ✕
        </button>
      </div>

      <div style={styles.messageArea}>
        {messages.map((msg, index) => (
          <div key={index} style={msg.type === 'bot' ? styles.botBubble : {...styles.userBubble, background: `linear-gradient(135deg, ${colors.pink}, ${colors.orange})`}}>
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} style={{ float: "left", clear: "both" }} />
      </div>

      <div style={styles.optionsArea}>
        <p style={styles.optionLabel}>Quick Questions:</p>
        <div style={styles.buttonGrid}>
          {faqData.map((q) => (
            <button 
              key={q.id} 
              onClick={(e) => handleQuestionClick(e, q)} 
              style={{...styles.faqButton, color: colors.magenta}}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.borderColor = colors.pink;
                e.target.style.color = colors.pink;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.borderColor = '#d1d5db';
                e.target.style.color = colors.magenta;
              }}
            >
              {q.question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  ctaWrapper: {
    maxWidth: '1100px',
    margin: '60px auto',
    padding: '3px', 
    background: 'linear-gradient(90deg, #8e2382, #e61e6e, #f37021)', 
    borderRadius: '20px',
    boxShadow: '0 15px 35px -5px rgba(142, 35, 130, 0.25)',
  },
  ctaContent: {
    background: '#fff', 
    borderRadius: '17px',
    padding: '35px 50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '20px'
  },
  ctaTitle: { margin: 0, fontSize: '1.6rem', fontWeight: '800' },
  ctaSubtitle: { margin: '5px 0 0', color: '#636e72', fontSize: '1rem' },
  chatButton: {
    padding: '15px 40px',
    background: 'linear-gradient(135deg, #8e2382, #e61e6e)', 
    color: '#fff',
    border: 'none',
    borderRadius: '50px',
    fontSize: '1.1rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(230, 30, 110, 0.3)',
  },
  chatContainer: {
    width: '95%',
    maxWidth: '450px',
    height: '600px',
    margin: '40px auto',
    background: '#fff',
    borderRadius: '28px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.25)',
  },
  chatHeader: {
    padding: '25px',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerInfo: { display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '700', fontSize: '1.1rem' },
  onlineDot: { width: '12px', height: '12px', background: '#55efc4', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.5)' },
  closeBtn: { background: 'none', border: 'none', color: '#fff', fontSize: '1.4rem', cursor: 'pointer', transition: '0.2s' },
  messageArea: { 
    flex: 1, 
    padding: '20px', 
    overflowY: 'auto', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '15px', 
    background: '#fdf7f9'
  },
  botBubble: { 
    alignSelf: 'flex-start', 
    padding: '14px 20px', 
    background: '#fff', 
    color: '#2d3436', 
    borderRadius: '22px 22px 22px 5px', 
    maxWidth: '85%',
    boxShadow: '0 3px 10px rgba(0,0,0,0.05)',
    border: '1px solid #f1f2f6'
  },
  userBubble: { 
    alignSelf: 'flex-end', 
    padding: '14px 20px', 
    color: '#fff', 
    borderRadius: '22px 22px 5px 22px', 
    maxWidth: '85%',
    boxShadow: '0 4px 12px rgba(243, 112, 33, 0.2)',
  },
  optionsArea: { padding: '25px', background: '#fff', borderTop: '1px solid #eee' },
  optionLabel: { fontSize: '0.75rem', fontWeight: '800', color: '#b2bec3', textTransform: 'uppercase', marginBottom: '15px', letterSpacing: '1px' },
  buttonGrid: { display: 'flex', flexWrap: 'wrap', gap: '10px' },
  faqButton: { 
    padding: '10px 18px', 
    background: '#fff', 
    border: '1.5px solid #d1d5db', 
    borderRadius: '50px', 
    cursor: 'pointer', 
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  }
};

export default ChatFAQ;