// Import your downloaded, highly compressed local videos here
import slide1 from '../../assets/slide1.mp4';
import slide2 from '../../assets/slide2.mp4';
import slide3 from '../../assets/slide3.mp4';

export const COLORS = {
  magenta: '#8e2382',
  pink: '#e61e6e',
  orange: '#f37021',
  gold: '#d4af37',
  deepBg: '#2d0a27'
};

export const VIDEO_SLIDES = [
  {
    id: 1,
    videoUrl: slide1, // Using the local import
    text: "They don’t ask for much — just one meal to survive the day."
  },
  {
    id: 2,
    videoUrl: slide2, // Using the local import
    text: "Education is their only way out. Your support can change a life."
  },
  {
    id: 3,
    videoUrl: slide3, // Using the local import
    text: "A small donation today can end someone’s hunger tonight."
  }
];

export const STATS_DATA = [
  { value: 10, label: "Donations Raised", suffix: " Cr+" },
  { value: 1, label: "Active Donors", suffix: " Lakh +" },
  { value: 7, label: "Birthday Giving", suffix: " Lakh+" },
  { value: 20, label: "Lives Impacted", suffix: " Lakh+" },
  { value: 35, label: "Meals Served", suffix: " Lakh+" },
];