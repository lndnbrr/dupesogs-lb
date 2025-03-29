'use client';

import React, { useEffect, useState } from 'react';
import UserForm from '@/components/UserForm';
import { getSingleUser } from '@/api/userData';
import { useParams } from 'next/navigation';
import Loading from '@/components/Loading';

export default function EditProfilePage() {
  // Passes uid from URL to be accessible in file
  const { uid } = useParams();

  // Allows to toggle a loading component
  const [loading, setLoading] = useState(true);

  // The initial state is set to be nonexistent, but will be updated later in useEffect
  const [editUser, setEditUser] = useState(null);

  // Grabs a single user, reformats the user details into an array, filters the profile with the matching uid, selects the first profile and changes the intial state from nonexistent to the details of that matched first user.
  useEffect(() => {
    async function updatedData() {
      try {
        const user = await getSingleUser(uid);
        console.log('getSingleUser(uid):', getSingleUser(uid));
        console.log('const user:', user);
        const userReformat = Object.values(user).filter((value) => value?.uid === uid)[0];
        console.log('const userReformat:', userReformat);
        setEditUser(userReformat);
      } catch (error) {
        console.error('Detected Error:', error);
      } finally {
        setLoading(false);
      }
    }
    updatedData();
  }, [uid]);

  // Determines if loading is true or false based on state. True displays a loading prompt.
  if (loading) {
    return (
      <>
        <Loading />
        <div>Processing...</div>
      </>
    );
  }

  return (
    <>
      <h1>Edit Profile Page</h1>
      <div>
        <UserForm userObj={editUser} />
      </div>
    </>
  );
}
