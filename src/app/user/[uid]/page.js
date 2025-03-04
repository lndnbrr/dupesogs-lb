/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import getSingleUser from '@/api/userData';
import { useParams } from 'next/navigation';
import ProfilePicture from '@/components/ProfilePicture';

export default function ProfilePage() {
  // The useParams will retrieve the dynamic portion of a URL. In this case, it retreives the uid, which we initially placed as the name of a dynamic file.
  const { uid } = useParams();

  // The useState that initially is an empty string, making it a falsy value, indicating that a profile initially does not exist.
  const [profUsers, setProfUsers] = useState('');

  // This grabs user with uid from useParams hook, then the user is represented by userData and set as the current state of profUsers.
  const userProfile = () => {
    getSingleUser(uid).then((userData) => {
      setProfUsers(userData);
    });
  };

  // When mounting (an action that occurs when a component initally loads on the page), this useEffect will be in effect. It will also be in effect at every instance the uid dynamically changes.
  useEffect(() => {
    userProfile();
  }, [uid]);

  // Considering that profUsers is loading as an entire object with a name, for our purposes we want to retrieve just the name of the object (aka the uid).
  const profileUidKey = Object.keys(profUsers);

  return (
    <>
      <div>Profile details of a user goes here!</div>
      <div>here all of the records of the current user should display</div>
      {/* Since we are passing through profileUidKey, and we have a ? making sure that uid renders before making that request to enter deeper into the name/email_address/profile_pic (So the request will not throw an undefined due rendering latency), we can now access the users database properly  */}
      <div className="d-flex flex-column align-items-center">
        <ProfilePicture src={profUsers[profileUidKey]?.profile_pic} alt="profile picture" size={300} />
        <h1>{profUsers[profileUidKey]?.name}</h1>
        <h3>{profUsers[profileUidKey]?.email_address}</h3>
      </div>

      <div>
        <Link href="/user/edit" passHref>
          <Button type="button" variant="warning">
            Edit your profile!
          </Button>
        </Link>
      </div>
    </>
  );
}
