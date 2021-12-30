import AdapterCore from '../../../lib/AdapterCore';

let instance: AdapterCore;

const mockAttrsDom = (i: Object, keys: string[]) => {
  const props = keys.reduce(
    (pre, current) => ({
      ...pre,
      [current]: { value: document.createElement('div') },
    }),
    {},
  );
  Object.defineProperties(i, props);
};

beforeEach(() => {
  instance = new AdapterCore({
    prefix: 'test',
    styles: 'mock',
    container: document.createElement('div'),
  });

  mockAttrsDom(instance, [
    '_onHoldCallsEl',
    '_logoEl',
    '_durationEl',
    '_ringingCallsEl',
    '_currentCallEl',
    '_viewCallsEl',
  ]);
  const node = document.createElement('div');
  node.innerHTML = '<span>test</span>';
  Object.defineProperty(instance, '_presenceItemEls', {
    value: [node],
  });
});

describe('AdapterCore', () => {
  it('when there is only one active call, only need to display call duration', async () => {
    const durationMock = jest.spyOn(instance, '_renderCallDuration');
    const callBarMock = jest.spyOn(instance, '_renderCallsBar');

    instance._onPushCallsInfo({
      ringingCallsLength: 0,
      onHoldCallsLength: 0,
      otherDeviceCallsLength: 0,
      currentStartTime: Date.now(),
    });

    expect(durationMock).toBeCalled();
    expect(callBarMock).toBeCalled();
  });

  it('when there are only ringing calls(no onhold or active calls only need to display incoming call icon', async () => {
    const ringCallsMock = jest.spyOn(instance, '_renderRingingCalls');
    const callBarMock = jest.spyOn(instance, '_renderCallsBar');

    instance._onPushCallsInfo({
      ringingCallsLength: 1,
      onHoldCallsLength: 0,
      otherDeviceCallsLength: 0,
      currentStartTime: 0,
    });

    expect(ringCallsMock).toBeCalled();
    expect(callBarMock).toBeCalled();
  });

  it('when there are OtherDevicesCalls should render OtherDevicesCalls', async () => {
    const otherDevicesCallsMock = jest.spyOn(
      instance,
      '_renderOtherDevicesCalls',
    );
    const callBarMock = jest.spyOn(instance, '_renderCallsBar');

    instance._onPushCallsInfo({
      ringingCallsLength: 0,
      onHoldCallsLength: 0,
      otherDeviceCallsLength: 2,
      currentStartTime: 0,
    });

    expect(otherDevicesCallsMock).toBeCalled();
    expect(callBarMock).toBeCalled();
  });

  it('when multiple calls, should scroll with call info', async () => {
    const rotateCallInfoMock = jest.spyOn(instance, 'rotateCallInfo');

    instance._onPushCallsInfo({
      ringingCallsLength: 1,
      onHoldCallsLength: 2,
      otherDeviceCallsLength: 2,
      currentStartTime: 0,
    });

    expect(rotateCallInfoMock).toBeCalled();
  });

  it('should render string when push local', async () => {
    const renderStringMock = jest.spyOn(instance, '_renderString');

    instance._onPushLocale({
      locale: 'en-US',
      strings: {},
    });

    expect(renderStringMock).toBeCalled();
  });
});
