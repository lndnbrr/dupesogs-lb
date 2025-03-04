import { clientCredentials } from '../utils/client';

const dbURL = clientCredentials.databaseURL;

const getSingleUser = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${dbURL}/users.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export default getSingleUser;
