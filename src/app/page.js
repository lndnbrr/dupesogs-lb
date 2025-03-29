'use client';

import React, { useEffect, useState } from 'react';
import { getRecordsByOfficialStatus } from '@/api/recordData';
import RecordCard from '@/components/RecordCard';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

export default function Homepage() {
  const [record, setRecords] = useState([]);

  const recordPreview = () => {
    getRecordsByOfficialStatus().then(setRecords);
  };

  useEffect(() => {
    recordPreview();
  }, []);

  return (
    <>
      <h1 className="d-flex justify-content-center mt-4">Welcome to Dupesogs!</h1>
      <div className="d-flex flex-wrap justify-content-center justify-content-around">
        {record.slice(0, 3).map((featRecord) => (
          <RecordCard key={featRecord.firebaseKey} recordObj={featRecord} onUpdate={recordPreview} />
        ))}
      </div>
      <Link href="/user/new" passHref>
        <Button type="button" variant="success">
          Create your profile!
        </Button>
      </Link>
    </>
  );
}
