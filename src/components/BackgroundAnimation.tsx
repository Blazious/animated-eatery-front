
import React from 'react';

const BackgroundAnimation = () => {
  return (
    <div className="background-animation-container">
      <div className="animated-shape shape1"></div>
      <div className="animated-shape shape2"></div>
      <div className="animated-shape shape3"></div>
      <div className="animated-shape" style={{
        width: '250px',
        height: '250px',
        background: 'linear-gradient(to right, #ffffff, #f0f0f0)',
        opacity: '0.08',
        top: '30%',
        right: '20%',
        animation: 'float-reverse 22s infinite alternate'
      }}></div>
    </div>
  );
};

export default BackgroundAnimation;
