/* eslint-disable no-console */
export const checkIndexDB = async (dbName: string) => {
  if (globalThis.indexedDB && 'databases' in globalThis.indexedDB) {
    try {
      // compatible info: https://developer.mozilla.org/en-US/docs/Web/API/IDBFactory/databases#browser_compatibility
      const databases = await globalThis.indexedDB.databases();
      const dbExists = databases.some((db) => db.name === dbName);
      return dbExists;
    } catch (error) {
      console.error('Error fetching database list:', error);
      // this means that it may exist. if browser not support indexedDB.databases
      return true;
    }
  }
  // this means that it may exist. if browser not support indexedDB.databases
  return true;
};
