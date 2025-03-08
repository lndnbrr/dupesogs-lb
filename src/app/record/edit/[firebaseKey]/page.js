'use client';

import React, { useEffect, useState } from 'react';
import RecordForm from '@/components/RecordForm';
import { useParams } from 'next/navigation';
import { getSingleRecord } from '@/api/recordData';

export default function EditRecordPage() {
  const [editRec, setEditRec] = useState({});

  const { firebaseKey } = useParams();

  useEffect(() => {
    getSingleRecord(firebaseKey).then(setEditRec);
  }, [firebaseKey]);

  return (
    <>
      <div>This is the EDIT PAGE. Insert create/EDIT form here!</div>
      <RecordForm recObj={editRec} />
    </>
  );
}
