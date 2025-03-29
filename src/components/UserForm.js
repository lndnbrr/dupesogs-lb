'use client';

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';
import { useRouter } from 'next/navigation';
import { createUser, updateUser } from '@/api/userData';

const initialState = {
  email_address: '',
  is_musician: false,
  name: '',
  profile_pic: '',
};

export default function UserForm({ userObj = initialState }) {
  const [userForm, setUserForm] = useState(userObj);
  const { user } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    async function runUpdate() {
      try {
        const update = await updateUser(userForm);
        setUserForm(update);
      } catch (error) {
        console.error('Following error occured:', error);
      } finally {
        router.push(`/user/${user.uid}`);
      }
    }
    async function runCreate() {
      try {
        const uid = { ...userForm, uid: user.uid };
        const { name } = await createUser(uid);
        console.log('I am name', name);
        const fbKey = { firebaseKey: name };
        await updateUser(fbKey);
      } catch (error) {
        console.error('Following error occured:', error);
      } finally {
        router.push('/');
      }
    }
    if (userObj.uid) {
      runUpdate();
    } else {
      runCreate();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="mt-3">
        <Form.Label> Your Name</Form.Label>
        <Form.Control type="text" name="name" placeholder="Enter your name here" value={userForm?.name} onChange={handleChange} required />
      </div>
      <div className="mt-3">
        <Form.Label> Your Email Address</Form.Label>
        <Form.Control type="text" name="email_address" placeholder="Enter your email address here" value={userForm?.email_address} onChange={handleChange} required />
      </div>
      <div className="mt-3">
        <Form.Label> Profile Pic URL</Form.Label>
        <Form.Control type="text" name="profile_pic" placeholder="Enter a URL here to represent you" value={userForm?.profile_pic} onChange={handleChange} required />
      </div>
      <div className="mt-3">
        <Form.Check
          type="checkbox"
          label="Are you an Artist?"
          checked={userForm?.is_musician}
          onChange={(e) => {
            setUserForm((musicianCheck) => ({ ...musicianCheck, is_musician: e.target.checked }));
          }}
        />
      </div>
      <div>
        <Button type="submit" variant="success">
          Submit
        </Button>
      </div>
    </Form>
  );
}

UserForm.propTypes = {
  userObj: PropTypes.shape({
    email_address: PropTypes.string,
    firebaseKey: PropTypes.string,
    is_musician: PropTypes.bool,
    profile_pic: PropTypes.string,
    name: PropTypes.string,
    uid: PropTypes.string,
  }),
};
