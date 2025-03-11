/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import getSingleUser from '@/api/userData';
import { useParams } from 'next/navigation';
import ProfilePicture from '@/components/ProfilePicture';
import { signOut } from '@/utils/auth';

export default function ProfilePage() {
  const { uid } = useParams();

  const [profUsers, setProfUsers] = useState('');

  const userProfile = () => {
    getSingleUser(uid).then((userData) => {
      setProfUsers(userData);
    });
  };

  useEffect(() => {
    userProfile();
  }, [uid]);

  const profileUidKey = Object.keys(profUsers);

  return (
    <>
      <h1>Profile Page</h1>
      <div className="d-flex flex-column align-items-center">
        <ProfilePicture src={profUsers[profileUidKey]?.profile_pic} alt="profile picture" size={300} />
        <h1>{profUsers[profileUidKey]?.name}</h1>
        <h3>{profUsers[profileUidKey]?.email_address}</h3>
        <h3>User Status: {profUsers[profileUidKey]?.is_musician ? 'Official Artist' : 'General User'}</h3>
      </div>

      <div>
        <Link href="/user/edit" passHref>
          <Button type="button" variant="warning">
            Edit your profile!
          </Button>
        </Link>
      </div>
      <div>
        <Link href="/" passHref>
          <Button variant="danger" onClick={signOut}>
            Sign Out
          </Button>
        </Link>
      </div>
    </>
  );
}
