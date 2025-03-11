/* eslint-disable @next/next/no-img-element */

import PropTypes from 'prop-types';
import React from 'react';

export default function ProfilePicture({ src, alt, size }) {
  const circleBorder = {
    width: size,
    height: size,
    borderRadius: '50%',
    overflow: 'hidden',
  };

  const imageDisplay = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  return (
    <div style={circleBorder}>
      <img src={src} alt={alt} style={imageDisplay} />
    </div>
  );
}

ProfilePicture.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};
