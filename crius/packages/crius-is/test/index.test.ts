import * as is from '..';

describe('isCriusStepClass', () => {
  test('test target is not a CriusStepClass call `isCriusStepClass`', () => {
    for (const item of [
      [],
      1,
      false,
      '1',
      undefined,
      null,
      {},
      () => {},
      async () => {},
      class Step {
        get isCriusStep() {
          return false;
        }
      },
    ]) {
      expect(is.isCriusStepClass(item)).toBeFalsy();
    }
  });
  test('test target is a CriusStepClass call `isCriusStepClass`', () => {
    class Step {
      get isCriusStep() {
        return true;
      }
    }
    expect(is.isCriusStepClass(Step)).toBeTruthy();
  });
});

describe('isCriusStepFunction', () => {
  test('test target is not a CriusStepFunction call `isCriusStepFunction`', () => {
    for (const item of [
      [],
      1,
      false,
      '1',
      undefined,
      null,
      {},
      class Step {
        get isCriusStep() {
          return true;
        }
      },
    ]) {
      // babel parser ES6+ class to function.
      expect(is.isCriusStepFunction(item)).toBeFalsy();
    }
  });
  test('test target is a CriusStepFunction call `isCriusStepFunction`', () => {
    for (const item of [
      () => {},
      function Step() {},
      async () => {},
      async () => async () => {},
    ]) {
      expect(is.isCriusStepFunction(item)).toBeTruthy();
    }
  });
});

describe('isCriusStepFragment', () => {
  test('test target is not a CriusStepFragment call `isCriusStepFragment`', () => {
    for (const item of [
      [],
      1,
      false,
      '1',
      undefined,
      null,
      {
        step: undefined,
      },
      {
        step: {},
      },
      {
        step: null,
      },
      {
        step: () => {},
      },
      {
        step: class Step {
          get isCriusStep() {
            return false;
          }
        },
      },
      {
        key: 'Test',
        step: undefined,
      },
      {
        key: '',
        step: undefined,
      },
      {
        key: '',
        props: {},
        step: undefined,
      },
      {
        key: '',
        props: {
          children: 1,
        },
        step: undefined,
      },
      {
        key: '',
        props: {
          children: '1',
        },
        step: undefined,
      },
      {
        key: '',
        props: {
          children: null,
        },
        step: undefined,
      },
      {
        key: '',
        props: {
          children: undefined,
        },
        step: undefined,
      },
      {
        key: '',
        props: {
          children: () => {},
        },
        step: undefined,
      },
    ]) {
      expect(is.isCriusStepFragment(item)).toBeFalsy();
    }
  });
  test('test target is a CriusStepFragment call `isCriusStepFragment`', () => {
    for (const item of [
      {
        key: '',
        props: {
          children: [],
        },
        step: undefined,
      },
      {
        key: '',
        props: {
          children: [1],
        },
        step: undefined,
      },
      {
        key: '',
        props: {
          children: [() => {}],
        },
        step: undefined,
      },
    ]) {
      expect(is.isCriusStepFragment(item)).toBeTruthy();
    }
  });
});

describe('isCriusStep', () => {
  test('test target is not a CriusStep call `isCriusStep`', () => {
    for (const item of [
      [],
      1,
      false,
      '1',
      undefined,
      null,
      {
        step: undefined,
      },
      {
        step: {},
      },
      {
        step: null,
      },
      {
        key: '',
        step: undefined,
      },
      {
        key: '',
        props: {
          s: [],
        },
        step: undefined,
      },
    ]) {
      expect(is.isCriusStep(item)).toBeFalsy();
    }
  });
  test('test target is a CriusStep call `isCriusStep`', () => {
    for (const item of [
      () => {},
      async () => {},
      class Step {
        get isCriusStep() {
          return true;
        }
      },
    ]) {
      expect(is.isCriusStep(item)).toBeTruthy();
    }
  });
});

describe('isCriusNode', () => {
  test('test target is not a CriusNode call `isCriusNode`', () => {
    for (const item of [[], 1, false, '1', undefined, null, {}]) {
      expect(is.isCriusNode(item)).toBeFalsy();
    }
  });
  test('test target is a CriusNode call `isCriusNode`', () => {
    for (const item of [
      {
        key: '',
        props: {
          children: [],
        },
        step: undefined,
      },
      {
        key: '',
        props: {
          children: [],
        },
        step: () => {},
      },
      {
        key: '',
        props: {
          children: [],
        },
        step: class Step {
          get isCriusStep() {
            return true;
          }
        },
      },
      {
        key: 'Foo',
        props: {
          children: [],
        },
        step: class Foo {
          get isCriusStep() {
            return true;
          }
        },
      },
    ]) {
      expect(is.isCriusNode(item)).toBeTruthy();
    }
  });
});
