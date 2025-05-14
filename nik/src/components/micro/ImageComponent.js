import Image from 'next/image';
import React from 'react';

const ImageComponent = ({
  src,
  className,
  alt,
  imageStyle,
  layout = 'responsive',
  aos,
}) => {
  return (
    <div
      data-aos={aos}
      className={`${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={500}
        height={500}
        layout={layout}
        className={`object-cover ${imageStyle}`}
      />
    </div>
  );
};

export default ImageComponent;