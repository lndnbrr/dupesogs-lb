'use client';

import React, { useEffect, useState } from 'react';
import { getRecordsByOfficialStatus } from '@/api/recordData';
import RecordCard from '@/components/RecordCard';

export default function PublicRecordsPage() {
  const [record, setRecords] = useState([]);

  const officialRecords = () => {
    getRecordsByOfficialStatus().then(setRecords);
  };

  useEffect(() => {
    officialRecords();
  }, []);

  return (
    <>
      <h1 className="d-flex justify-content-center mt-2">Welcome to the Public Records Page!</h1>
      <div className="d-flex justify-content-around justify-content-center flex-wrap">
        {record.map((featRecord) => (
          <RecordCard key={featRecord.id} recordObj={featRecord} onUpdate={officialRecords} />
        ))}
      </div>
    </>
  );
}
