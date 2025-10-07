'use client';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';
import { createRecord, updateRecord } from '@/api/recordData';
import { useRouter } from 'next/navigation';
import { firebase } from '@/utils/client';

const initialState = {
  artist: '',
  description: '',
  genre: '',
  image: '',
  title: '',
};

export default function RecordForm({ recObj = initialState }) {
  const [recForm, setRecForm] = useState(recObj);
  const [imageFile, setImageFile] = useState(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (recObj.firebaseKey) setRecForm(recObj);
  }, [recObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const uploadImage = async (file) => {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`record-covers/${user.uid}/${Date.now()}_${file.name}`);
    await fileRef.put(file);
    const imageURL = await fileRef.getDownloadURL();
    return imageURL;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (recObj.firebaseKey) {
      let imageURL = recForm.image;
      if (imageFile) {
        imageURL = await uploadImage(imageFile);
      }
      const payload = { ...recForm, image: imageURL };
      updateRecord(payload).then(() => router.push(`/record/${recObj.firebaseKey}`));
    } else {
      const imageURL = await uploadImage(imageFile);
      const payload = { ...recForm, image: imageURL, uid: user.uid, created_at: new Date().toLocaleDateString() };
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
        <Form.Label>{recObj.firebaseKey ? 'Upload New Record Cover Image (Optional)' : 'Record Cover Image'}</Form.Label>
        {recObj.image && (
          <div className="mb-2">
            <p>Current Image:</p>
            <img src={recObj.image} alt="current record cover" style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
          </div>
        )}
        <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
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
