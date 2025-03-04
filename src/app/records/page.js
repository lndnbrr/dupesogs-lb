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
      <div>This is the Public Records Page!</div>
      <div className="d-flex justify-content-between">
        {record.map((featRecord) => (
          <RecordCard key={featRecord.id} recordObj={featRecord} onUpdate={officialRecords} />
        ))}
      </div>
    </>
  );
}
