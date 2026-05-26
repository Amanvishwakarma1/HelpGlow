export const styles = {
  section: { width: '100vw', padding: '100px 0', overflow: 'hidden', position: 'relative' },
  header: { textAlign: 'center', marginBottom: '40px', position: 'relative', zIndex: 2 },
  heading: { fontSize: '3rem', fontWeight: '900', letterSpacing: '-1px' },
  underline: { width: '80px', height: '6px', margin: '15px auto', borderRadius: '50px' },
  subText: { color: '#64748b', fontSize: '1.2rem' },

  sliderContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', position: 'relative', zIndex: 2 },
  sliderWrapper: { height: '620px', width: '100%', position: 'relative', perspective: '2000px', display: 'flex', justifyContent: 'center' },
  cardsContainer: { position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' },
  
  card: {
    position: 'absolute', left: '50%', top: '50%', width: '400px', maxWidth: '90vw',
    background: '#fff', borderRadius: '32px', 
    transformStyle: 'preserve-3d', overflow: 'hidden'
  },
  
  imageWrapper: { width: '100%', height: '398px', overflow: 'hidden', position: 'relative', backgroundColor: '#f1f5f9' },
  image: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  imgOverlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.05))' },

  priceBadge: {
    position: 'absolute', top: '20px', left: '20px', backdropFilter: 'blur(10px)',
    color: '#fff', padding: '10px 18px', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 5
  },
  priceVal: { fontSize: '1.2rem', fontWeight: '900' },
  priceUnit: { fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: '600' },

  cardContent: { padding: '30px', textAlign: 'left' },
  cardTitle: { fontSize: '1.6rem', fontWeight: '800', marginBottom: '12px' },
  cardDesc: { color: '#64748b', fontSize: '1rem', marginBottom: '25px', lineHeight: '1.6', minHeight: '50px' },

  buttonGroup: { display: 'flex', gap: '15px' },
  btnDonate: { flex: 2, padding: '15px', color: '#fff', border: 'none', borderRadius: '16px', cursor: 'pointer', fontWeight: '700', transition: '0.3s' },
  btnDemo: { flex: 1, padding: '15px', background: 'transparent', border: '2px solid', borderRadius: '16px', cursor: 'pointer', fontWeight: '700', transition: '0.3s' },

  dotContainer: { display: 'flex', gap: '10px', marginTop: '20px' },
  dot: { height: '10px', borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0 },

  impactSection: { margin: '80px auto', background: '#fff', borderRadius: '40px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.08)', position: 'relative', zIndex: 2 },
  impactGrid: { display: 'grid', minHeight: '550px' },
  impactImageContainer: { overflow: 'hidden', position: 'relative' },
  impactImg: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' },
  impactTextContainer: { display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'linear-gradient(135deg, #ffffff 0%, #fffbfd 100%)' },
  storyLabel: { textTransform: 'uppercase', letterSpacing: '5px', fontWeight: '800', fontSize: '1.2rem', marginBottom: '15px' },
  impactCategory: { color: '#64748b', fontSize: '1.4rem', fontWeight: '500', marginBottom: '10px' },
  impactTitle: { fontWeight: '900', lineHeight: '1.1', marginBottom: '25px' },
  impactPara: { color: '#475569', lineHeight: '1.8', marginBottom: '40px' },
  miniDotContainer: { display: 'flex', gap: '12px' },
  miniDot: { width: '12px', height: '12px', borderRadius: '50%', cursor: 'pointer' },

  divider: { maxWidth: '1100px', margin: '60px auto', border: 'none', borderTop: '2px solid rgba(212, 175, 55, 0.2)', position: 'relative', zIndex: 2 },
  modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modalContent: { width: '90%', maxWidth: '900px', position: 'relative', borderRadius: '24px', overflow: 'hidden' },
  closeBtn: { position: 'absolute', top: '20px', right: '20px', background: '#fff', border: 'none', width: '35px', height: '35px', borderRadius: '50%', cursor: 'pointer', fontWeight: 'bold', zIndex: 1010 },
  videoWrapper: { position: 'relative', paddingTop: '56.25%', width: '100%' },
  iframe: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' },

  valuesContainer: { maxWidth: '1200px', margin: '100px auto 0 auto', padding: '0 20px', textAlign: 'center', position: 'relative', zIndex: 2 },
  writingHeading: { fontSize: '3.5rem', fontWeight: '900', marginBottom: '50px', minHeight: '4.5rem' },
  cursor: { display: 'inline-block', width: '4px', marginLeft: '5px' },
  valuesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', paddingBottom: '80px' },
  valueCard: { 
    background: '#fff', padding: '45px 35px', borderRadius: '28px', border: '1px solid #f1f5f9', 
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'default' 
  },
  valueIcon: { fontSize: '3.5rem', marginBottom: '25px' },
  valueTitle: { fontSize: '1.6rem', fontWeight: '800', marginBottom: '18px' },
  valueDesc: { color: '#64748b', lineHeight: '1.7', fontSize: '1.05rem' },
};