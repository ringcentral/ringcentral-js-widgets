import { parseNumber } from './parseNumber';

describe('parseNumber', () => {
  it('should return result number if phoneNumber is valid local number', () => {
    const phonenumber = '6508498195';
    const result = parseNumber(phonenumber);
    expect(result).toEqual('6508498195');
  });

  it('should return local number if phoneNumber is valid e164 number', () => {
    const phonenumber = '+16508498195';
    const result = parseNumber(phonenumber);
    expect(result).toEqual('6508498195');
  });

  it('should throw error if phoneNumber is invalid', () => {
    let error = null;
    try {
      const phonenumber = '%^&64238478';
      parseNumber(phonenumber);
    } catch (e) {
      error = e;
    }
    expect(error.message).toEqual('Error Type: INVALID_NUMBER');
  });

  it('should throw error if phoneNumber is empty', () => {
    let error = null;
    try {
      const phonenumber = '';
      parseNumber(phonenumber);
    } catch (e) {
      error = e;
    }
    expect(error.message).toEqual('Error Type: INVALID_NUMBER');
  });
});
