export const products = [
  { 
    id: 1, 
    category: 'Single Product', 
    name: 'Food Packet', 
    price: 30, 
    icon: '🍲', 
    desc: 'Provide a warm, nutritious meal to an elderly or homeless person today.',
    img: 'https://i.postimg.cc/RVtyFXPy/Whats-App-Image-2026-06-10-at-10-12-40-PM.jpg' 
  },
  { 
    id: 2, 
    category: 'Single Product', 
    name: 'Dog Foods', 
    price: 40, 
    icon: '🐶', 
    desc: 'Help us feed the stray dogs in our community who are wandering hungry.',
    img: 'https://i.postimg.cc/MZ18ZDRP/Whats-App-Image-2026-01-20-at-9-24-31-PM.jpg' 
  },
  { 
    id: 3, 
    category: 'Single Product', 
    name: 'Basic Education Kit', 
    price: 50, 
    icon: '📚', 
    desc: 'Sponsor essential stationery like notebooks and pens for a slum child.',
    img: 'https://i.postimg.cc/8kXL5RSY/Whats-App-Image-2026-01-20-at-9-15-45-PM.jpg' 
  },
  { 
    id: 4, 
    category: 'Single Product', 
    name: 'Grocery Kit', 
    price: 650, 
    icon: '🧺', 
    desc: 'A complete monthly ration kit including rice, dal, and oil for a poor family.',
    img: 'https://i.postimg.cc/NM4STN4y/Whats-App-Image-2026-01-20-at-9-21-49-PM.jpg' 
  },
  { 
    id: 5, 
    category: 'Single Product', 
    name: 'Celebration Cake', 
    price: 600, 
    icon: '🎂', 
    desc: 'Bring a smile to a child’s face by sponsoring their very first birthday cake.',
    img: 'https://i.postimg.cc/TP24xjGd/Whats-App-Image-2026-02-23-at-3-36-28-PM.jpg' 
  },
  { 
    id: 13, 
    category: 'Single Product', 
    name: 'School Bag Giveaway', 
    price: 499, 
    unit: 'children',
    icon: '🎒', 
    badgeText: '₹499 per Child (Min 2 Children)',
    desc: 'Sponsor durable, high-quality school bags for underprivileged children to support their daily education.',
    img: 'https://i.postimg.cc/8kXL5RSY/Whats-App-Image-2026-01-20-at-9-15-45-PM.jpg' 
  },
  { 
    id: 6, 
    category: 'Combo Product', 
    name: 'Birthday Celebration Combo', 
    price: 850, 
    unit: '10 children',
    icon: '🎂', 
    desc: 'Description: ₹30 per food packet + ₹550 for cake',
    img: 'https://i.postimg.cc/3RYJYcNp/Whats-App-Image-2026-01-20-at-9-24-33-PM.jpg',
    isSpecialCombo: true,
    tiers: [
      { children: 10, price: 850, label: 'For 10 Kids (Food + Cake) = ₹850' },
      { children: 20, price: 1150, label: 'For 20 Kids (Food + Cake) = ₹1,150' },
      { children: 30, price: 1450, label: 'For 30 Kids (Food + Cake) = ₹1,450' },
      { children: 50, price: 2050, label: 'For 50 Kids (Food + Cake) = ₹2,050' },
      { children: 100, price: 3550, label: 'For 100 Kids (Food + Cake) = ₹3,550' }
    ]
  },
  { 
    id: 7, 
    category: 'Combo Product', 
    name: 'Mini Party', 
    price: 1500, 
    icon: '🎉', 
    badgeText: 'Mini party for 25 Children',
    desc: 'Includes meals, small gifts, and a fun evening for a group of orphans.',
    img: 'https://i.postimg.cc/DfjNKjhW/Whats-App-Image-2026-06-13-at-9-19-15-PM.jpg' 
  },
  { 
    id: 8, 
    category: 'Combo Product', 
    name: 'Special Party', 
    price: 2000, 
    icon: '✨', 
    badgeText: 'Special Party for 30 Children',
    desc: 'A full grand meal with toys and interactive games for our foundation kids.',
    img: 'https://i.postimg.cc/4NDLwyn8/IMG-20260415-WA0130-jpg.jpg' 
  },
  { 
    id: 9, 
    category: 'Combo Product', 
    name: 'Golden Celebration', 
    price: 3000, 
    icon: '🥇', 
    badgeText: 'Golden Celebration Package for 40 Children',
    desc: 'Our most popular choice for anniversaries. Includes premium meal kits.',
    img: 'https://i.postimg.cc/X7PSWnqJ/20260205-170424-jpg.jpg' 
  },
  { 
    id: 10, 
    category: 'Combo Product', 
    name: 'Grand Party', 
    price: 4500, 
    icon: '👑', 
    badgeText: 'Grand Party Package for 50+ Children',
    desc: 'The ultimate sponsorship covering food, clothes, and sweets for 50+ kids.',
    img: 'https://i.postimg.cc/zX44YHPZ/Whats-App-Image-2026-02-23-at-3-36-29-PM-(1).jpg' 
  },
  { 
    id: 12, 
    category: 'Combo Product', 
    name: 'Big Grand Celebration', 
    price: 9000, 
    icon: '🎆', 
    badgeText: 'Big Grand Celebration Package',
    desc: 'The most grand, high-impact celebration package covering full festive meals, gifts, and special activities for 100+ children.',
    img: 'https://i.postimg.cc/K4X4kKTv/Whats-App-Image-2026-06-24-at-10-39-45-AM.jpg' 
  },
  { 
    id: 11, 
    category: 'Single Product', 
    name: 'Test Payment Pack', 
    price: 2, 
    unit: 'test',
    icon: '🧪', 
    badgeText: 'Test Payment (₹2)',
    desc: 'Quick ₹2 verification card to test checkout, payment receipt upload, and order processing flow.',
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop'
  }
];

export const getMinQty = (price) => {
  if (price <= 10) return 1;
  return Math.ceil(600 / price);
};

export const isSingleEntity = (product) => {
  if (!product) return false;
  return [7, 8, 9, 10, 11, 12].includes(product.id);
};
