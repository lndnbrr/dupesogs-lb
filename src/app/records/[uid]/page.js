/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getRecordsByUid } from '@/api/recordData';
import RecordCard from '@/components/RecordCard';
import { useParams } from 'next/navigation';

export default function RecordCollectionPage() {
  const { uid } = useParams();

  const [records, setRecords] = useState([]);

  const recordsOfCollection = () => {
    getRecordsByUid(uid).then(setRecords);
  };

  useEffect(() => {
    recordsOfCollection();
  }, [uid]);

  return (
    <>
      <div>here all of the records of the current user should display</div>
      <Link href="/record/new" passHref>
        <Button type="button" variant="success">
          Create a record!
        </Button>
      </Link>
      <div className="d-flex justify-content-between mt-3">
        {records.map((yourRecord) => (
          <RecordCard key={yourRecord.firebaseKey} recordObj={yourRecord} onUpdate={recordsOfCollection} />
        ))}
      </div>
    </>
  );
}
