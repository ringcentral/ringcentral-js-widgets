import { ContactSearch } from '../../src/app/services/ContactSearch/ContactSearch';

describe('ContactSearch', () => {
  describe('sortedResult', () => {
    it('should return the list as is when searchString is empty', () => {
      const contactSearch = new ContactSearch({});
      contactSearch.searching = {
        result: [
          { name: 'John Doe', phoneNumber: '1234567890' },
          { name: 'Jane Smith', phoneNumber: '9876543210' },
        ],
        searchString: '',
      };

      const sortedResult = contactSearch.sortedResult;

      expect(sortedResult).toEqual([
        { name: 'John Doe', phoneNumber: '1234567890' },
        { name: 'Jane Smith', phoneNumber: '9876543210' },
      ]);
    });

    it('should return the sorted list based on search index relevance', () => {
      const contactSearch = new ContactSearch({});
      contactSearch.searching = {
        result: [
          { name: 'John Doe', phoneNumber: '1234567890' },
          { name: 'John Smith', phoneNumber: '9876543210' },
        ],
        searchString: 'John',
      };

      const sortedResult = contactSearch.sortedResult;

      expect(sortedResult).toEqual([
        { name: 'John Doe', phoneNumber: '1234567890' },
        { name: 'John Smith', phoneNumber: '9876543210' },
      ]);
    });

    it('should return the sorted list based on search index', () => {
      const contactSearch = new ContactSearch({});
      contactSearch.searching = {
        result: [
          { name: 'TestJohn Smith', phoneNumber: '9876543210' },
          { name: 'John Doe', phoneNumber: '1234567890' },
        ],
        searchString: 'John',
      };

      const sortedResult = contactSearch.sortedResult;

      expect(sortedResult).toEqual([
        { name: 'John Doe', phoneNumber: '1234567890' },
        { name: 'TestJohn Smith', phoneNumber: '9876543210' },
      ]);
    });
  });
});
