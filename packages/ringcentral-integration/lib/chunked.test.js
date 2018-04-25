import { expect } from 'chai';
import chunked from './chunked';

describe('chunked', () => {
  it('should return empty array when no phone number specified', () => {
    const chunks1 = chunked('', 10);
    const chunks2 = chunked(null, 10);
    const chunks3 = chunked(undefined, 10);
    expect(chunks1).to.deep.equal([]);
    expect(chunks2).to.deep.equal([]);
    expect(chunks3).to.deep.equal([]);
  });

  it('should throw error when maxLength is not a number', () => {
    let error;
    try {
      chunked(['1', '2'], 'abc');
    } catch (ex) {
      error = ex;
    }
    expect(error).to.instanceof(Error);
  });

  it('should throw error when maxLength is less than 1', () => {
    let error;
    try {
      chunked(['1', '2'], 0);
    } catch (ex) {
      error = ex;
    }
    expect(error).to.instanceof(Error);
  });

  it('should return only 1 chunk', () => {
    const array = ['1', '2', '3'];
    const chunks1 = chunked(array, array.length);
    const chunks2 = chunked(array, array.length + 1);
    expect(chunks1).to.deep.equal([array]);
    expect(chunks2).to.deep.equal([array]);
  });


  it('should split into 2 chunks', () => {
    const array = [
      '+1234567890', '+1234567891', '+1234567892', '+1234567893', '+1234567894',
      '+1234567895', '+1234567896', '+1234567897', '+1234567898', '+1234567899',
      '+1234567810', '+1234567821', '+1234567832', '+1234567843', '+1234567854',
      '+1234567865', '+1234567876', '+1234567887', '+1234564898'
    ];
    const chunks = chunked(array, 10);
    expect(chunks).to.deep.equal([
      ['+1234567890', '+1234567891', '+1234567892', '+1234567893', '+1234567894',
        '+1234567895', '+1234567896', '+1234567897', '+1234567898', '+1234567899'
      ],
      ['+1234567810', '+1234567821', '+1234567832', '+1234567843', '+1234567854',
        '+1234567865', '+1234567876', '+1234567887', '+1234564898'
      ],
    ]);
  });

  it('should split into 3 chunks', () => {
    const array = ['1', '2', '3', '4', '5', '6'];
    const chunks = chunked(array, 2);
    expect(chunks).to.deep.equal([['1', '2'], ['3', '4'], ['5', '6']]);
  });
});
