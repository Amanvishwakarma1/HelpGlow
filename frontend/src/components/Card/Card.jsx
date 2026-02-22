import React from "react";

function Card(props) {
  const styles = {
    founderCardWrapper: {
      display: "inline-block",
      // margin creates the gap from top/bottom and left/right
      margin: "15px", 
      // This ensures the wrapper takes up available space
      width: "calc(100% - 30px)", 
      maxWidth: "320px", // Increased base size, but caps on desktop
    },
    founderCard: {
      width: "100%", // Takes full width of the wrapper
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.08)",
      overflow: "hidden",
      textAlign: "center",
      transition: "all 0.3s ease-in-out",
      border: "1px solid rgba(0, 0, 0, 0.05)",
    },
    imageArea: {
      width: "100%",
      // Height is set to auto or a larger fixed value to maintain aspect ratio
      height: "280px", 
      overflow: "hidden",
    },
    founderImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    founderInfo: {
      padding: "20px",
      backgroundColor: "#F5EBD7", 
      borderTop: "1px solid rgba(0, 0, 0, 0.05)",
    },
    founderName: {
      margin: "0 0 5px 0",
      fontSize: "1.3rem", // Slightly larger for the bigger card
      color: "#005689", 
      fontWeight: "700",
    },
    founderTitle: {
      margin: 0,
      fontSize: "1rem", // Slightly larger for readability
      color: "#547295", 
      fontWeight: "500",
      lineHeight: "1.4",
    },
  };

  return (
    <div style={styles.founderCardWrapper}>
      <div 
        style={styles.founderCard}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-8px)";
          e.currentTarget.style.boxShadow = "0 20px 30px rgba(0, 0, 0, 0.12)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.08)";
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