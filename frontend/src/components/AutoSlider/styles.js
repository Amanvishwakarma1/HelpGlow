import { COLORS } from './config';

export const styles = {
  // ── BASE WRAPPERS & FONTS ──
  mainWrapper: {
    width: '100%',
    minHeight: '100vh',
    overflowX: 'hidden',
    backgroundColor: COLORS.deepBg,
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    position: 'relative',
    width: '100%',
    height: '85vh',
    overflow: 'hidden'
  },

  // ── SLIDER & 2-COLUMN LAYOUT ──
  slide: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 8%',
    boxSizing: 'border-box',
    gap: '40px'
  },
  leftColumn: {
    flex: 1.1,
    paddingRight: '30px',
    maxWidth: '50%',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  rightColumn: {
    flex: 0.9,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10
  },

  // ── PREMIUM TYPOGRAPHY & BUTTONS ──
  preHeader: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.85rem',
    fontWeight: '800',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  preHeaderDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    display: 'inline-block'
  },
  text: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '3.6rem',
    lineHeight: '1.15',
    marginBottom: '35px',
    fontWeight: '800',
    letterSpacing: '-1.5px',
    color: '#fff',
    textAlign: 'left',
    background: `linear-gradient(135deg, #ffffff 40%, #f7e7c4 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
  },
  button: {
    padding: '18px 45px',
    fontSize: '1.05rem',
    fontWeight: '800',
    border: `1px solid rgba(212, 175, 55, 0.3)`,
    borderRadius: '50px',
    cursor: 'pointer',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    boxShadow: `0 8px 30px rgba(243, 112, 33, 0.25)`,
    outline: 'none',
    position: 'relative',
    overflow: 'hidden'
  },

  // ── TELEVISION UI ELEMENTS (HYPER-REALISTIC) ──
  tvContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '560px',
    position: 'relative'
  },
  tvAmbilight: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    width: '80%',
    height: '70%',
    borderRadius: '40px',
    zIndex: 1,
    filter: 'blur(75px)',
    opacity: 0.8,
    transition: 'all 1.2s ease-in-out',
    pointerEvents: 'none'
  },
  tvFrame: {
    position: 'relative',
    width: '100%',
    aspectRatio: '16/9',
    backgroundColor: '#050505',
    border: '14px solid #1c1c1c', // gunmetal bezel
    borderBottomWidth: '24px', // bottom bezel
    outline: `2px solid rgba(212, 175, 55, 0.2)`, // metallic line details
    borderRadius: '16px',
    boxShadow: '0 35px 80px -20px rgba(0,0,0,0.95), inset 0 0 25px rgba(0,0,0,0.85)',
    overflow: 'hidden',
    zIndex: 2,
    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
  },
  tvScreen: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: '#000'
  },
  tvGlare: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '60%',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 50%, rgba(255,255,255,0) 100%)',
    pointerEvents: 'none',
    zIndex: 12
  },
  tvScanlines: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)',
    backgroundSize: '100% 4px',
    pointerEvents: 'none',
    zIndex: 11,
    opacity: 0.18
  },
  tvLED: {
    position: 'absolute',
    bottom: '-19px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    zIndex: 15,
    transition: 'all 0.5s ease'
  },
  tvStandNeck: {
    width: '55px',
    height: '22px',
    background: 'linear-gradient(90deg, #0d0d0d 0%, #2e2e2e 30%, #444444 50%, #2e2e2e 70%, #0d0d0d 100%)',
    boxShadow: 'inset 0 4px 10px rgba(0, 0, 0, 0.9)',
    zIndex: 1,
    borderTop: '1px solid rgba(255, 255, 255, 0.1)'
  },
  tvStandBase: {
    width: '240px',
    height: '10px',
    background: 'linear-gradient(90deg, #111111 0%, #3e3e3e 20%, #666666 50%, #3e3e3e 80%, #111111 100%)',
    borderRadius: '10px 10px 2px 2px',
    boxShadow: '0 12px 25px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.2)',
    zIndex: 1,
    position: 'relative'
  },
  tvStandReflection: {
    position: 'absolute',
    bottom: '-35px',
    width: '320px',
    height: '30px',
    pointerEvents: 'none',
    zIndex: 0
  },

  // ── MANUAL AND TIMER SLIDER CONTROLS ──
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(10px)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 13,
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    outline: 'none'
  },
  dotsContainer: {
    position: 'absolute',
    bottom: '20px',
    display: 'flex',
    gap: '10px',
    zIndex: 13
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
  },
  timerBarWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 14
  },
  timerBarFill: {
    height: '100%',
    backgroundColor: COLORS.gold,
    boxShadow: `0 0 10px ${COLORS.gold}`,
    transition: 'width 50ms linear'
  },

  // ── IMPACT STATS SECTION ──
  statsSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    marginTop: 'auto',
    zIndex: 5
  },
  statsScrollWrapper: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  statsScrollFadeLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '100px',
    background: `linear-gradient(90deg, ${COLORS.deepBg} 0%, rgba(45, 10, 39, 0) 100%)`,
    zIndex: 4,
    pointerEvents: 'none'
  },
  statsScrollFadeRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '100px',
    background: `linear-gradient(270deg, ${COLORS.deepBg} 0%, rgba(45, 10, 39, 0) 100%)`,
    zIndex: 4,
    pointerEvents: 'none'
  },
  statsGrid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '60px 8% 50px 8%',
    overflowX: 'auto',
    gap: '30px',
    width: '100%',
    boxSizing: 'border-box',
    WebkitOverflowScrolling: 'touch',
    scrollSnapType: 'x mandatory'
  },
  statCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '35px 25px',
    minWidth: '220px',
    flex: '1 0 220px',
    scrollSnapAlign: 'start',
    background: 'rgba(255, 255, 255, 0.04)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    color: '#fff',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
  },
  cardGlowOverlay: {
    position: 'absolute',
    inset: 0,
    background: `radial-gradient(circle at center, rgba(230, 30, 110, 0.12) 0%, rgba(255, 255, 255, 0) 70%)`,
    opacity: 0,
    transition: 'opacity 0.4s ease',
    pointerEvents: 'none',
    zIndex: 0
  },
  iconWrapper: {
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px',
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    zIndex: 2,
    transition: 'all 0.4s ease'
  },
  statValue: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '2.5rem',
    fontWeight: '900',
    margin: '8px 0',
    letterSpacing: '-0.5px',
    background: `linear-gradient(135deg, #ffffff 60%, #f7e7c4 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    zIndex: 2
  },
  statLabel: {
    fontSize: '0.75rem',
    color: '#e1cfe0',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1.8px',
    marginTop: '5px',
    zIndex: 2
  },

  // ── WATCH NOW STRIP ──
  watchNowStrip: {
    padding: '22px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)'
  },
  playIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 20px rgba(230, 30, 110, 0.5)',
    position: 'relative',
    zIndex: 2,
    transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  },
  watchText: {
    color: '#fff',
    fontWeight: '800',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '1.25rem',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    zIndex: 2
  }
};