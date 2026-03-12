const axios = require('axios');

const API_URL = 'https://helpglow.onrender.com/api/campaigns';

// Paste the token you provided here
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImVkaXRvciIsImlhdCI6MTc3MzA0MjI0NCwiZXhwIjoxNzczMDQ1ODQ0fQ.p8kmqHtSRJnYg2RaxwU3sOCgP5J98EeamFyVb4eebwA"; 

const campaignsToSeed = [
  {
    caption: "Distributing notebooks, pens, and basic stationery to primary schoolers.",
    media_url: "https://i.postimg.cc/Jn0JFz4J/ed.jpg", 
    category: "Education", // Changed to match the purpose
    is_video: false
  },
  {
    caption: "Sponsoring school kits and books for 100+ students.",
    media_url: "https://i.postimg.cc/Zq9rc9h4/Whats_App_Image_2026_01_20_at_9_21_50_PM.jpg",
    category: "Education",
    is_video: false
  }
];

const startSeeding = async () => {
  console.log("🚀 Seeding started...");
  for (const data of campaignsToSeed) {
    try {
      // Added headers with your JWT token to prevent 401 errors
      await axios.post(API_URL, data, {
        headers: {
          'Authorization': `Bearer ${TOKEN}`
        }
      });
      console.log(`✅ Added to Database: ${data.category}`);
    } catch (error) {
      // Improved error logging to see exactly why it fails
      const status = error.response?.status;
      const msg = error.response?.data?.message || error.message;
      console.error(`❌ Error seeding ${data.category} [${status}]: ${msg}`);
    }
  }
  console.log("🏁 All campaigns added!");
};

startSeeding();