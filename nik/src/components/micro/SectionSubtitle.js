import React from "react";

const SectionSubtitle = ({ title, className }) => {
  return (
    <h1
      className={`text-lg xl:text-2xl 2xl:text-4xl font-semibold text-title ${className}`}
      dangerouslySetInnerHTML={{ __html: title }}
    />
  );
};

export default SectionSubtitle;
