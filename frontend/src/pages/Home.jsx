import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Hero from '../components/Hero';
import CauseCard from '../components/CauseCard';
import StoryCard from '../components/StoryCard';
import ImageSlider from '../components/ImageSlider';
import TeamSlider from '../components/TeamSlider';
import TypewriterHeading from '../components/TypewriterHeading';

const EmailForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(""); 

  const handleJoin = async (e) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    setStatus(""); 

    const serviceID = "service_y644uzi"; 
    const templateID = "template_l45g3i1"; 
    const publicKey = "D_WXyCJ1YYpJMe4hC";

    const templateParams = {
      user_email: email,
      message: "A new user has subscribed to the HelpGlow newsletter.",
      joined_at: new Date().toLocaleString(),
    };

    try {
      // Send using EmailJS browser SDK
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      setStatus("Success! Thank you for joining.");
      setEmail(""); 
    } catch (err) {
      console.error("EmailJS Error:", err);
      try {
        // Fallback send format with options object
        await emailjs.send(serviceID, templateID, templateParams, { publicKey });
        setStatus("Success! Thank you for joining.");
        setEmail("");
      } catch (fallbackErr) {
        console.error("EmailJS Fallback Error:", fallbackErr);
        setStatus("Oops! Something went wrong.");
      }
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus(""), 5000);
    }
  };

  return (
    <form id="email-form" className="cta-form" onSubmit={handleJoin}>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '550px', justifyContent: 'center' }}>
          <input 
            className="text-field w-input" 
            name="email" 
            placeholder="Enter your mail" 
            type="email" 
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            style={{ margin: 0 }}
          />
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="primary-button-large submit-button w-button"
            style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer', minWidth: '120px' }}
          >
            {isSubmitting ? "..." : "Join"}
          </button>
        </div>
        {status && (
          <div style={{ 
            color: status.includes("Success") ? '#4ADE80' : '#FF6B6B', 
            marginTop: '12px', 
            fontSize: '15px', 
            fontWeight: '600',
            textAlign: 'center'
          }}>
            {status}
          </div>
        )}
      </div>
    </form>
  );
};

