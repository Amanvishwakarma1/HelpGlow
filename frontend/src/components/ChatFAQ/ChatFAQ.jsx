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
            <h3 style={styles.ctaTitle}>Have any questions?</h3>
            <p style={styles.ctaSubtitle}>Our AI assistant is here to help you 24/7.</p>
          </div>
          <button 
            style={styles.chatButton} 
            onClick={() => setIsOpen(true)}
            // --- Hover Zoom Logic ---
            onMouseEnter={(e) => {
                e.target.style.background = '#0369a1';
                e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
                e.target.style.background = '#0c4a6e';
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
    <div style={styles.chatContainer}>
      <div style={styles.chatHeader}>
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
          <div key={index} style={msg.type === 'bot' ? styles.botBubble : styles.userBubble}>
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
              style={styles.faqButton}
              // --- Hover Zoom for FAQ Pills ---
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.08)';
                e.target.style.borderColor = '#0284c7';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.borderColor = '#e2e8f0';
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
    padding: '2px', 
    background: 'linear-gradient(90deg, #38bdf8, #0284c7)', 
    borderRadius: '15px',
    boxShadow: '0 10px 25px -5px rgba(2, 132, 199, 0.15)',
  },
  ctaContent: {
    background: '#fff', 
    borderRadius: '13px',
    padding: '35px 50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '20px'
  },
  ctaTitle: { margin: 0, color: '#0369a1', fontSize: '1.6rem', fontWeight: '800' },
  ctaSubtitle: { margin: '5px 0 0', color: '#64748b', fontSize: '1rem' },
  chatButton: {
    padding: '15px 35px',
    background: '#0c4a6e', 
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease', // Smooth zoom transition
  },
  chatContainer: {
    width: '90%',
    maxWidth: '500px',
    height: '600px',
    margin: '40px auto',
    background: '#fff',
    borderRadius: '24px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    border: '5px solid #0284c7',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  chatHeader: {
    padding: '20px',
    background: '#0284c7',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerInfo: { display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '700' },
  onlineDot: { width: '10px', height: '10px', background: '#4ade80', borderRadius: '50%' },
  closeBtn: { background: 'none', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', transition: '0.2s' },
  messageArea: { 
    flex: 1, 
    padding: '20px', 
    overflowY: 'auto', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '15px', 
    background: '#f1f5f9' 
  },
  botBubble: { 
    alignSelf: 'flex-start', 
    padding: '12px 18px', 
    background: '#fff', 
    color: '#334155', 
    borderRadius: '20px 20px 20px 5px', 
    maxWidth: '85%',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
  },
  userBubble: { 
    alignSelf: 'flex-end', 
    padding: '12px 18px', 
    background: '#0284c7', 
    color: '#fff', 
    borderRadius: '20px 20px 5px 20px', 
    maxWidth: '85%',
  },
  optionsArea: { padding: '20px', background: '#fff', borderTop: '1px solid #e2e8f0' },
  optionLabel: { fontSize: '0.8rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '12px' },
  buttonGrid: { display: 'flex', flexWrap: 'wrap', gap: '10px' },
  faqButton: { 
    padding: '10px 16px', 
    background: '#f8fafc', 
    border: '1px solid #e2e8f0', 
    borderRadius: '12px', 
    cursor: 'pointer', 
    fontSize: '0.9rem',
    color: '#0369a1',
    transition: 'all 0.2s ease', // Smooth zoom transition
  }
};

export default ChatFAQ;