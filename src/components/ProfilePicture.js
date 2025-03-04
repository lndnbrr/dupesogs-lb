/* eslint-disable @next/next/no-img-element */

import PropTypes from 'prop-types';
import React from 'react';

// component that renders pfp format wherever you may need it
// params represent the source that will be displayed, the alt text for that image and the size(width and height will be the same since it's a symetrical circle)
export default function ProfilePicture({ src, alt, size }) {
  // object that crops the image.
  // borderRadius rounds out the corners of an image, as going above 50% is unnecessary. overflow handles how the image displays if it is too large for the border, so setting it to 'hidden' will hide the remaining uncropped corners.
  const circleBorder = {
    width: size,
    height: size,
    borderRadius: '50%',
    overflow: 'hidden',
  };

  // object that displays the image.
  // width and height are set to 100% so that the image can cover 100% of the width of the border and 100% height of the border. objectFit manages the aspect ratio of the image as it's being modified to the parent div size, so setting it to 'cover' will ensure the image will cover all portions of the parent div size.
  const imageDisplay = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  // return statement utilizing the params to make a dynamically rendered div for the pfp
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
