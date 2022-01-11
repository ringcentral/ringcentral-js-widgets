import { ComposeTextUI } from './ComposeTextUI';

describe('detectPhoneNumbers', () => {
  const phone = {
    composeText: {
      validatePhoneNumber(string) {
        return /^\d*$/.test(string);
      },
      addToNumber: jest.fn().mockResolvedValue(true),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('when text is a plain text without valid phone number', async () => {
    const funcs = new ComposeTextUI(phone).getUIFunctions({ phone });
    const result = await funcs.detectPhoneNumbers('sabasdf, qwerrrr');
    expect(result).toBe(false);
    expect(phone.composeText.addToNumber).not.toBeCalled();
  });

  test('when text is a valid phone number', async () => {
    const funcs = new ComposeTextUI(phone).getUIFunctions({ phone });
    const result = await funcs.detectPhoneNumbers('123444');
    expect(result).toBe(true);
    expect(phone.composeText.addToNumber).toBeCalledTimes(1);
    expect(phone.composeText.addToNumber).toBeCalledWith({
      phoneNumber: '123444',
    });
  });

  test('when text is "sabasdf, 1234"', async () => {
    const funcs = new ComposeTextUI(phone).getUIFunctions({ phone });
    const result = await funcs.detectPhoneNumbers('sabasdf, 1234');
    expect(result).toBe(true);
    expect(phone.composeText.addToNumber).toBeCalledTimes(1);
    expect(phone.composeText.addToNumber).toBeCalledWith({
      phoneNumber: '1234',
    });
  });

  test('when text is "1234,5555"', async () => {
    const funcs = new ComposeTextUI(phone).getUIFunctions({ phone });
    const result = await funcs.detectPhoneNumbers('1234,5555');
    expect(result).toBe(true);
    expect(phone.composeText.addToNumber).toBeCalledTimes(2);
    expect(phone.composeText.addToNumber).toHaveBeenNthCalledWith(1, {
      phoneNumber: '1234',
    });
    expect(phone.composeText.addToNumber).toHaveBeenNthCalledWith(2, {
      phoneNumber: '5555',
    });
  });
});
