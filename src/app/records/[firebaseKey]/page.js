import Link from 'next/link';
import React from 'react';
import { Button } from 'react-bootstrap';

export default function RecordCollectionPage() {
  return (
    <>
      <div>here all of the records of the current user should display</div>
      <Link href="/record/new" passHref>
        <Button type="button" variant="success">
          Create a record!
        </Button>
      </Link>
    </>
  );
}
