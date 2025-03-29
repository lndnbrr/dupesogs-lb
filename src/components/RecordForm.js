'use client';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';
import { createRecord, updateRecord } from '@/api/recordData';
import { getSingleUser } from '@/api/userData';
import { useRouter } from 'next/navigation';

const initialState = {
  artist: '',
  description: '',
  genre: '',
  image: '',
  title: '',
};

export default function RecordForm({ recObj = initialState }) {
  const [recForm, setRecForm] = useState(recObj);
  const [officialStatus, setOfficialStatus] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  async function userProfile() {
    try {
      const fetchUser = await getSingleUser(user.uid);
      const appUser = fetchUser[0];
      console.log('appUser', appUser);
      console.log('officialStatus', officialStatus);
      if (appUser && appUser?.uid === user.uid) {
        // console.log("user.uid",user.uid)
        // console.log("appUser[0]?.is_musician",appUser.is_musician)
        setOfficialStatus(true);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      console.log('we did it!');
    }
  }

  useEffect(() => {
    if (recObj.firebaseKey) setRecForm(recObj);
  }, [recObj]);

  useEffect(() => {
    userProfile();
  }, [user.uid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (recObj.firebaseKey) {
      updateRecord(recForm).then(() => router.push(`/record/${recObj.firebaseKey}`));
    } else {
      const appUser = getSingleUser(user.uid);
      // must change appUser to appear as an object rather than a firebasekey.
      if (appUser === user.uid && appUser.is_musician === true) {
        // console.log("return true")
      } else {
        // console.log("I am appUser",appUser)
        // console.log("I am user.uid",user.uid)
        // console.log("I am appUser.is_musician",appUser.is_musician)
      }
      const payload = { ...recForm, uid: user.uid, created_at: new Date().toLocaleDateString() };
      createRecord(payload).then(({ name }) => {
        const fbKey = { firebaseKey: name };
        updateRecord(fbKey).then(() => {
          router.push(`/records/${user.uid}`);
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="mt-3">
        <Form.Label> Artist Name</Form.Label>
        <Form.Control type="text" name="artist" placeholder="Enter the name of an artist for your record here" value={recForm.artist || ''} onChange={handleChange} required />
      </div>
      <div className="mt-3">
        <Form.Label> Record Title</Form.Label>
        <Form.Control type="text" name="title" placeholder="Enter a title for your record here" value={recForm.title || ''} onChange={handleChange} required />
      </div>
      <div className="mt-3">
        <Form.Label> Record Cover URL</Form.Label>
        <Form.Control type="text" name="image" placeholder="Enter a URL here to represent the record" value={recForm.image || ''} onChange={handleChange} required />
      </div>
      <div className="mt-3">
        <Form.Label> Record Description</Form.Label>
        <Form.Control as="textarea" name="description" placeholder="Enter a meaningful description for your record here" value={recForm.description || ''} onChange={handleChange} />
      </div>
      <div className="mt-3">
        <Form.Label> Record Genre</Form.Label>
        <Form.Select name="genre" placeholder="Select a genre here" value={recForm.genre || ''} onChange={handleChange} required>
          <option value="">Select A Genre</option>
          <option>Alternative</option>
          <option>Classical</option>
          <option>Country</option>
          <option>EDM</option>
          <option>Hip Hop</option>
          <option>Jazz</option>
          <option>Latin</option>
          <option>Other Genre</option>
          <option>Pop</option>
          <option>R&B</option>
          <option>Reggae</option>
          <option>Rock</option>
          <option>Soul</option>
          <option>World</option>
        </Form.Select>
      </div>
      <div>
        {recObj.firebaseKey ? (
          <Button type="submit" variant="warning">
            Edit
          </Button>
        ) : (
          <Button type="submit" variant="success">
            Create
          </Button>
        )}
      </div>
    </Form>
  );
}

RecordForm.propTypes = {
  recObj: PropTypes.shape({
    artist: PropTypes.string,
    created_at: PropTypes.string,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
    genre: PropTypes.string,
    image: PropTypes.string,
    is_official: PropTypes.bool,
    title: PropTypes.string,
    uid: PropTypes.string,
  }),
};

// async function determineUser() {
//   try {
//     const user = await getSingleUser(user.uid);
//     console.log("getSingleUser(uid):", getSingleUser(user.uid))
//     console.log("const user:", user)
//     const userReformat = Object.values(user).filter((value)=> value?.uid === user.uid)[0]
//     console.log("const userReformat:",userReformat)
//     // setEditUser(userReformat);
//   } catch (error) {
//     console.error("Detected Error:", error);
//   } finally{
//     setMusician(false);
//   }
// }
// determineUser();
