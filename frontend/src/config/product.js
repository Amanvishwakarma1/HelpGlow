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
    id: 6, 
    category: 'Combo Product', 
    name: 'Food & Cake Combo', 
    price: 850, 
    icon: '🎁', 
    desc: 'Celebrate your special day by sharing a cake and meals with 20+ children.',
    img: 'https://i.postimg.cc/3RYJYcNp/Whats-App-Image-2026-01-20-at-9-24-33-PM.jpg' 
  },
  { 
    id: 7, 
    category: 'Combo Product', 
    name: 'Mini Party', 
    price: 1500, 
    icon: '🎉', 
    desc: 'Includes meals, small gifts, and a fun evening for a group of orphans.',
    img: 'https://i.postimg.cc/DfjNKjhW/Whats-App-Image-2026-06-13-at-9-19-15-PM.jpg' 
  },
  { 
    id: 8, 
    category: 'Combo Product', 
    name: 'Special Party', 
    price: 2000, 
    icon: '✨', 
    desc: 'A full grand meal with toys and interactive games for our foundation kids.',
    img: 'https://i.postimg.cc/4NDLwyn8/IMG-20260415-WA0130-jpg.jpg' 
  },
  { 
    id: 9, 
    category: 'Combo Product', 
    name: 'Golden Celebration', 
    price: 3000, 
    icon: '🥇', 
    desc: 'Our most popular choice for anniversaries. Includes premium meal kits.',
    img: 'https://i.postimg.cc/X7PSWnqJ/20260205-170424-jpg.jpg' 
  },
  { 
    id: 10, 
    category: 'Combo Product', 
    name: 'Grand Party', 
    price: 4500, 
    icon: '👑', 
    desc: 'The ultimate sponsorship covering food, clothes, and sweets for 50+ kids.',
    img: 'https://i.postimg.cc/zX44YHPZ/Whats-App-Image-2026-02-23-at-3-36-29-PM-(1).jpg' 
  }
];

export const getMinQty = (price) => Math.ceil(600 / price);

export const isSingleEntity = (product) => {
  if (!product) return false;
  return [7, 8, 9, 10].includes(product.id);
};
