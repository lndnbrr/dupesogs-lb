import Link from 'next/link';
import React from 'react';
import { Button } from 'react-bootstrap';

export default function ProfilePage() {
  return (
    <>
      <div>Profile details of a user goes here!</div>
      <div>here all of the records of the current user should display</div>
      <Link href="/user/edit" passHref>
        <Button type="button" variant="warning">
          Edit your profile!
        </Button>
      </Link>
    </>
  );
}
