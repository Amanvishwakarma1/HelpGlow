import React, { useState, useEffect } from 'react';

const slides = [
  {
    image: "https://static.vecteezy.com/system/resources/previews/029/182/310/non_2x/indian-street-dog-on-outdoor-free-photo.JPG",
    text: "They don’t ask for much — just one meal to survive the day."
  },
  {
    image: "https://i.postimg.cc/SsYMXkch/Screenshot-2026-01-20-005258.png",
    text: "Education is their only way out. Your support can change a life."
  },
  {
    image: "https://thumbs.dreamstime.com/b/social-hunger-volunteers-provide-food-assistance-to-poor-people-who-need-164997820.jpg",
    text: "A small donation today can end someone’s hunger tonight."
  }
];

const AutoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.container}>
      {slides.map((slide, index) => (
        <div
          key={index}
          style={{
            ...styles.slide,
            opacity: currentIndex === index ? 1 : 0,
            zIndex: currentIndex === index ? 1 : 0,
          }}
        >
          <img src={slide.image} alt={`Slide ${index}`} style={styles.image} />
          <div style={styles.overlay} />

          {/* TEXT + BUTTON (same position always) */}
          <div style={styles.content}>
            <h1 style={styles.text}>{slide.text}</h1>
            <button
  style={styles.button}
  onMouseEnter={(e) => {
    e.target.style.transform = "scale(1.1)";
    e.target.style.boxShadow = "0 12px 30px rgba(255, 204, 0, 0.6)";
    e.target.style.backgroundColor = "#ffd633";
  }}
  onMouseLeave={(e) => {
    e.target.style.transform = "scale(1)";
    e.target.style.boxShadow = "none";
    e.target.style.backgroundColor = "#ffcc00";
  }}
  onClick={()=>{window.location.href="https://wa.me/message/ZMTBXKUYV7MWB1","_blank"}}
>
  Donate Now
</button>

          </div>
        </div>
      ))}

      <div style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <div
            key={index}
            style={{
              ...styles.dot,
              backgroundColor:
                currentIndex === index ? '#fff' : 'rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '100vw',
    height: 'calc(100vh - 80px)',
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  slide: {
    position: 'absolute',
    inset: 0,
    transition: 'opacity 1.2s ease-in-out',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.2))',
  },

  /* 🔥 CONTENT POSITION */
  content: {
    position: 'absolute',
    left: '8%',
    bottom: '25%',
    maxWidth: '520px',
    color: '#fff',
    zIndex: 5,
  },

  text: {
    fontSize: '2.6rem',
    lineHeight: '1.3',
    marginBottom: '20px',
    fontWeight: '700',
  },

  button: {
    padding: '14px 34px',
    fontSize: '1.1rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    backgroundColor: '#ffcc00',
    color: '#000',
    transition: 'all 0.3s ease',
  },

  dotsContainer: {
    position: 'absolute',
    bottom: '30px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    zIndex: 10,
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    transition: 'all 0.3s ease',
  },
};

export default AutoSlider;
