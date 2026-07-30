import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, ShieldCheck, Heart, CheckCircle2, ArrowLeft, Award, Scale, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
  };

  const guarantees = [
    {
      icon: <Heart size={28} color="#0A90B5" />,
      title: "100% Direct Impact",
      desc: "100% of your sponsored food packets, birthday cakes, and study kits directly reach verified underprivileged beneficiaries."
    },
    {
      icon: <Award size={28} color="#0A90B5" />,
      title: "Proof of Celebration",
      desc: "For every celebration package sponsored, HelpGlow delivers direct photographic and video proof of distribution."
    },
    {
      icon: <ShieldCheck size={28} color="#0A90B5" />,
      title: "Legal NGO Registration",
      desc: "Fully registered and compliant under MCA Government of India (CIN: U88100UP2025NPL229317) and NGO Darpan."
    },
    {
      icon: <Scale size={28} color="#0A90B5" />,
      title: "Ethical Honor Code",
      desc: "Unconditional respect, non-discriminatory service, and complete transparency in every community project."
    }
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: '#111827', backgroundColor: '#FFFFFF', overflowX: 'hidden' }}>
      
      {/* Hero Banner */}
      <section style={{ 
        position: 'relative', 
        backgroundColor: '#16203A', 
        color: '#FFFFFF', 
        padding: '130px 24px 70px 24px',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            top: '-15%',
            right: '25%',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(230, 30, 110, 0.25) 0%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none'
          }}
        />

        <div style={{ maxWidth: '950px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div initial="hidden" animate="visible" variants={fadeInVariants}>
            <div style={{ marginBottom: '18px' }}>
              <span style={{ 
                background: 'linear-gradient(135deg, rgba(10, 144, 181, 0.18), rgba(10, 144, 181, 0.05))', 
                color: '#0A90B5', 
                border: '1px solid rgba(10, 144, 181, 0.4)',
                padding: '8px 22px', 
                borderRadius: '50px', 
                fontSize: '12.5px', 
                fontWeight: 800, 
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <FileText size={16} color="#0A90B5" />
                TERMS OF SERVICE & TRANSPARENCY CHARTER
              </span>
            </div>

            <h1 style={{ 
              fontFamily: "'Clash Display', 'Outfit', sans-serif", 
              fontSize: 'clamp(36px, 5vw, 54px)', 
              fontWeight: 800, 
              background: 'linear-gradient(135deg, #FFFFFF 40%, #FCDCB5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '0 0 20px 0',
              lineHeight: 1.18
            }}>
              Direct Giving Terms & Ethical Giving Commitments
            </h1>

            <p style={{ fontSize: '19px', lineHeight: '1.7', color: 'rgba(255, 255, 255, 0.88)', maxWidth: '820px', margin: '0 auto' }}>
              HelpGlow Foundation operates on radical transparency, accountability, and direct human impact. Review our formal service terms and donor charter below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '70px 24px 90px 24px', backgroundColor: '#F8F9FA' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          {/* Back Navigation */}
          <div style={{ marginBottom: '32px' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#0A90B5', fontWeight: 700, textDecoration: 'none', fontSize: '15px' }}>
              <ArrowLeft size={18} /> Back to Home
            </Link>
          </div>

          {/* Guarantees Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '50px' }}>
            {guarantees.map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -6 }}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '28px',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.04)'
                }}
              >
                <div style={{ backgroundColor: 'rgba(10, 144, 181, 0.1)', width: '54px', height: '54px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                  {item.icon}
                </div>
                <h3 style={{ fontFamily: "'Clash Display', 'Outfit', sans-serif", fontSize: '20px', fontWeight: 800, color: '#16203A', margin: '0 0 10px 0' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '14.5px', color: '#4B5563', lineHeight: '1.6', margin: 0 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Detailed Terms Card */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '44px', border: '1px solid #E5E7EB', boxShadow: '0 12px 36px rgba(0,0,0,0.04)' }}>
            
            <div style={{ borderBottom: '1px solid #E5E7EB', paddingBottom: '24px', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: "'Clash Display', 'Outfit', sans-serif", fontSize: '28px', fontWeight: 800, color: '#16203A', margin: '0 0 8px 0' }}>
                HelpGlow Foundation Terms of Service & Donor Agreement
              </h2>
              <span style={{ fontSize: '13px', color: '#6B7280', fontWeight: 600 }}>
                Government Registration: CIN U88100UP2025NPL229317 • NGO Darpan: UP/2022/0314589
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', fontSize: '16px', lineHeight: '1.75', color: '#374151' }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#16203A', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={20} color="#0A90B5" />
                  1. Direct Sponsorship Fulfillment
                </h3>
                <p style={{ margin: 0 }}>
                  All sponsorships submitted through HelpGlow (food packets, birthday celebration combos, grocery kits, and education kits) are strictly deployed for verified underprivileged children, elderly citizens, and stray animals across Varanasi.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#16203A', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={20} color="#0A90B5" />
                  2. Video Wish & Date Scheduling
                </h3>
                <p style={{ margin: 0 }}>
                  For celebration combos (birthdays, anniversaries), donors select a specific video/celebration date during checkout. HelpGlow conducts the distribution on the requested date and sends proof via WhatsApp (+91 8528220733).
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#16203A', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={20} color="#0A90B5" />
                  3. Contributions & Cancellation Policy
                </h3>
                <p style={{ margin: 0 }}>
                  Because funds are directly allocated toward purchasing fresh meals and custom celebration cakes, sponsorships are non-refundable once procurement has commenced. Date changes or package adjustments can be requested up to 24 hours prior to the scheduled date via our helpline.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#16203A', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={20} color="#0A90B5" />
                  4. Non-Discriminatory Service Code
                </h3>
                <p style={{ margin: 0 }}>
                  HelpGlow Foundation operates with zero bias based on caste, creed, religion, gender, or social status. All beneficiaries receive care and respect with absolute human dignity.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#16203A', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={20} color="#0A90B5" />
                  5. Official Contact & Verification
                </h3>
                <p style={{ margin: 0 }}>
                  HelpGlow Foundation, Kundaria Benipur, Varanasi 221307, Uttar Pradesh.
                  <br />
                  <strong>Official Helpline:</strong> +91 8528220733
                  <br />
                  <strong>PAN Card:</strong> AAICH0991A
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default TermsOfService;
