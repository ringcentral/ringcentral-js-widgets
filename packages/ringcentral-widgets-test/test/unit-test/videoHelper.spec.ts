function mockFunctions() {
  const original = jest.requireActual(
    '@ringcentral-integration/commons/modules/RcVideo/videoHelper',
  );
  return {
    ...original,
    getDefaultChars: jest.fn(() => {
      return original.getDefaultChars();
    }),
  };
}

jest.mock('@ringcentral-integration/commons/modules/RcVideo/videoHelper', () =>
  mockFunctions(),
);
const generator = require('@ringcentral-integration/commons/modules/RcVideo/videoHelper');

describe.each`
  password        | expected
  ${'123456er1W'} | ${true}
  ${'Aaaaaaaaaa'} | ${false}
  ${'1aaaaaaaaa'} | ${false}
  ${'1AAAAAAAAA'} | ${false}
`('$password should be $expected', ({ password, expected }) => {
  test(`returns ${expected}`, () => {
    expect(generator.validateRandomPassword(password)).toBe(expected);
  });
});

describe('generateRandomPassword', () => {
  test('password length should be 10', () => {
    const password = generator.generateRandomPassword();
    expect(password.length).toEqual(10);
  });

  test('defaultChars should not include 0, o, l, I, O', () => {
    // given chars as password sources
    const source = generator.getDefaultChars();
    const expected = /[0oOIl]/;

    // then
    expect(source).toEqual(expect.not.stringMatching(expected));
  });

  test('should use the default chars to generate pwd', () => {
    // when
    generator.generateRandomPassword();

    // then
    expect(generator.getDefaultChars).toHaveBeenCalled();
  });
});
