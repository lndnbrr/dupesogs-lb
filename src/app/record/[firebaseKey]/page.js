/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getSingleRecord } from '@/api/recordData';

export default function ViewRecordDetailsPage({ params }) {
  const { firebaseKey } = params;

  const [recordDets, setRecordDets] = useState({});

  const recordDetails = () => {
    getSingleRecord(firebaseKey).then(setRecordDets);
  };

  useEffect(() => {
    recordDetails();
  }, [firebaseKey]);

  return (
    <>
      <div>insert individual record content here!</div>
      <img src={recordDets.image} alt="album cover" height={300} width={300} />
      <h1>{recordDets.title}</h1>
      <h2>{recordDets.artist}</h2>
      <p>{recordDets.description}</p>
      <p>Release Date: {recordDets.created_at}</p>
      <p>Genre: {recordDets.genre}</p>
      <p>{recordDets.is_official ? 'Official Record' : 'Unofficial Record'}</p>
    </>
  );
}

ViewRecordDetailsPage.propTypes = {
  params: PropTypes.string.isRequired,
};
