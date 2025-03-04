/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getRecordsByUid } from '@/api/recordData';
import RecordCard from '@/components/RecordCard';
import { useParams } from 'next/navigation';

export default function RecordCollectionPage() {
  // The useParams will retrieve the dynamic portion of a URL. In this case, it retreives the uid, which we initially placed as the name of a dynamic file.
  const { uid } = useParams();

  // The useState that initially is an empty array, making it a truthy value that will be expecting an array of items.
  const [records, setRecords] = useState([]);

  // This grabs all records with uid from useParams hook, then it sets those array indexes of records as the current state of profUsers.
  const recordsOfCollection = () => {
    getRecordsByUid(uid).then(setRecords);
  };

  // When mounting (an action that occurs when a component initally loads on the page), this useEffect will be in effect. It will also be in effect at every instance the uid dynamically changes.
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
      {/* This map array method will show all of the records according to the array indexees we rreceived from the useState */}
      <div className="d-flex justify-content-between mt-3">
        {records.map((yourRecord) => (
          <RecordCard key={yourRecord.firebaseKey} recordObj={yourRecord} onUpdate={recordsOfCollection} />
        ))}
      </div>
    </>
  );
}
