import React from 'react'
import Card from '../Card/Card'

function Team() {
  const headingStyle = {
    color: '#0284c7',
    textAlign: 'center',
    fontSize: '32px',
    fontWeight: 'bold',
    marginTop: '60px',
    marginBottom: '5px',
    textTransform: 'uppercase',
    letterSpacing: '3px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    cursor: 'default',
    display: 'block',
    transition: 'all 0.3s ease'
  };

  // Main container style - now using Grid for Desktop
  const containerStyle = {
    display: 'grid',
    // On desktop, this forces 4 equal columns
    gridTemplateColumns: 'repeat(4, 1fr)', 
    gap: '20px',
    padding: '0 20px 60px 20px',
    maxWidth: '1300px',
    margin: '0 auto',
    justifyItems: 'center'
  };

  return (
    <section style={{ backgroundColor: '#ffffff' }}>
      <style>
        {`
          .team-title-container {
            text-align: center;
            margin-bottom: 40px;
          }

          .team-title {
            position: relative;
            display: inline-block;
          }

          .team-title::after {
            content: '';
            position: absolute;
            width: 40px;
            height: 4px;
            bottom: -8px;
            left: 50%;
            background-color: #0ea5e9;
            transform: translateX(-50%);
            transition: all 0.4s ease-in-out;
            border-radius: 2px;
          }

          /* Tablet View: 2 cards per row */
          @media (max-width: 1024px) {
            .team-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }

          /* Mobile View: 1 card per row */
          @media (max-width: 650px) {
            .team-grid {
              grid-template-columns: repeat(1, 1fr) !important;
              gap: 10px !important;
            }
          }

          .team-card-wrapper {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            cursor: pointer;
            width: 100%;
            display: flex;
            justify-content: center;
          }

          .team-card-wrapper:hover {
            transform: translateY(-12px);
            filter: drop-shadow(0 15px 25px rgba(2, 132, 199, 0.15));
          }
        `}
      </style>

      <div className="team-title-container">
        <h2 style={headingStyle} className="team-title">Our Team</h2>
      </div>

      <div style={containerStyle} className="team-grid">
        <div className="team-card-wrapper">
          <Card 
            name="Ankit Singh" 
            position="Founder"
            imgsrc="https://i.postimg.cc/J0n8wP38/Whats-App-Image-2026-01-19-at-4-59-48-PM.jpg"
          />
        </div>

        <div className="team-card-wrapper">
          <Card 
            name="Ganesh Singh" 
            position="Cofounder"
            imgsrc="https://i.postimg.cc/nhfHMGpW/1769146723371.png"
          />
        </div>

        <div className="team-card-wrapper">
          <Card 
            name="Himesh Singh" 
            position="Director & Cofounder"
            imgsrc="https://i.postimg.cc/fWBWH070/Whats-App-Image-2026-01-19-at-10-19-12-AM.jpg"
          />
        </div>

        <div className="team-card-wrapper">
          <Card 
            name="Himanshu Singh" 
            position="Onfield Manager"
            imgsrc="https://i.postimg.cc/Px6GMYg9/Whats-App-Image-2026-01-19-at-5-04-53-PM.jpg"
          />
        </div>
      </div>
    </section>
  )
}

export default Team;