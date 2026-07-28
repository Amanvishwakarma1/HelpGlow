import React from 'react';
import { motion } from 'framer-motion';

const StoryCard = ({ title, author, date, excerpt, image, link, index = 0 }) => {
  return (
    <div role="listitem" className="stories-collection-item w-dyn-item">
      <a href={link} className="stories-wrapper w-inline-block" style={{ overflow: 'hidden' }}>
        
        {/* Content sliding in from the LEFT with increased duration & stagger delay */}
        <motion.div 
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.95, delay: 0.15 + (index * 0.12), ease: [0.22, 1, 0.36, 1] }}
          className="stories-text-container"
        >
          <h1 className="stories-heading-h1">{title}</h1>
          <div className="author-wrapper">
            <div className="author-name-wrapper">
              <div className="author-text">BY</div>
              <div className="author-text light-blue-text">{author}</div>
            </div>
            <div className="author-name-wrapper">
              <div className="author-text">ON</div>
              <div className="author-text light-blue-text">{date}</div>
            </div>
          </div>
          <div className="text-block-16px-light">{excerpt}</div>
          <div className="stories-bottom-wrapper">
            <div className="reading-text">Continue Reading</div>
            <img src="https://cdn.prod.website-files.com/61f3c8415b08f243cf83a932/61f52ba3f6f69984f37484ae_arrow-left-s-line%202.svg" loading="lazy" alt="" className="right-arrow-icon" />
          </div>
        </motion.div>

        {/* Image sliding in from the RIGHT with increased duration & stagger delay */}
        <motion.div 
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.95, delay: 0.2 + (index * 0.12), ease: [0.22, 1, 0.36, 1] }}
          className="stories-image-container"
        >
          <img src={image} loading="lazy" referrerPolicy="no-referrer" alt={title} className="stories-thumbnail-image" />
        </motion.div>

      </a>
    </div>
  );
};

export default StoryCard;
