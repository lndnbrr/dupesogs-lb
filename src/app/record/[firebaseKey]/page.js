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
    <div className="d-flex w-100">
      <div className="mt-5">
        <img src={recordDets.image} alt="album cover" height={500} width={500} />
      </div>
      <div className="d-flex flex-column justify-content-center" style={{ paddingLeft: '50px' }}>
        <h1>{recordDets.title}</h1>
        <h2>By: {recordDets.artist}</h2>
        <p>{recordDets.description}</p>
        <p>Release Date: {recordDets.created_at}</p>
        <p>Genre: {recordDets.genre}</p>
        <p>{recordDets.is_official ? 'Official Record' : 'Unofficial Record'}</p>
      </div>
    </div>
  );
}

ViewRecordDetailsPage.propTypes = {
  params: PropTypes.string.isRequired,
};
