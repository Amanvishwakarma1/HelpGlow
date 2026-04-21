import React from "react";

function Card(props) {
  // Brand Colors
  const colors = {
    magenta: '#8e2382',
    pink: '#e61e6e',
    gold: '#d4af37',
    lightBg: '#fffdf9'
  };

  const styles = {
    founderCardWrapper: {
      display: "inline-block",
      margin: "15px", 
      width: "calc(100% - 30px)", 
      maxWidth: "300px", 
    },
    founderCard: {
      width: "100%", 
      backgroundColor: "#ffffff",
      borderRadius: "24px", // Matches premium theme
      boxShadow: "0 10px 25px rgba(142, 35, 130, 0.08)",
      overflow: "hidden",
      textAlign: "center",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      border: `1px solid rgba(212, 175, 55, 0.2)`, // Subtle gold border
    },
    imageArea: {
      width: "100%",
      height: "300px", 
      overflow: "hidden",
    },
    founderImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.5s ease",
    },
    founderInfo: {
      padding: "25px 20px",
      backgroundColor: "#ffffff", // Pure white for a clean look
      borderTop: `1px solid #f1f5f9`,
    },
    founderName: {
      margin: "0 0 5px 0",
      fontSize: "1.35rem",
      color: colors.magenta, // Deep Magenta for the Name
      fontWeight: "800",
      letterSpacing: "-0.5px"
    },
    founderTitle: {
      margin: 0,
      fontSize: "0.9rem",
      color: colors.pink, // Vibrant Pink for the Title
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "1.5px",
    },
  };

  return (
    <div style={styles.founderCardWrapper}>
      <div 
        style={styles.founderCard}
        className="team-hover-card"
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-12px)";
          e.currentTarget.style.boxShadow = "0 25px 50px rgba(142, 35, 130, 0.15)";
          e.currentTarget.style.borderColor = colors.gold;
          // Zoom image on hover
          const img = e.currentTarget.querySelector('img');
          if(img) img.style.transform = "scale(1.1)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 10px 25px rgba(142, 35, 130, 0.08)";
          e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.2)";
          const img = e.currentTarget.querySelector('img');
          if(img) img.style.transform = "scale(1)";
        }}
      >
        <div style={styles.imageArea}>
          <img 
            src={props.imgsrc} 
            alt={props.name} 
            style={styles.founderImg}
          />
        </div>
        <div style={styles.founderInfo}>
          <h4 style={styles.founderName}>{props.name}</h4>
          <p style={styles.founderTitle}>{props.position}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;