const Home = () => {
  // Hardcoded template content array objects mapping the layout values directly 
  const causesData = [
    {
      label: "EDUCATION",
      title: "Shaping the Future Through Learning",
      para: "We believe education is the strongest tool to break poverty. We provide kits, coaching, and support to ensure no dream goes unfulfilled.",
      img: "https://i.postimg.cc/Zq9rc9h4/Whats-App-Image-2026-01-20-at-9-21-50-PM.jpg"
    },
    {
      label: "CELEBRATIONS",
      title: "Birthdays & Anniversaries with Purpose",
      para: "Make your special milestones unforgettable. Celebrate by sharing your joy with those in need through food and gift distributions.",
      img: "https://i.postimg.cc/3rGvW53X/Whats-App-Image-2026-02-23-at-3-36-29-PM.jpg"
    },
    {
      label: "HUNGER RELIEF",
      title: "Eliminating Hunger, One Meal at a Time",
      para: "Our community kitchens work tirelessly to provide hot, nutritious meals to homeless shelters and daily wage workers.",
      img: "https://i.postimg.cc/CLDXv1S8/20260219-150733.jpg"
    }
  ];

  const storiesData = [
    {
      title: "Empowering Young Minds: School Kits & Girls' Education Initiative",
      author: 'HelpGlow Foundation',
      date: 'July 2026',
      tag: 'EDUCATION',
      readTime: '3 min read',
      excerpt: 'Brightening futures through education. We distributed essential school bags, books, and study kits to young girls in need, promoting female literacy, empowerment, and equal opportunities for every child.',
      image: 'https://i.postimg.cc/QdHTjswP/Whats-App-Image-2026-07-27-at-10-48-24-PM.jpg',
      link: '/about'
    },
    {
      title: 'Celebrating Milestones with Purpose: A Birthday Spent Spreading Smiles',
      author: 'HelpGlow Foundation',
      date: 'April 2026',
      tag: 'CELEBRATIONS',
      readTime: '4 min read',
      excerpt: 'Turning personal celebrations into meaningful impact. Generous donors celebrated their special birthday by sponsoring meal kits and gifts, bringing pure joy and nutritious food to underprivileged children.',
      image: 'https://i.postimg.cc/vHMvx3DW/Whats-App-Image-2026-07-29-at-11-51-05-PM.jpg',
      link: '/menu'
    },
    {
      title: 'Compassion Beyond Borders: Street Dog Feeding & Animal Welfare Drive',
      author: 'HelpGlow Foundation',
      date: 'January 2026',
      tag: 'ANIMAL WELFARE',
      readTime: '3 min read',
      excerpt: 'Promoting coexistence and animal care. HelpGlow volunteers conducted street dog feeding drives across Varanasi, providing wholesome meals, fresh water, and loving care to stray animals.',
      image: 'https://i.postimg.cc/MZ18ZDRP/Whats-App-Image-2026-01-20-at-9-24-31-PM.jpg',
      link: '/causes'
    }
  ];

  return (
    <>
      {/* Hero Header Unit */}
      <Hero />

      {/* Dynamic Causes Grid Component section */}
      <section className="donate-section" style={{ marginTop: '60px', paddingTop: '0px', position: 'relative', zIndex: 10 }}>
        <div className="wrapper-1200px donate-flex" style={{ maxWidth: '1400px', width: '95%', margin: '0 auto' }}>
          <div className="donate-container" style={{ width: '100%' }}>
            <div className="donate-collection-list-wrapper w-dyn-list" style={{ width: '100%' }}>
              <motion.div 
                role="list" 
                className="donate-collection-list w-dyn-items"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.22,
                      delayChildren: 0.15
                    }
                  }
                }}
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                  gap: '28px',
                  width: '100%' 
                }}
              >
                {causesData.map((cause, index) => (
                  <CauseCard key={index} {...cause} />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section: Info Description Showcase */}
      <motion.div 
        className="children-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="wrapper-1200px children-flex">
          <div className="text-container max-width-container-760px">
            <div className="heading-wrapper-animation">
              <h2 className="h2-heading-48px no-margin">The Help Glow Foundation is empowering lives and protecting animals across Varanasi, Uttar Pradesh.</h2>
            </div>
          </div>
          <div className="children-upper-wrapper">
            <div className="image-container children-image-container">
              <img src="https://cdn.prod.website-files.com/61f3c8415b08f243cf83a932/61f3f24936544255b42fe2ef_Rectangle%2016%20(1).png" loading="lazy" alt="" width="200.5" className="linear-gradient-image-absolute" />
              <div className="hero-image-animation-wrapper" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
                <img src="https://i.postimg.cc/VkGt2tJq/Whats-App-Image-2026-07-02-at-11-53-45-PM.jpg" loading="lazy" alt="" className="image-relative" style={{ width: '100%', height: 'auto', borderRadius: '16px', objectFit: 'cover' }} />
              </div>
            </div>
            <div className="text-container children-text-container">
              <div className="heading-wrapper-animation">
                <div className="text-block-20px-light">We are a registered charitable NGO based in India that lets you celebrate special occasions like birthdays and festivals by sponsoring food packets, celebratory cakes, and school bags for underprivileged children. Starting at just ₹600, we ensure 100% transparency by sending you direct photos, videos, and WhatsApp updates of your impact.</div>
              </div>
              <div className="button-conatiner margin-top-56px">
                <div className="button-wrapper">
                  <a href="/about" className="primary-button-large w-button">About us</a>
                </div>
              </div>
            </div>
          </div>
          <div className="children-bottom-wrapper">
            <div className="children-help-container">
              <div className="heading-wrapper-animation"><h2 className="h2-heading-48px">Our Vision: Food, Education, and Coexistence</h2></div>
              <div className="heading-wrapper-animation">
                <div className="text-block-20px-light">At The Help Glow Foundation, we envision a society where no individual goes to sleep hungry, every child has the means to study, and stray animals are treated with love and medical care. Our mission bridges the gap between generous donors and the most vulnerable communities and animals of Varanasi.</div>
              </div>
              <div className="button-conatiner margin-top-56px">
                <div className="button-wrapper">
                  <a href="/about" className="primary-button-large w-button">Our Vision</a>
                </div>
              </div>
            </div>
            <div className="image-container children-large-image-container" style={{ display: 'flex', alignItems: 'stretch' }}>
              <div className="hero-image-animation-wrapper" style={{ width: '100%', minHeight: '400px' }}>
                <ImageSlider />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Effort Stats Dashboard Metric Component section */}
      <motion.div 
        className="difference-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ backgroundColor: '#0B0B0E', padding: '90px 24px' }}
      >
        <div className="wrapper-1200px difference-section" style={{ maxWidth: '1400px', width: '95%', margin: '0 auto' }}>
          <div className="difference-hero-wrapper" style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="heading-wrapper-animation">
              <h2 className="h2-heading-white" style={{ color: '#FFFFFF', fontSize: '44px', fontWeight: 800, margin: '0 0 12px 0' }}>Our efforts</h2>
            </div>
            <div className="heading-wrapper-animation">
              <div className="text-block-20px-white" style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '20px', maxWidth: '800px', margin: '0 auto' }}>
                In our 20 years of service, we've helped shape thousands of lives. Join our mission to bring joy to the ones that deserve it the most.
              </div>
            </div>
          </div>
          <div className="w-layout-grid difference-grid" style={{ marginBottom: '60px' }}>
            <div className="difference-wrapper" style={{ background: '#161E2E', borderRadius: '20px', padding: '32px 24px', border: '1px solid rgba(10,144,181,0.25)' }}>
              <h3 className="value-white-text" style={{ color: '#FFFFFF', fontSize: '42px', fontWeight: 800, margin: '0 0 6px 0' }}>15,500</h3>
              <div className="text-block-16px-white" style={{ color: '#0A90B5', fontSize: '13px', fontWeight: 800, letterSpacing: '1.2px' }}>DONATIONS</div>
              <div className="orange-line" style={{ width: '40px', height: '3px', background: 'linear-gradient(90deg, #0A90B5, #D95B28)', margin: '14px 0' }}></div>
              <div className="orange-icon-container"><img src="https://cdn.prod.website-files.com/61f3c8415b08f243cf83a932/61f3fd40cb30a0e07f76d7fc_hand-coin-fill%201.svg" loading="lazy" alt="" className="efforts-icon" /></div>
            </div>
            <div className="difference-wrapper" style={{ background: '#161E2E', borderRadius: '20px', padding: '32px 24px', border: '1px solid rgba(10,144,181,0.25)' }}>
              <h3 className="value-white-text" style={{ color: '#FFFFFF', fontSize: '42px', fontWeight: 800, margin: '0 0 6px 0' }}>9M+</h3>
              <div className="text-block-16px-white" style={{ color: '#D95B28', fontSize: '13px', fontWeight: 800, letterSpacing: '1.2px' }}>FUNDS RAISED</div>
              <div className="orange-line" style={{ width: '40px', height: '3px', background: 'linear-gradient(90deg, #0A90B5, #D95B28)', margin: '14px 0' }}></div>
              <div className="orange-icon-container"><img src="https://cdn.prod.website-files.com/61f3c8415b08f243cf83a932/61f3fd404cd2f77d7d3afe5a_money-dollar-circle-fill%201.svg" loading="lazy" alt="" className="efforts-icon" /></div>
            </div>
            <div className="difference-wrapper" style={{ background: '#161E2E', borderRadius: '20px', padding: '32px 24px', border: '1px solid rgba(10,144,181,0.25)' }}>
              <h3 className="value-white-text" style={{ color: '#FFFFFF', fontSize: '42px', fontWeight: 800, margin: '0 0 6px 0' }}>750</h3>
              <div className="text-block-16px-white" style={{ color: '#0A90B5', fontSize: '13px', fontWeight: 800, letterSpacing: '1.2px' }}>EVENTS COMPLETED</div>
              <div className="orange-line" style={{ width: '40px', height: '3px', background: 'linear-gradient(90deg, #0A90B5, #D95B28)', margin: '14px 0' }}></div>
              <div className="orange-icon-container"><img src="https://cdn.prod.website-files.com/61f3c8415b08f243cf83a932/61f3fd40a7235b23421dca3d_calendar-fill%201.svg" loading="lazy" alt="" className="efforts-icon" /></div>
            </div>
            <div className="difference-wrapper" style={{ background: '#161E2E', borderRadius: '20px', padding: '32px 24px', border: '1px solid rgba(10,144,181,0.25)' }}>
              <h3 className="value-white-text" style={{ color: '#FFFFFF', fontSize: '42px', fontWeight: 800, margin: '0 0 6px 0' }}>25,000</h3>
              <div className="text-block-16px-white" style={{ color: '#D95B28', fontSize: '13px', fontWeight: 800, letterSpacing: '1.2px' }}>REGISTERED VOLUNTEERS</div>
              <div className="orange-line" style={{ width: '40px', height: '3px', background: 'linear-gradient(90deg, #0A90B5, #D95B28)', margin: '14px 0' }}></div>
              <div className="orange-icon-container"><img src="https://cdn.prod.website-files.com/61f3c8415b08f243cf83a932/61f3fd40a6f33897da433b89_user-3-fill%201.svg" loading="lazy" alt="" className="efforts-icon" /></div>
            </div>
          </div>

          {/* Slider Testimonial / Team Members Section */}
          <TeamSlider />
        </div>
      </motion.div>

      {/* Stories Archive Display Area */}
      <div className="stories-section" style={{ overflow: 'hidden' }}>
        <div className="wrapper-1200px stories-flex">
          <div className="stories-text-wrapper">
            <div className="heading-wrapper-animation">
              <TypewriterHeading text="Some recent Stories" className="h2-heading-48px" />
            </div>
            <div className="heading-wrapper-animation">
              <div className="text-block-20px-light">Become a part of stories that keep us motivated in bringing small but important change, every single day.</div>
            </div>
          </div>
          <div className="stories-container">
            <div className="stories-collection-list-wrapper w-dyn-list">
              <div role="list" className="stories-collection-list w-dyn-items">
                {storiesData.map((story, index) => (
                  <StoryCard key={index} index={index} {...story} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call To Action Form Sign-up banner section */}
      <motion.div 
        className="cta-section"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="wrapper-1200px cta-flex">
          <div className="cta-container">
            <div className="cta-wrapper">
              <h2>Join our mission</h2>
              <div className="text-block-20px-white white-text-opacity-50">Receive impact stories directly in your inbox.</div>
              <div className="cta-form-block w-form">
                <EmailForm />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Home;
