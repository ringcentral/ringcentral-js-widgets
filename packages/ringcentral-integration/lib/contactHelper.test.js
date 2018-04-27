import { expect } from 'chai';

import {
  uniqueContactItems,
  sortContactItemsByName,
  groupByFirstLetterOfName,
} from './contactHelper';


describe('uniqueContactItems', () => {
  it('should return contact items uniqued by contact id', () => {
    const contact1 = {
      id: '1',
      name: 'User2',
    };
    const contact2 = {
      id: contact1.id,
      name: 'User1',
    };
    const contacts = [contact1, contact2];
    const result = uniqueContactItems(contacts);
    expect(result).to.deep.equal([contact1]);
  });

  it('should return contact items uniqued by contact object reference', () => {
    const contact = {
      id: '1',
      name: 'User2',
    };
    const contacts = [contact, contact];
    const result = uniqueContactItems(contacts);
    expect(result).to.deep.equal([contact]);
  });
});

describe('SortContactItemsByName', () => {
  it('should return contact items sorted by contact name', () => {
    const contacts = [{
      id: '2',
      name: 'User2',
    }, {
      id: '1',
      name: 'User1',
    }];
    const result = sortContactItemsByName(contacts);
    expect(result[0].id).to.equal('1');
    expect(result[1].id).to.equal('2');
  });
});

describe('GroupByFirstLetterOfName', () => {
  it('should return contact groups grouped by first letter of contact name', () => {
    const contacts = [{
      id: '2',
      name: 'User2',
    }, {
      id: '1',
      name: 'User1',
    }];
    const result = groupByFirstLetterOfName(contacts);
    expect(result).to.deep.equal([{
      contacts,
      caption: 'U',
      id: 'U',
    }]);
  });
});
