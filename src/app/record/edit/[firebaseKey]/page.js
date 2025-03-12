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

  return <RecordForm recObj={editRec} />;
}
