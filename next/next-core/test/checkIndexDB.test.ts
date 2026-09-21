import { checkIndexDB } from '../src/lib/checkIndexDB';

describe('checkIndexDB', () => {
  // Store original indexedDB to restore later
  const originalIndexedDB = globalThis.indexedDB;

  afterEach(() => {
    // Restore original indexedDB after each test
    globalThis.indexedDB = originalIndexedDB;
  });

  describe('when indexedDB is not available', () => {
    it('should return true when globalThis.indexedDB is undefined', async () => {
      // Mock indexedDB as undefined
      // @ts-expect-error - intentionally setting to undefined for testing
      globalThis.indexedDB = undefined;

      const result = await checkIndexDB('testDb');

      expect(result).toBe(true);
    });

    it('should return true when globalThis.indexedDB is null', async () => {
      // Mock indexedDB as null
      // @ts-expect-error - intentionally setting to null for testing
      globalThis.indexedDB = null;

      const result = await checkIndexDB('testDb');

      expect(result).toBe(true);
    });
  });

  describe('when indexedDB is available but databases method is not supported', () => {
    it('should return true when databases method does not exist', async () => {
      // Mock indexedDB without databases method
      globalThis.indexedDB = {} as IDBFactory;

      const result = await checkIndexDB('testDb');

      expect(result).toBe(true);
    });

    it('should return true when databases property is not a function', async () => {
      // Mock indexedDB with databases as non-function
      globalThis.indexedDB = {
        databases: 'not-a-function',
      } as unknown as IDBFactory;

      const result = await checkIndexDB('testDb');

      expect(result).toBe(true);
    });
  });

  describe('when indexedDB.databases() is available and works correctly', () => {
    it('should return true when the database exists in the list', async () => {
      const mockDatabases = [
        { name: 'otherDb', version: 1 },
        { name: 'testDb', version: 2 },
        { name: 'anotherDb', version: 1 },
      ];

      globalThis.indexedDB = {
        databases: jest.fn().mockResolvedValue(mockDatabases),
      } as unknown as IDBFactory;

      const result = await checkIndexDB('testDb');

      expect(result).toBe(true);
      expect(globalThis.indexedDB.databases).toHaveBeenCalledTimes(1);
    });

    it('should return false when the database does not exist in the list', async () => {
      const mockDatabases = [
        { name: 'otherDb', version: 1 },
        { name: 'anotherDb', version: 1 },
      ];

      globalThis.indexedDB = {
        databases: jest.fn().mockResolvedValue(mockDatabases),
      } as unknown as IDBFactory;

      const result = await checkIndexDB('testDb');

      expect(result).toBe(false);
      expect(globalThis.indexedDB.databases).toHaveBeenCalledTimes(1);
    });

    it('should return false when databases list is empty', async () => {
      globalThis.indexedDB = {
        databases: jest.fn().mockResolvedValue([]),
      } as unknown as IDBFactory;

      const result = await checkIndexDB('testDb');

      expect(result).toBe(false);
      expect(globalThis.indexedDB.databases).toHaveBeenCalledTimes(1);
    });

    it('should handle case-sensitive database name matching', async () => {
      const mockDatabases = [
        { name: 'TestDb', version: 1 },
        { name: 'TESTDB', version: 1 },
      ];

      globalThis.indexedDB = {
        databases: jest.fn().mockResolvedValue(mockDatabases),
      } as unknown as IDBFactory;

      const result = await checkIndexDB('testDb');

      expect(result).toBe(false);
      expect(globalThis.indexedDB.databases).toHaveBeenCalledTimes(1);
    });
  });

  describe('when indexedDB.databases() throws an error', () => {
    let consoleSpy: jest.Spied;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    it('should return true and log error when databases() throws an error', async () => {
      const mockError = new Error('Database access denied');
      globalThis.indexedDB = {
        databases: jest.fn().mockRejectedValue(mockError),
      } as unknown as IDBFactory;

      const result = await checkIndexDB('testDb');

      expect(result).toBe(true);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching database list:',
        mockError,
      );
      expect(globalThis.indexedDB.databases).toHaveBeenCalledTimes(1);
    });

    it('should return true and log error when databases() throws a string error', async () => {
      const mockError = 'String error message';
      globalThis.indexedDB = {
        databases: jest.fn().mockRejectedValue(mockError),
      } as unknown as IDBFactory;

      const result = await checkIndexDB('testDb');

      expect(result).toBe(true);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching database list:',
        mockError,
      );
      expect(globalThis.indexedDB.databases).toHaveBeenCalledTimes(1);
    });

    it('should return true and log error when databases() throws a SecurityError', async () => {
      const mockError = new DOMException('Access denied', 'SecurityError');
      globalThis.indexedDB = {
        databases: jest.fn().mockRejectedValue(mockError),
      } as unknown as IDBFactory;

      const result = await checkIndexDB('testDb');

      expect(result).toBe(true);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching database list:',
        mockError,
      );
      expect(globalThis.indexedDB.databases).toHaveBeenCalledTimes(1);
    });
  });

  describe('edge cases', () => {
    it('should handle empty string database name', async () => {
      const mockDatabases = [
        { name: '', version: 1 },
        { name: 'testDb', version: 1 },
      ];

      globalThis.indexedDB = {
        databases: jest.fn().mockResolvedValue(mockDatabases),
      } as unknown as IDBFactory;

      const result = await checkIndexDB('');

      expect(result).toBe(true);
      expect(globalThis.indexedDB.databases).toHaveBeenCalledTimes(1);
    });

    it('should handle database objects without name property', async () => {
      const mockDatabases = [
        { version: 1 }, // Missing name property
        { name: 'testDb', version: 1 },
      ];

      globalThis.indexedDB = {
        databases: jest.fn().mockResolvedValue(mockDatabases),
      } as unknown as IDBFactory;

      const result = await checkIndexDB('testDb');

      expect(result).toBe(true);
      expect(globalThis.indexedDB.databases).toHaveBeenCalledTimes(1);
    });

    it('should handle database objects with null name', async () => {
      const mockDatabases = [
        { name: null, version: 1 },
        { name: 'testDb', version: 1 },
      ];

      globalThis.indexedDB = {
        databases: jest.fn().mockResolvedValue(mockDatabases),
      } as unknown as IDBFactory;

      const result = await checkIndexDB('testDb');

      expect(result).toBe(true);
      expect(globalThis.indexedDB.databases).toHaveBeenCalledTimes(1);
    });
  });
});
