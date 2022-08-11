import { time } from '../../src/decorators/time';

describe('check decorator time functionality', () => {
  test('test decorator time when value and initializer are not function type', () => {
    const resFunc = time('test');
    expect(() => {
      resFunc(null, 'test', { value: null, initializer: null });
    }).toThrowError("@time decorated 'test' is not a method");
  });

  test('test decorator time when initializer is not function type', async () => {
    const resFunc = time('test');
    const decoratedFunc = resFunc(null, 'test', {
      value: null,
      initializer: () => {
        console.log('initializer function runs');
      },
    });
    // could not use toThrowError because its error happens in return function
    try {
      await decoratedFunc.value();
    } catch (err) {
      expect(err).toStrictEqual(
        new Error("@time decorated 'test' is not a function"),
      );
    }
  });

  test('test decorator time when descriptor is correct', async () => {
    const resFunc = time('test');
    const decoratedFunc = resFunc(null, 'test', {
      value: () => {
        console.log('decorated function runs');
      },
      initializer: () => {
        console.log('initializer function runs');
      },
    });

    expect(async () => {
      await decoratedFunc.value();
    }).not.toThrowError();

    expect(console.log).toHaveBeenCalledWith('initializer function runs');
  });
});
