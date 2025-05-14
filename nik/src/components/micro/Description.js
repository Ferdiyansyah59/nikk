import React from 'react';

const Description = ({ text, className }) => {
  return (
    <p
      className={`text-sm md:text-lg text-desc ${className}`}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};

export default Description;