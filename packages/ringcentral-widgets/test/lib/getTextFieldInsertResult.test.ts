import { getTextFieldInsertResult } from '../../components/MessageInput/utils/getTextFieldInsertResult';

describe('getTextFieldInsertResult', () => {
  it('should insert value at the end of current text when no source position and not active element', () => {
    const input = document.createElement('input');
    input.value = 'Hello';
    const insertValue = ' World';
    const sourcePosition = null;

    const result = getTextFieldInsertResult({
      input,
      insertValue,
      sourcePosition,
    });

    expect(result.value).toBe('Hello World');
  });

  it('should insert value at the correct position when source position is provided', () => {
    const input = document.createElement('input');
    input.value = 'Hello 🌍';
    const insertValue = ' World';
    const sourcePosition = {
      position: {
        start: 5,
        end: 5,
      },
    };

    const result = getTextFieldInsertResult({
      input,
      insertValue,
      sourcePosition,
    });

    expect(result.start).toBe(11);
    expect(result.value).toBe('Hello World 🌍');
  });
});
