import React from 'react'
import AutoSlider from '../AutoSlider/AutoSlider'
import Team from '../Team/Team'
import ChatFAQ from '../ChatFAQ/ChatFAQ'
import OurWorks from '../OurWorks/OurWorks'
import WhatsAppButton from './WhatsAppButton'

function Home() {
  return (
    <>
    <AutoSlider/>
    <OurWorks/>
    <Team/>
    <section style={{ padding: '50px 20px' }}>
        <h2 style={{ textAlign: 'center', color: '#0284c7' }}>Have Questions?</h2>
        <ChatFAQ/>
    </section>
    <WhatsAppButton/>
    </>
  )
}

export default Home
