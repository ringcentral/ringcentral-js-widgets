import { expect } from 'chai';
import chunkMessage from './chunkMessage';

describe('chunkMessage', () => {
  it('should return empty array when no text specified', () => {
    const chunks1 = chunkMessage('', 10);
    const chunks2 = chunkMessage(null, 10);
    const chunks3 = chunkMessage(undefined, 10);
    expect(chunks1).to.deep.equal([]);
    expect(chunks2).to.deep.equal([]);
    expect(chunks3).to.deep.equal([]);
  });

  it('should throw error when maxLength is not a number', () => {
    let error;
    try {
      chunkMessage('abc', 'abc');
    } catch (ex) {
      error = ex;
    }
    expect(error).to.instanceof(Error);
  });

  it('should throw error when maxLength is less than 1', () => {
    let error;
    try {
      chunkMessage('abc', 0);
    } catch (ex) {
      error = ex;
    }
    expect(error).to.instanceof(Error);
  });

  it('should return only 1 chunk', () => {
    const text = 'abc';
    const chunks1 = chunkMessage(text, text.length);
    const chunks2 = chunkMessage(text, text.length + 1);
    expect(chunks1).to.deep.equal([text]);
    expect(chunks2).to.deep.equal([text]);
  });

  it('should not break word', () => {
    const text = 'hello world';
    const chunks = chunkMessage(text, 8);
    expect(chunks).to.deep.equal(['hello ', 'world']);
  });

  it('should not break link', () => {
    const link = 'https://www.npmjs.com/package/chunk-text';
    const text = `hello ${link}`;
    const chunks = chunkMessage(text, link.length + 1);
    expect(chunks).to.deep.equal(['hello ', link]);
  });

  it('should split into 2 chunks', () => {
    const text = 'aa';
    const chunks = chunkMessage(text, 1);
    expect(chunks).to.deep.equal(['a', 'a']);
  });

  it('should split into 3 chunks', () => {
    const text = 'a a';
    const chunks = chunkMessage(text, 1);
    expect(chunks).to.deep.equal(['a', ' ', 'a']);
  });
});
