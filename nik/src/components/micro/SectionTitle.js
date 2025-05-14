import React from 'react';


const SectionTitle = ({ title, className }) => {
  return (
    <h1
      className={`text-2xl xl:text-4xl 2xl:text-6xl font-semibold text-title ${className}`}
      dangerouslySetInnerHTML={{ __html: title }}
    />
  );
};

export default SectionTitle;