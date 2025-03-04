import { clientCredentials } from '../utils/client';

const dbURL = clientCredentials.databaseURL;

const getSingleRecord = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${dbURL}/records/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getRecordsByOfficialStatus = () =>
  new Promise((resolve, reject) => {
    fetch(`${dbURL}/records.json?orderBy="is_official"&equalTo=true`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

const getRecordsByUid = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${dbURL}/records.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

const deleteRecord = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${dbURL}/records/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getSingleRecord, getRecordsByOfficialStatus, getRecordsByUid, deleteRecord };
