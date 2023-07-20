import { ComposeTextUI } from './ComposeTextUI';

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('detectPhoneNumbers', () => {
  const phone = {
    composeText: {
      validatePhoneNumber(string: any) {
        return /^\d*$/.test(string);
      },
      // @ts-expect-error TS(2304): Cannot find name 'jest'.
      addToNumber: jest.fn().mockResolvedValue(true),
    },
  };

  // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
  beforeEach(() => {
    // @ts-expect-error TS(2304): Cannot find name 'jest'.
    jest.clearAllMocks();
  });

  // @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('when text is a plain text without valid phone number', async () => {
    // @ts-expect-error TS(2345): Argument of type '{ composeText: { validatePhoneNu... Remove this comment to see the full error message
    const funcs = new ComposeTextUI(phone).getUIFunctions({ phone });
    const result = await funcs.detectPhoneNumbers('sabasdf, qwerrrr');
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(result).toBe(false);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(phone.composeText.addToNumber).not.toBeCalled();
  });

  // @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('when text is a valid phone number', async () => {
    // @ts-expect-error TS(2345): Argument of type '{ composeText: { validatePhoneNu... Remove this comment to see the full error message
    const funcs = new ComposeTextUI(phone).getUIFunctions({ phone });
    const result = await funcs.detectPhoneNumbers('123444');
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(result).toBe(true);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(phone.composeText.addToNumber).toBeCalledTimes(1);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(phone.composeText.addToNumber).toBeCalledWith({
      phoneNumber: '123444',
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('when text is "sabasdf, 1234"', async () => {
    // @ts-expect-error TS(2345): Argument of type '{ composeText: { validatePhoneNu... Remove this comment to see the full error message
    const funcs = new ComposeTextUI(phone).getUIFunctions({ phone });
    const result = await funcs.detectPhoneNumbers('sabasdf, 1234');
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(result).toBe(true);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(phone.composeText.addToNumber).toBeCalledTimes(1);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(phone.composeText.addToNumber).toBeCalledWith({
      phoneNumber: '1234',
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('when text is "1234,5555"', async () => {
    // @ts-expect-error TS(2345): Argument of type '{ composeText: { validatePhoneNu... Remove this comment to see the full error message
    const funcs = new ComposeTextUI(phone).getUIFunctions({ phone });
    const result = await funcs.detectPhoneNumbers('1234,5555');
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(result).toBe(true);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(phone.composeText.addToNumber).toBeCalledTimes(2);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(phone.composeText.addToNumber).toHaveBeenNthCalledWith(1, {
      phoneNumber: '1234',
    });
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(phone.composeText.addToNumber).toHaveBeenNthCalledWith(2, {
      phoneNumber: '5555',
    });
  });
});
