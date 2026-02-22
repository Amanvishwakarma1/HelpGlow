import React, { useEffect, memo } from 'react';

const WhatsAppButton = memo(() => {
  // Your specific WhatsApp Business Link
  const whatsappUrl = "https://wa.me/message/ZMTBXKUYV7MWB1";

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .wa-advanced-container {
        position: fixed;
        bottom: 60px; /* Elevated position as requested */
        left: 30px;
        z-index: 10000;
        pointer-events: none;
      }

      .wa-advanced-link {
        pointer-events: auto;
        display: flex;
        align-items: center;
        background-color: #25d366;
        color: white !important;
        text-decoration: none;
        font-family: 'Segoe UI', Roboto, sans-serif;
        font-weight: 600;
        
        /* Initial Circle State */
        width: 56px;
        height: 56px;
        border-radius: 50px;
        overflow: hidden;
        
        box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        transition: width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                    background-color 0.3s ease, 
                    transform 0.3s ease;
      }

      .wa-icon-wrapper {
        min-width: 56px;
        height: 56px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .wa-icon-wrapper img {
        width: 32px;
        height: 32px;
      }

      .wa-text {
        white-space: nowrap;
        padding-right: 25px;
        opacity: 0;
        transition: opacity 0.3s ease;
        font-size: 15px;
      }

      /* Hover Interaction: Expand and Show Text */
      .wa-advanced-link:hover {
        width: 195px; 
        background-color: #128c7e;
        transform: translateY(-5px); /* Professional lift */
      }

      .wa-advanced-link:hover .wa-text {
        opacity: 1;
      }

      /* Subtle entry animation */
      @keyframes wa-fade-in {
        from { opacity: 0; transform: translateX(-20px); }
        to { opacity: 1; transform: translateX(0); }
      }
      .wa-advanced-container {
        animation: wa-fade-in 0.8s ease-out;
      }

      @media (max-width: 768px) {
        .wa-advanced-container { bottom: 40px; left: 20px; }
        .wa-advanced-link:hover { width: 56px; } 
        .wa-text { display: none; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (document.head.contains(style)) document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="wa-advanced-container">
      <a 
        href={whatsappUrl}
        className="wa-advanced-link"
        target="_blank" 
        rel="noreferrer"
      >
        <div className="wa-icon-wrapper">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
            alt="WhatsApp" 
          />
        </div>
        <span className="wa-text">Chat with us</span>
      </a>
    </div>
  );
});

export default WhatsAppButton;