'use client';

import React, { useEffect, useState } from 'react';
import { getRecordsByOfficialStatus } from '@/api/recordData';
import RecordCard from '@/components/RecordCard';

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
      <div>This is the home page!</div>
      <div className="d-flex justify-content-between">
        {record.slice(0, 3).map((featRecord) => (
          <RecordCard key={featRecord.id} recordObj={featRecord} onUpdate={recordPreview} />
        ))}
      </div>
    </>
  );
}
