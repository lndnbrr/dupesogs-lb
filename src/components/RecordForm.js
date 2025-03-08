'use client';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';
import { createRecord, updateRecord } from '@/api/recordData';
import { useRouter } from 'next/navigation';

// This object is for the form input fields during the creating process
const initialState = {
  artist: '',
  description: '',
  genre: '',
  image: '',
  title: '',
};

// The param states that the form will take in the current state of recObj. If it's creating (w/o firebaseKey), it will be intialState. If it's updating(w/ firebaseKey), it will be recObj.
export default function RecordForm({ recObj = initialState }) {
  const [recForm, setRecForm] = useState(recObj);
  const { user } = useAuth();
  const router = useRouter();

  // The useEffect determines if there is a firebaseKey attached to the selected record, and if so, we will update recForm to be the details of recObj. UseEffect will run again everytime recObj changes (dependecy array).
  useEffect(() => {
    if (recObj.firebaseKey) setRecForm(recObj);
  }, [recObj]);

  const handleChange = (e) => {
    // When handleChange is called, this will target the name and value that is attached to the handleChange function.
    const { name, value } = e.target;
    // setRecForm will be called, it will open up the object that we are creating/updating and the user's input will update the value of key with that name.
    setRecForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // If there is a firebaseKey attached to the selected record, and the user updates the record info to their liking, it will perform an API call to update the details of recObj through the updated recForm. Then the useRouter() hook will take the user to the record's details, showing all the new updates of that record.
    if (recObj.firebaseKey) {
      updateRecord(recForm).then(() => router.push(`/record/${recObj.firebaseKey}`));
    } else {
      // If there is no firebaseKey to select, the form will pop up in create mode. Once the user fills out the record details and selects submit, it will perform an API call to create a recObj through the recForm that the user filled out and it will also pass through a payload attaching the user's uid and the day it was created at.
      const payload = { ...recForm, uid: user.uid, created_at: new Date().toLocaleDateString() };
      createRecord(payload).then(({ name }) => {
        // Then the record will go through an updating process (considering the firebaseKey is generated after creating the object), placing the name of the recObj as a value with the key of 'firebaseKey' into that recObj object. Lastly, the useRouter() hook will take the user to view their records.
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
        <Form.Control type="text" name="artist" placeholder="Enter the name of an artist for your record here" value={recForm.artist} onChange={handleChange} required />
      </div>
      <div className="mt-3">
        <Form.Label> Record Title</Form.Label>
        <Form.Control type="text" name="title" placeholder="Enter a title for your record here" value={recForm.title} onChange={handleChange} required />
      </div>
      <div className="mt-3">
        <Form.Label> Record Cover URL</Form.Label>
        <Form.Control type="text" name="image" placeholder="Enter a URL here to represent the record" value={recForm.image} onChange={handleChange} required />
      </div>
      <div className="mt-3">
        <Form.Label> Record Description</Form.Label>
        <Form.Control as="textarea" name="description" placeholder="Enter a meaningful description for your record here" value={recForm.description} onChange={handleChange} />
      </div>
      <div className="mt-3">
        <Form.Label> Record Genre</Form.Label>
        <Form.Select name="genre" placeholder="Select a genre here" value={recForm.genre} onChange={handleChange} required>
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
        <Button type="submit" variant="success">
          Submit
        </Button>
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

RecordForm.defaultProps = {
  recObj: initialState,
};
