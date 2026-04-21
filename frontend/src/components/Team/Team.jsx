import React from 'react'
import Card from '../Card/Card'

function Team() {
  // Brand Colors
  const colors = {
    magenta: '#8e2382',
    pink: '#e61e6e',
    orange: '#f37021',
    gold: '#d4af37',
    lightBg: '#fffdf9'
  };

  const headingStyle = {
    textAlign: 'center',
    fontSize: '34px',
    fontWeight: '900',
    marginTop: '60px',
    marginBottom: '5px',
    textTransform: 'uppercase',
    letterSpacing: '4px',
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    cursor: 'default',
    display: 'block',
    transition: 'all 0.3s ease',
    // Gradient Text
    background: `linear-gradient(to right, ${colors.magenta}, ${colors.pink})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)', 
    gap: '30px',
    padding: '0 20px 80px 20px',
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
            margin-bottom: 50px;
          }

          .team-title {
            position: relative;
            display: inline-block;
          }

          .team-title::after {
            content: '';
            position: absolute;
            width: 50px;
            height: 5px;
            bottom: -10px;
            left: 50%;
            background: linear-gradient(to right, ${colors.magenta}, ${colors.gold});
            transform: translateX(-50%);
            transition: all 0.4s ease-in-out;
            border-radius: 50px;
          }

          /* Hover effect for the title underline */
          .team-title:hover::after {
            width: 80px;
          }

          @media (max-width: 1024px) {
            .team-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 20px !important;
            }
          }

          @media (max-width: 650px) {
            .team-grid {
              grid-template-columns: repeat(1, 1fr) !important;
              gap: 15px !important;
            }
          }

          .team-card-wrapper {
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            cursor: pointer;
            width: 100%;
            display: flex;
            justify-content: center;
            border-radius: 20px;
          }

          .team-card-wrapper:hover {
            transform: translateY(-15px) scale(1.02);
            filter: drop-shadow(0 20px 30px rgba(142, 35, 130, 0.15));
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