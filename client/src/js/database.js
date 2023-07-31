import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


export const putDb = async (content) => {
  console.log('PUT to database.');

  // Create connection to the database and correct version
  const contactDb = await openDB('jate', 1);

  // Create new transaction and specify the database and privileges
  const ts = contactDb.transaction('jate', 'readwrite');

  // Open up desired object store
  const store = ts.objectStore('jate');

  // Use .add() method on store and pass in content
  const request = store.put({ id: 1, value: content });

  // Get confirmation of the request
  const result = await request;
  console.log('Data saved to the database!', result);
};


export const getDb = async () => {
  console.log('GET from database.');

  // Create connection to the database and correct version
  const contactDb = await openDB('jate', 1);

  // Create new transaction and specify the database and privileges
  const ts = contactDb.transaction('jate', 'readonly');
  // Open up desired object store
  const store = ts.objectStore('jate');

  // Use .getAll() method on store and pass in content
  const request = store.getAll();

  // Get confirmation of the request
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

initdb();
